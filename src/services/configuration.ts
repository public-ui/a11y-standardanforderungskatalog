import { KindOptions, SolutionProperties, SolutionPropertiesConfig } from '../data/configuration';

class ConfigurationService {
	private _solutionProperties: SolutionProperties = {};
	private _strictSolutionOptions: string[] = [];
	private _kindOptions: KindOptions = {};

	private get defaultKindOptionKeys() {
		return [] as string[];
	}

	private get defaultSolutionProperties() {
		return Object.fromEntries(Object.entries(this._solutionProperties).filter(([_, v]) => v.defaultValue));
	}

	public get solutionProperties() {
		return this._solutionProperties;
	}

	public get strictSolutionOptions() {
		return this._strictSolutionOptions;
	}

	public get kindOptions() {
		return this._kindOptions;
	}

	public get lastKindOptionKeys() {
		const storedKinds = sessionStorage.getItem('kinds');
		return storedKinds ? (JSON.parse(storedKinds) as string[]) : this.defaultKindOptionKeys;
	}

	public set lastKindOptionKeys(kindOptions: string[]) {
		sessionStorage.setItem('kinds', JSON.stringify(kindOptions));
	}

	public get lastSolutionProperties() {
		const storedProperties = sessionStorage.getItem('solutionProperties');
		return storedProperties ? (JSON.parse(storedProperties) as SolutionProperties) : this.defaultSolutionProperties;
	}

	public set lastSolutionProperties(solutionProperties: SolutionProperties) {
		sessionStorage.setItem('solutionProperties', JSON.stringify(solutionProperties));
	}

	public init = () => Promise.all([this.loadSolutionProperties(), this.loadKindOptions()]);

	private async loadSolutionProperties() {
		const response = await fetch('config/solutionProperties.json');
		const solutionProperties = (await response.json()) as SolutionPropertiesConfig;
		this._solutionProperties = solutionProperties.options;
		this._strictSolutionOptions = solutionProperties.strictOptions;
	}

	private async loadKindOptions() {
		const response = await fetch('config/kindOptions.json');
		this._kindOptions = (await response.json()) as KindOptions;
		Object.values(this._kindOptions).forEach((kindOption) => {
			kindOption.shortLabel = kindOption.shortLabel || kindOption.label;
		});
	}
}

const configurationService = new ConfigurationService();
export default configurationService;
