export type ConformityLevel = 'A' | 'AA' | 'AAA';

export type ConstantCols = {
	chapter: string;
	title: string;
	requirement: string;
	WcagChapter: string;
	noteCap09: string;
	noteCap10: string;
	noteCap11: string;
	conformityLevel?: ConformityLevel;
	implementationAids: string;
};

export type Schema = ConstantCols & {
	custom: { [customElement: string]: string };
};
