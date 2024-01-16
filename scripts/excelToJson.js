const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');

readXlsxFile(path.resolve(process.cwd(), 'public/config/katalog-v0.996.xlsx'), {
	sheet: 'DATEN',
}).then((data) => {
	fs.writeFileSync(path.resolve(process.cwd(), 'src/services/config/katalog.json'), JSON.stringify(data, null, 2));
});
