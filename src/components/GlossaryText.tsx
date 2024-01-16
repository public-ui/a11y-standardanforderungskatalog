import React, { FC } from 'react';

// import { KolAbbr } from '@public-ui/react';

// import glossary, { GlossaryEntry } from '../services/glossary';

type Props = {
	text: string;
};

export const GlossaryText: FC<Props> = (props) => {
	// Uncommented for version 1 - must be reenabled in version 2.
	// let textParts: (string | GlossaryEntry)[] = [props.text];
	// glossary.entries.forEach((entry) => {
	// 	const regex = new RegExp(`\\b(${entry.abbr ?? entry.name})\\b`, 'g');
	// 	textParts = textParts
	// 		.map((part) => {
	// 			if (typeof part === 'string') {
	// 				return part.split(regex).map((p, i) => (i % 2 === 0 ? p : entry));
	// 			} else {
	// 				return [part];
	// 			}
	// 		})
	// 		.flat();
	// });
	// return (
	// 	<>
	// 		{textParts.map((t, i) =>
	// 			typeof t === 'string' ? (
	// 				t
	// 			) : (
	// 				<KolAbbr key={i} _label={t.desc ?? t.name}>
	// 					{t.abbr ?? t.name}
	// 				</KolAbbr>
	// 			),
	// 		)}
	// 	</>
	// );

	return <>{props.text}</>;
};
