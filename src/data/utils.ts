/**
 * Prüft, ob eine der Anforderungen aus dem gegebenen Kapiel sind.
 * @param texts Die Texte, die die Kapitelnummern beinhalten
 * @param chapter Das Kapitel, das geprüft werden soll
 */
export function containsChapterNumber(texts: string[], chapter: number) {
	const regex = /(\d+)(?:\.\d+)/;
	return texts.some((text) => {
		const chapters = text.match(regex)?.map(Number) ?? [];
		return chapters.includes(chapter);
	});
}
