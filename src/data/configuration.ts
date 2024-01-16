type ExcelColumn = {
	label: string;
	shortLabel: string;
	excelColHeader: string;
};

export type SolutionPropertyConfiguration = {
	defaultValue: boolean;
	visible: boolean;
	hint: string;
} & ExcelColumn;

export type KindOption = {
	hint: string;
	abbreviation: string;
} & ExcelColumn;

export type SolutionProperties = {
	[k: string]: SolutionPropertyConfiguration;
};
export type KindOptions = { [k: string]: KindOption };

export type SolutionPropertiesConfig = {
	options: SolutionProperties;
	strictOptions: string[];
};
