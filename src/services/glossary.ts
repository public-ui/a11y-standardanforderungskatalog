import { fetchGlossar } from './globals';

export type GlossaryEntry = { name: string; abbr?: string; desc?: string };

class Glossary {
	// private _baseUri = '';
	private _entries?: GlossaryEntry[];

	public async init() {
		// this._baseUri = (GLOBALS.get('baseUriConfig') as string) ?? '';
		// const response = await fetch(`${this._baseUri}config/glossary.json`);
		// const json = (await response.json()) as GlossaryEntry[];
		const json = (await fetchGlossar()) as GlossaryEntry[];
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
