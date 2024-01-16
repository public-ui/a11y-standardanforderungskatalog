import readXlsxFile from 'read-excel-file';

export const getDataFromExcel = async (sheet?: string) => {
	try {
		const result = await fetch('config/katalog.xlsx');
		return await readXlsxFile(await result.blob(), {
			sheet,
		});
	} catch (e) {
		try {
			const result = await fetch('');
			return await readXlsxFile(await result.blob());
		} catch (e) {
			return [];
		}
	}
};
