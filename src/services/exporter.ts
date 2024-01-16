import { stringify } from 'csv-stringify/browser/esm/sync';

import MarkdownIt from 'markdown-it';
import { Catalog } from '../data/catalog';
import { KindOption, SolutionPropertyConfiguration } from '../data/configuration';
import configurationService from './configuration';
import { containsChapterNumber } from '../data/utils';
import { Schema } from '../data/schema';

abstract class Exporter {
	private readonly exportKinds = true;
	private readonly exportProperties = true;
	private readonly exportRemarks9: boolean;
	private readonly exportRemarks10: boolean;
	private readonly exportRemarks11: boolean;
	private readonly exportImplementationAids: boolean;

	private readonly activeKindOptions: KindOption[] = [];
	private readonly activeSolutionProperties: SolutionPropertyConfiguration[] = [];

	protected readonly metadata = {
		versions: {
			text: 'Folgende Versionen liegen den hier genannten Anforderungen zugrunde:',
			sources: ['BITV 2.0, Stand Mai 2019', 'EN 301 549, V. 3.2.1 (kurz EN)', 'WCAG 2.1'],
		},
		source: {
			text: 'Quelle',
			link: {
				text: 'Portal Barrierefreiheit',
				url: 'https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/service/Standardanforderungskatalog/standardanforderungskatalog-node.html',
			},
		},
	};

	public constructor(protected _catalog: Catalog) {
		_catalog.setup.kinds.forEach((key) => {
			this.activeKindOptions.push(configurationService.kindOptions[key]);
		});

		Object.values(_catalog.setup.solutionProperties).forEach((property) => {
			if (_catalog.data.some((row) => row.custom[property.excelColHeader])) {
				this.activeSolutionProperties.push(property);
			}
		});
		this.exportRemarks9 = this._catalog.data.some((item) => containsChapterNumber(this.getChapterGroups(item), 9));
		this.exportRemarks10 = this._catalog.data.some((item) => containsChapterNumber(this.getChapterGroups(item), 10));
		this.exportRemarks11 = this._catalog.data.some((item) => containsChapterNumber(this.getChapterGroups(item), 11));
		this.exportImplementationAids = this._catalog.data.some((item) => !!item.implementationAids);
	}

	public abstract download(): void;

