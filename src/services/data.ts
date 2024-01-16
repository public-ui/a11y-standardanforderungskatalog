import { Row } from 'read-excel-file';
import { getDataFromExcel } from '../components/fetch-excel';
import { ConformityLevel, ConstantCols, Schema } from '../data/schema';
import EXCEL from './config/katalog.json';
import { fetchData } from './globals';

type DataConfig = {
	sheetName: string;
	firstColHeader: string;
	fixedCols: ConstantCols;
};

const levelRegex = new RegExp('^[A]{1,3}$');

export default class DataService {
	// private _baseUri = '';
	private _data?: Schema[];

	/**
	 * Gets the complete data
	 */
	public get data() {
		if (!this._data) {
			throw new Error('Data not loaded yet');
		}
		return this._data;
	}

	public loadData = async () => {
		// this._baseUri = (GLOBALS.get('baseUriConfig') as string) ?? '';
		// const response = await fetch(`${this._baseUri}config/data.json`);
		// const dataConfig = (await response.json()) as DataConfig;
		const dataConfig = (await fetchData()) as DataConfig;

		// let data = await getDataFromExcel(dataConfig.sheetName);
		// console.log('fetch', data);
		const data = JSON.parse(JSON.stringify(EXCEL)) as Row[];
		// console.log('file', data);

		// eslint-disable-next-line no-var
		for (var headerIndex = 0; headerIndex < data.length; headerIndex++) {
			const element = data[headerIndex];
			if (element[0] === dataConfig.firstColHeader) {
				break;
			}
		}

		const headers = data[headerIndex];
		data.splice(0, headerIndex + 1);
		const preparedData: Schema[] = [];
		try {
			data.forEach((rows) => {
				const dataTuple: Schema = {
					chapter: '',
					WcagChapter: '',
					noteCap09: '',
					noteCap10: '',
					noteCap11: '',
					requirement: '',
					title: '',
					implementationAids: '',
					custom: {},
				} satisfies Schema;
				rows.forEach((item, i) => {
					const fixedColKeys = Object.entries(dataConfig.fixedCols)
						.filter(([_, v]) => v === headers[i])
						.map(([k]) => k);
					if (fixedColKeys.length === 1) {
						if (fixedColKeys[0] === 'conformityLevel') {
							if (levelRegex.test(item as string)) {
								dataTuple[fixedColKeys[0] as keyof ConstantCols] = item as ConformityLevel;
							}
						} else {
							dataTuple[fixedColKeys[0] as keyof Omit<ConstantCols, 'conformityLevel'>] = item as string;
						}
					} else {
						dataTuple.custom[headers[i] as string] = item as string;
					}
				});
				this.validateTuple(dataTuple);

				preparedData.push(dataTuple);
			});
		} catch (e) {
			console.error(e);
		}
		this._data = preparedData;
	};

	private validateTuple(dataTuple: Schema) {
		if (dataTuple.requirement === '') {
			throw new Error('Requirement is empty');
		}

		if (dataTuple.title === '') {
			throw new Error('Title is empty');
		}

		if (dataTuple.WcagChapter === '') {
			throw new Error('WCAG Chapter is empty');
		}

		if (dataTuple.chapter === '') {
			throw new Error('Chapter is empty');
		}

		if (Object.keys(dataTuple.custom).length === 0) {
			throw new Error('No custom data found');
		}
	}
}
