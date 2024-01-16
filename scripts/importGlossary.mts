import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import fs from 'fs';

console.log('Start refreshing glossary.');

const abbrText = 'Abkürzung: ';
const urlMap = {
	a: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267320',
	b: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267322',
	c: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267326',
	d: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267328',
	e: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267330',
	f: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267332',
	g: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267334',
	h: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267336',
	i: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267338',
	j: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267340',
	k: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267342',
	l: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267344',
	m: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267346',
	n: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267348',
	o: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267350',
	p: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267352',
	q: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267354',
	r: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267356',
	s: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267358',
	t: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267360',
	u: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267362',
	v: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267364',
	w: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267366',
	z: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/lexikon/functions/bmi-lexikon.html?cms_lv2=18267372',
};

type GlossaryEntry = { name: string; abbr?: string; desc?: string };

const readGlossaryForLetter = async (letter: keyof typeof urlMap) => {
	const response = await fetch(urlMap[letter]);
	const html = await response.text();

	var el = parse(html);

	// find element with class "content-glossary"
	var root = el.querySelector('.content-glossary');
	if (root === null) {
		console.log('No root element found.');
		return [];
	}

	var h2s = root.getElementsByTagName('h2');

	const glossary: GlossaryEntry[] = [];

	// alle Folgelemente der <h2> durchlaufen
	for (var i = 0; i < h2s.length; i++) {
		const name = h2s[i].textContent;
		if (name === null) {
			continue;
		}

		var content = h2s[i].nextElementSibling;
		if (content === null) {
			console.log('No content for ' + h2s[i].textContent);
			continue;
		}
		var ps = Array.from(content.getElementsByTagName('p'));
		var entry: GlossaryEntry = {
			name,
			desc:
				ps
					.map((x) => x.textContent)
					.filter((x) => x !== null && !x.startsWith(abbrText))
					.join('\n') || undefined,
			abbr:
				ps
					.map((x) => x.textContent)
					.filter((x) => x !== null && x.startsWith(abbrText))
					.map((x) => x?.substring(abbrText.length))
					.join('\n') || undefined,
		};
		glossary.push(entry);
	}

	console.log('Found ' + glossary.length + ' entries for letter ' + letter + '.');

	return glossary;
};

const writeGlossary = async (glossary: GlossaryEntry[]) => {
	const path = './public/config/glossary.json';
	const json = JSON.stringify(glossary, null, 2);

	// write JSON string to a file with fs
	await fs.writeFile(path, json, 'utf8', (err) => {
		if (err) {
			console.log('Error writing file', err);
			return;
		}
		console.log('Successfully wrote file');
	});
};

const startScript = async () => {
	const glossary: GlossaryEntry[] = (
		await Promise.all(
			Object.keys(urlMap)
				.map((x) => x as keyof typeof urlMap)
				.map(readGlossaryForLetter)
		)
	).flat();

	await writeGlossary(glossary);
};

void startScript().then(() => console.log('Done.'));