	protected startDownload(blob: Blob, filename: string) {
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	protected collectData(): string[][] {
		const records: string[][] = [];
		this._catalog.data.forEach((row) => {
			const values = [row.title, row.requirement, row.conformityLevel || '', row.WcagChapter ? ' ' + row.WcagChapter : ''];
			if (this.exportKinds) {
				values.push(...this.activeKindOptions.map((p) => row.custom[p.excelColHeader]));
			}
			if (this.exportProperties) {
				values.push(...this.activeSolutionProperties.map((p) => (row.custom[p.excelColHeader] ? '⨯' : '')));
			}
			if (this.exportRemarks9) {
				values.push(row.noteCap09);
			}
			if (this.exportRemarks10) {
				values.push(row.noteCap10);
			}
			if (this.exportRemarks11) {
				values.push(row.noteCap11);
			}
			if (this.exportImplementationAids) {
				values.push(row.implementationAids);
			}
			records.push(values);
		});
		return records;
	}

	protected getHeaders(): string[] {
		const headers: string[] = ['Titel', 'Anforderung', 'Konformitätsstufe', 'WCAG-Kapitel'];
		if (this.exportKinds) {
			headers.push(...this.activeKindOptions.map((p) => p.label));
		}
		if (this.exportProperties) {
			headers.push(...this.activeSolutionProperties.map((p) => p.label));
		}

		if (this.exportRemarks9) {
			headers.push('Anm. Abschnitt 9');
		}
		if (this.exportRemarks10) {
			headers.push('Anm. Abschnitt 10');
		}
		if (this.exportRemarks11) {
			headers.push('Anm. Abschnitt 11');
		}
		if (this.exportImplementationAids) {
			headers.push('Umsetzungshilfen');
		}

		return headers;
	}

	/**
	 * The filename for the export with this format: YYYY-MM-DD-HH-mm_BITV_Anforderungen_[Kinds].
	 * @returns the filename for the export
	 */
	protected getFilename(): string {
		const d = new Date();
		const year = d.getFullYear().toString().padStart(4, '0');
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}_Standardanforderungskatalog_Barrierefreiheit_${this.activeKindOptions.map((x) => x.abbreviation).join('_')}`;
	}

	private getChapterGroups = (item: Schema) => {
		const chapters = new Set<string>();
		Object.values(this.activeKindOptions)
			.filter((kind) => !!item.custom[kind.excelColHeader])
			.forEach((kind) => {
				item.custom[kind.excelColHeader]
					.split('\n')
					.filter((chapter) => !!chapter)
					.forEach((chapter) => chapters.add(chapter));
			});
		return Array.from(chapters);
	};
}

export class CsvExporter extends Exporter {
	/**
	 *  Creates a new exporter for the given catalog instance.
	 */
	public constructor(_catalog: Catalog) {
		super(_catalog);
	}

	public download() {
		const metadata = [
			[this.metadata.versions.text, ...this.metadata.versions.sources],
			[this.metadata.source.text, this.metadata.source.link.text, this.metadata.source.link.url],
		];
		const headers = this.getHeaders();
		const data = this.collectData();

		this.startDownload(
			new Blob([
				'\ufeff',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				stringify([...metadata, headers, ...data], {
					decodeStrings: true,
					delimiter: ';',
					quoted: true,
				}),
			]),
			`${this.getFilename()}.csv`,
		);
	}
}

export class HtmlExporter extends Exporter {
	/**
	 *  Creates a new exporter for the given catalog instance.
	 */
	public constructor(_catalog: Catalog) {
		super(_catalog);
	}

	public download() {
		const headers = this.getHeaders();
		const data = this.collectData();

		this.startDownload(
			new Blob([this.createHtmlDocument(this.createMetadataHtml(), this.createHtmlTable(headers, data))], { type: 'text/html;charset=utf-8;' }),
			`${this.getFilename()}.html`,
		);
	}

	private createHtmlDocument(...htmlParts: string[]): string {
		return `<!DOCTYPE html>
			<html lang="de" dir="ltr">
			<head>
				<meta charset="UTF-8">
				<title>${this.getFilename().replace(/_/g, ' ')}</title>
			</head>
			<body>
			${htmlParts.join('')}
			</body>
			</html>
			`;
	}

	private createMetadataHtml(): string {
		const container = document.createElement('div');
		const header = document.createElement('h1');
		header.appendChild(document.createTextNode('Metadaten'));
		container.appendChild(header);

		const versionsText = document.createElement('p');
		versionsText.appendChild(document.createTextNode(this.metadata.versions.text));
		const versionsList = document.createElement('ul');
		this.metadata.versions.sources.forEach((source) => {
			const li = document.createElement('li');
			li.appendChild(document.createTextNode(source));
			versionsList.appendChild(li);
		});
		versionsText.appendChild(versionsList);
		container.appendChild(versionsText);

		const sourceText = document.createElement('p');
		sourceText.appendChild(document.createTextNode(this.metadata.source.text + ': '));
		const sourceLink = document.createElement('a');
		sourceLink.appendChild(document.createTextNode(this.metadata.source.link.text));
		sourceLink.setAttribute('href', this.metadata.source.link.url);
		sourceText.appendChild(sourceLink);
		container.appendChild(sourceText);

		return container.outerHTML;
	}

	/**
	 * Create an HTML table for the given data.
	 * @param headers the headers
	 * @param data the content data
	 */
	private createHtmlTable(headers: string[], data: string[][]): string {
		const md: MarkdownIt = new MarkdownIt();

		const container = document.createElement('div');

		const header = document.createElement('h1');
		header.appendChild(document.createTextNode('Anforderungen'));
		container.appendChild(header);

		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tr = document.createElement('tr');
		headers.forEach((header) => {
			const th = document.createElement('th');
			th.innerText = header;
			tr.appendChild(th);
		});
		thead.appendChild(tr);
		table.appendChild(thead);
		table.setAttribute('border', '1');

		const tbody = document.createElement('tbody');
		data.forEach((row) => {
			const tr = document.createElement('tr');
			row.forEach((cell, index) => {
				let td = document.createElement('td');
				/**
				 * Die Zeilen stellen jeweils eine Anforderung dar, die als Überschrift dargestellt werden sollte.
				 * Der Screenreader liest die Überschriften vor, wenn sie als th-Elemente ausgezeichnet sind.
				 * So erhält man eine Art Matrix-Vorlesen.
				 */
				if (index === 0) {
					td = document.createElement('th');
				}
				if (cell) {
					/**
					 * Issue: "x" does not provide clear information and is misleading
					 *
					 * Solutions:
					 * - Replace "x" with "⨯" (U+2A2F) -> spricht "Kreuz" (VoiceOver)
					 * - Replace "x" with "✓" (U+2713) -> spricht "Markierungszeichen" (VoiceOver)
					 * - Replace "x" with "✔" (U+2714) -> spricht "Markierung" (VoiceOver)
					 * - Replace "x" with "✅" (U+2705) -> spricht "Markierungszeichen" (VoiceOver)
					 * - Replace "x" with "ausgewählt", "zutreffend" o.ä.
					 */
					td.innerHTML = md.render(cell.trim().replace(/^⨯$/i, '✔'));
				}
				tr.appendChild(td);
			});
			tbody.appendChild(tr);
		});
		table.appendChild(tbody);
		container.appendChild(table);

		return container.outerHTML;
	}
}
