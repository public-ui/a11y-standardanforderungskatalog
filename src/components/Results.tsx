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

	return (
		<>
			<KolDetails _label={t('results.description.headline')} _open={showExplanations} _on={{ onToggle: (_, o: boolean) => setShowExplanations(o) }}>
				<MdText textBlocks={description} />
			</KolDetails>
			<hr />
			<div className="grid gap-2 sm:grid-cols-2 sm:justify-items-center">
				<div>
					<KolButton className="w-full" _label={t('results.export.html')} _on={{ onClick: () => new HtmlExporter(catalog).download() }} />
				</div>
				<div>
					<KolButton className="w-full" _label={t('results.export.csv')} _on={{ onClick: () => new CsvExporter(catalog).download() }} />
				</div>
			</div>
			<div className="grid gap-2">
				<KolHeading _label={t('results.requirementList')} _level={2} />
				{catalog.data.map((d, index) => (
					<ResultItem key={index} data={d} catalog={catalog} />
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
