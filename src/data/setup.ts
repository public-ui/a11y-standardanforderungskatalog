import configurationService from '../services/configuration';
import { SolutionProperties } from './configuration';

export class RequirenmentSetup {
	/**
	 * Creates a new data service
	 * @param _kinds the intial activated kinds
	 * @param _solutionProperties the initial activated solution properties
	 */
	public constructor(
		private _kinds: string[],
		private _solutionProperties: SolutionProperties,
	) {}

	/**
	 * Gets the selected kind of the IT-solution
	 */
	public get kinds() {
		return this._kinds;
	}

	/**
	 * Sets the selected kind of the IT-solution
	 * @param value the new active kinds
	 */
	public set kinds(value: string[]) {
		this._kinds = value;
	}

	/**
	 * Gets all activated solution properties
	 */
	public get solutionProperties() {
		return this._solutionProperties;
	}

	/**
	 * Activates or deactivates a kind.
	 * @param kind The kind to toggle
	 * @param activated true if the kind should be activated, otherwise false
	 */
	public toggleKind = (kind: string, activated: boolean) => {
		if (activated) {
			this.kinds.push(kind);
		} else {
			const index = this.kinds.indexOf(kind);
			if (index > -1) {
				this.kinds.splice(index, 1);
			}
		}
		configurationService.lastKindOptionKeys = this.kinds;
	};

	/**
	 * Activates or deactivates a solution property
	 * @param property the property to activate or deactivate
	 * @param activated true if the property should be activated, false if it should be deactivated
	 */
	public toggleSolutionProperty = (property: string, activated: boolean) => {
		if (activated) {
			this._solutionProperties[property] = { ...configurationService.solutionProperties[property] };
		} else {
			delete this._solutionProperties[property];
		}
		configurationService.lastSolutionProperties = this._solutionProperties;
	};

	public static fromQueryParams = (queryParams: URLSearchParams) => {
		const kinds = queryParams.getAll('kind');
		const solutionProperties = queryParams.getAll('prop');
		const solutionPropertiesObject: SolutionProperties = {};
		solutionProperties.forEach((property) => {
			solutionPropertiesObject[property] = { ...configurationService.solutionProperties[property] };
		});
		return new RequirenmentSetup(kinds, solutionPropertiesObject);
	};

	public toQueryParams = (): URLSearchParams => {
		const params = new URLSearchParams();
		this._kinds.forEach((kind) => params.append('kind', kind));
		Object.keys(this._solutionProperties).forEach((property) => params.append('prop', property));
		return params;
	};
}
