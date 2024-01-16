import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MdText } from './MdText';
import { KolDetails } from '@public-ui/react';

export const Introduction: FC = () => {
	const [showExamples, setShowExamples] = React.useState(false);

	const { t } = useTranslation();
	const texts: string[] = t('introduction', { returnObjects: true });
	if (!Array.isArray(texts)) {
		return <></>;
	}

	return (
		<div>
			<MdText textBlocks={texts} />

			<KolDetails _label={t('introExamples.title')} _open={showExamples} _on={{ onToggle: (_, o: boolean) => setShowExamples(o) }}>
				<KolDetails _label={t('introExamples.example1.title')}>
					<MdText textBlocks={t('introExamples.example1.content', { returnObjects: true })} />
				</KolDetails>
				<KolDetails _label={t('introExamples.example2.title')}>
					<MdText textBlocks={t('introExamples.example2.content', { returnObjects: true })} />
				</KolDetails>
				<KolDetails _label={t('introExamples.example3.title')}>
					<MdText textBlocks={t('introExamples.example3.content', { returnObjects: true })} />
				</KolDetails>
			</KolDetails>
		</div>
	);
};
