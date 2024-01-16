export type GlossaryEntry = { name: string; abbr?: string; desc?: string };

class Glossary {
	private _entries?: GlossaryEntry[];

	public async init() {
		const response = await fetch('config/glossary.json');
		const json = (await response.json()) as GlossaryEntry[];
		this._entries = json;
	}

	public get entries() {
		if (this._entries === undefined) {
			throw new Error('Glossary not loaded yet.');
		}
		return this._entries;
	}
}

const glossary = new Glossary();
export default glossary;
