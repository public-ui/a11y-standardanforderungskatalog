import DATA from './config/data.json';
import GLOSSAR from './config/glossary.json';
import KIND_OPTIONS from './config/kindOptions.json';
import SOLUTION_PROPERTIES from './config/solutionProperties.json';
import LOCALES_DE from './locales/de.json';
import EXCEL from './config/katalog.json';

export const GLOBALS: Map<string, unknown> = new Map();
GLOBALS.set('baseUriConfig', '');

export const fetchData = () => new Promise((resolve) => resolve(DATA));
export const fetchGlossar = () => new Promise((resolve) => resolve(GLOSSAR));
export const fetchKindOptions = () => new Promise((resolve) => resolve(KIND_OPTIONS));
export const fetchSolutionProperties = () => new Promise((resolve) => resolve(SOLUTION_PROPERTIES));
export const fetchLocalesDe = () => new Promise((resolve) => resolve(LOCALES_DE));
export const fetchExcel = () => new Promise((resolve) => resolve(EXCEL));
