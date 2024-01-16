import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { KolAccordion, KolHeading } from '@public-ui/react';

import { Catalog } from '../data/catalog';
import { Schema } from '../data/schema';
import configurationService from '../services/configuration';

import { containsChapterNumber } from '../data/utils';
import { MdText } from './MdText';

const EN_Regex = /^EN\s\d{3}\s\d{3}/i;

function compareChapterNumbers(a: string, b: string) {
	// Extrahiere die Kapitelnummern aus den Strings
	const regex = /(\d+(\.\d+)?)/g;
	const chaptersA = a.match(regex)?.map(Number) ?? [];
	const chaptersB = b.match(regex)?.map(Number) ?? [];

	// Vergleiche die Kapitelnummern
	const minLength = Math.min(chaptersA.length, chaptersB.length);
	for (let i = 0; i < minLength; i++) {
		if (chaptersA[i] !== chaptersB[i]) {
			return chaptersA[i] - chaptersB[i];
		}
	}

	// Wenn die bisherigen Kapitelnummern identisch waren, vergleiche die Längen der Strings
	return chaptersA.length - chaptersB.length;
}

type Props = {
	data: Schema;
	catalog: Catalog;
};

export const ResultItem: FC<Props> = ({ data: item, catalog }) => {
	const { t } = useTranslation();

	const chapterGroups = Object.entries(configurationService.kindOptions)
		.filter(([key, kind]) => catalog.setup.kinds.indexOf(key) >= 0 && !!item.custom[kind.excelColHeader])
		.reduce(
			(chapterGroups, [_, kind]) => {
				const chapters = item.custom[kind.excelColHeader];
				chapters
					.split('\n')
					.filter((chapter) => !!chapter)
					.forEach((chapter) => {
						chapterGroups[chapter] = chapterGroups[chapter] ?? [];
						chapterGroups[chapter].push(kind.shortLabel);
					});
				return chapterGroups;
			},
			{} as { [k: string]: string[] },
		);

	return (
		<KolAccordion _label={item.title} _level={3}>
			<div slot="content" className="grid gap-2">
				<div>
					<div className={`grid grid-cols-2 gap-4`}>
						<div>
							<KolHeading _level={4} _label={t('results.requirement.kind')}></KolHeading>
							<ul>
								{Object.entries(chapterGroups)
									.sort((a, b) => compareChapterNumbers(a[0], b[0]))
									.map(([chapter, kinds], i) => (
										<li key={i}>{`${chapter.replace(EN_Regex, 'EN')} (${kinds.join(', ')})`}</li>
									))}
								{item.WcagChapter && item.conformityLevel && (
									<>
										<li>{`WCAG ${item.WcagChapter} (${item.conformityLevel})`}</li>
									</>
								)}
							</ul>
						</div>
						<div>
							<KolHeading _level={4} _label={t('results.requirement.property')}></KolHeading>
							<ul>
								{Object.entries(configurationService.solutionProperties)
									.filter(([_, entry]) => item.custom[entry.excelColHeader]?.toLowerCase() === 'x')
									.map(([key, entry]) => (
										<li key={key}>{entry.shortLabel}</li>
									))}
							</ul>
						</div>
					</div>
				</div>
				{item.requirement && (
					<>
						<KolHeading _level={4} _label={t('results.requirement.description')}></KolHeading>
						<div>
							<MdText textBlocks={item.requirement.split('\n')} />
						</div>
					</>
				)}
				{item.noteCap09 && containsChapterNumber(Object.keys(chapterGroups), 9) && (
					<>
						<KolHeading _level={4} _label={t('results.requirement.note.cap09')}></KolHeading>
						<div>
							<MdText textBlocks={item.noteCap09.split('\n')} />
						</div>
					</>
				)}
				{item.noteCap10 && containsChapterNumber(Object.keys(chapterGroups), 10) && (
					<>
						<KolHeading _level={4} _label={t('results.requirement.note.cap10')}></KolHeading>
						<div>
							<MdText textBlocks={item.noteCap10.split('\n')} />
						</div>
					</>
				)}
				{item.noteCap11 && containsChapterNumber(Object.keys(chapterGroups), 11) && (
					<>
						<KolHeading _level={4} _label={t('results.requirement.note.cap11')}></KolHeading>
						<div>
							<MdText textBlocks={item.noteCap11.split('\n')} />
						</div>
					</>
				)}
				{item.implementationAids && (
					<>
						<KolHeading _level={4} _label={t('results.requirement.implementationAids')}></KolHeading>
						<div>
							<MdText textBlocks={item.implementationAids.split('\n')} />
						</div>
					</>
				)}
			</div>
		</KolAccordion>
	);
};
