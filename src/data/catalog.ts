import configurationService from '../services/configuration';
import DataService from '../services/data';
import { SolutionPropertyConfiguration } from './configuration';
import { Schema } from './schema';
import { RequirenmentSetup } from './setup';

export class Catalog {
	private readonly filteredData: Schema[];

	/**
	 * Creates a new catalog filtering the complete data by the given requirenment setup.
	 * @param _setup the requirenment setup
	 */
	public constructor(
		private _setup: RequirenmentSetup,
		dataService: DataService,
	) {
		this.filteredData = dataService.data.filter(this.filterData);

		// Store the setup in the session storage
		configurationService.lastKindOptionKeys = this._setup.kinds;
		configurationService.lastSolutionProperties = this._setup.solutionProperties;
	}

	/**
	 * Gets the filtered catalog data
	 */
	public get data() {
		return this.filteredData;
	}

	/**
	 * Gets the requirenment setup
	 */
	public get setup() {
		return this._setup;
	}

	private filterData = (data: Schema) => {
		return this.filterByKind(data) && this.filterBySolutionProperties(data);
	};

	private filterByKind = (data: Schema) => {
		if (this._setup.kinds.length === 0) {
			console.warn('No kinds selected');
			return false;
		}

		return this._setup.kinds.some((kind) => this.filterByKindSingle(data, kind));
	};

	private filterByKindSingle = (data: Schema, kind: string) => {
		const kindConfig = configurationService.kindOptions[kind];
		if (!kindConfig) {
			console.warn('No kind config found for', kind);
			return false;
		}
		return !!data.custom[kindConfig.excelColHeader];
	};

	private witchStrictSolutionOptionsAreSelected = () => {
		return Object.keys(this._setup.solutionProperties).filter((key) => configurationService.strictSolutionOptions.includes(key));
	};

	private filterByStrictSolutionOptions = (data: Schema) => {
		const selectedStrictOptions = this.witchStrictSolutionOptionsAreSelected();
		const result = !(
			(data.custom['Höchstmögliches Maß']?.toLowerCase() === 'x' && !selectedStrictOptions.includes('aaa')) ||
			(data.custom['Informativ']?.toLowerCase() === 'x' && !selectedStrictOptions.includes('informativ'))
		);
		return result;
		// return (
		// 	(data.custom['Höchstmögliches Maß'] === 'x' && selectedStrictOptions.includes('aaa')) ||
		// 	(data.custom['Informativ'] === 'x' && selectedStrictOptions.includes('informativ')) ||
		// 	(data.custom['Höchstmögliches Maß'] !== 'x' && data.custom['Informativ'] !== 'x')
		// );
	};

	private filterBySolutionProperties = (data: Schema) => {
		const properties = Object.entries(this._setup.solutionProperties);
		if (properties.length === 0) {
			console.warn('No properties selected');
			return false;
		}

		return properties.some(([key, property]) => {
			const config: SolutionPropertyConfiguration = configurationService.solutionProperties[key];
			if (!config) {
				console.warn(`No config found in source column ${property.excelColHeader} for property ${key}.`);
				return false;
			}

			switch (config.excelColHeader) {
				case 'A, AA, AAA':
					return data.conformityLevel === 'AAA' && this.filterByStrictSolutionOptions(data);
				default:
					return data.custom[property.excelColHeader]?.toLowerCase() === 'x' && this.filterByStrictSolutionOptions(data);
			}
		});
	};
}
