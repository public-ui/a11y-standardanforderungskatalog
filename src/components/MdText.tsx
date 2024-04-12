import React, { FC } from 'react';
import { KolLink } from '@public-ui/react';
import { GlossaryText } from './GlossaryText';

type Props = {
	textBlocks: string[];
};

type Block = {
	type: 'p' | 'ol' | 'ul';
	blocks: string[];
};

export const MdText: FC<Props> = ({ textBlocks }) => {
	const blocks: Block[] = [];
	for (let i = 0; i < textBlocks.length; i++) {
		const block = textBlocks[i];
		if (block.startsWith('- ')) {
			if (blocks.length === 0 || blocks[blocks.length - 1].type !== 'ul') {
				blocks.push({ type: 'ul', blocks: [] });
			}
			blocks[blocks.length - 1].blocks.push(block.substring(2));
		} else if (/^\d+\. /.test(block)) {
			if (blocks.length === 0 || blocks[blocks.length - 1].type !== 'ol') {
				blocks.push({ type: 'ol', blocks: [] });
			}
			blocks[blocks.length - 1].blocks.push(block.substring(3));
		} else {
			blocks.push({ type: 'p', blocks: [block] });
		}
	}

	const replaceForeignLanguageTexts = (inputText: string, keyPrefix: string) => {
		const regex = /(<en>)(.*?)(<\/en>)/g; // https://regex101.com/r/URtAGX/1
		const parts = inputText.split(regex);
		const elements: React.JSX.Element[] = [];

		parts.forEach((part, index) => {
			if (index % 4 === 2) {
				// Englischer Text
				elements.push(
					<span key={`${keyPrefix}${index}`} lang="en">
						{replaceMarkdownLinks(part, `${keyPrefix}${index}-`)}
					</span>,
				);
			} else if (index % 4 === 0 && part !== '') {
				// Normaler Text
				elements.push(...replaceMarkdownLinks(part, `${keyPrefix}${index}-`));
			}
		});

		return elements;
	};

	const replaceMarkdownLinks = (inputText: string, keyPrefix: string) => {
		const regex = /\[([^[]*?)]\((.*?)\)/g; // https://regex101.com/r/1XpBTD/1
		const parts = inputText.split(regex);
		const elements: React.JSX.Element[] = [];

		parts.forEach((part, index) => {
			if (index % 3 === 1) {
				// Text innerhalb der eckigen Klammern (Link-Titel)
				elements.push(<KolLink key={index.toString()} _href={parts[index + 1]} _label={part} _target="blank"></KolLink>);
			} else if (index % 3 === 0 && part !== '') {
				// Normaler Text ohne Link
				elements.push(<GlossaryText key={`${keyPrefix}${index}`} text={part} />);
			}
		});

		return elements;
	};

	return (
		<>
			{blocks.map((block, i) => {
				if (block.type === 'p') {
					return <p key={i}>{replaceForeignLanguageTexts(block.blocks[0], '')}</p>;
				} else if (block.type === 'ul') {
					return (
						<ul key={i}>
							{block.blocks.map((b, i2) => (
								<li key={i2}>{replaceForeignLanguageTexts(b, '')}</li>
							))}
						</ul>
					);
				} else if (block.type === 'ol') {
					return (
						<ol key={i}>
							{block.blocks.map((b, i2) => (
								<li key={i2}>{replaceForeignLanguageTexts(b, '')}</li>
							))}
						</ol>
					);
				} else {
					return <p key={i}>Unknown block type: {block.type}</p>;
				}
			})}
		</>
	);
};
