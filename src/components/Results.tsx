import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { KolButton, KolDetails, KolHeading } from '@public-ui/react';

import { Catalog } from '../data/catalog';
import { CsvExporter, HtmlExporter } from '../services/exporter';
import { ResultItem } from './ResultItem';
import { MdText } from './MdText';
import { useTitle } from '../hooks/useTitle';

export const Results: FC = () => {
	const { catalog } = useLoaderData() as { catalog: Catalog };

	const { t } = useTranslation();
	const navigate = useNavigate();
	const [showExplanations, setShowExplanations] = React.useState(true);
	useTitle('Standardanforderungskatalog Anforderungsliste | BMI');

	let description: string[] = t('results.description.text', { returnObjects: true });
	if (!Array.isArray(description)) {
		description = [];
	}

	const [expandStates, setExpandStates] = React.useState<boolean[]>(catalog.data.map(() => false));
	const collapseAll = () => setExpandStates([...expandStates.map((_) => false)]);
	const expandAll = () => setExpandStates([...expandStates.map((_) => true)]);
	const setExpandedStateAt = (expanded: boolean, index: number) => {
		expandStates[index] = expanded;
		return setExpandStates([...expandStates]);
	};

	return (
		<>
			<KolDetails _label={t('results.description.headline')} _open={showExplanations} _on={{ onToggle: (_, o: boolean) => setShowExplanations(o) }}>
				<MdText textBlocks={description} />
			</KolDetails>
			<hr />
			<ul className="flex flex-wrap gap-2 flex-justify-center">
				<li className="p-0 m-0">
					<KolButton className="w-full" _label={t('results.toolbar.collapse-all')} _on={{ onClick: collapseAll }} />
				</li>
				<li className="p-0 m-0">
					<KolButton className="w-full" _label={t('results.toolbar.expand-all')} _on={{ onClick: expandAll }} />
				</li>
				<li className="p-0 m-0">
					<KolButton className="w-full" _label={t('results.export.html')} _on={{ onClick: () => new HtmlExporter(catalog).download() }} />
				</li>
				<li className="p-0 m-0">
					<KolButton className="w-full" _label={t('results.export.csv')} _on={{ onClick: () => new CsvExporter(catalog).download() }} />
				</li>
			</ul>
			<div className="grid gap-2">
				<KolHeading _label={t('results.requirementList')} _level={2} />
				{catalog.data.map((d, index) => (
					<ResultItem key={index} data={d} catalog={catalog} expanded={expandStates[index]} onExpandToggled={(e) => setExpandedStateAt(e, index)} />
				))}
			</div>
			<div className="text-center">
				<KolButton
					className="w-full sm:w-auto"
					_label={t('results.back')}
					_on={{
						onClick: () =>
							navigate({
								pathname: '/',
							}),
					}}
					_variant="primary"
				/>
			</div>
		</>
	);
};
