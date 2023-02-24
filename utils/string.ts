export function toTitleCase(text: string) {
  if (text.length < 1) {
    return "";
  }
  let words = text.split(" ");
  words = words.map((word) => word.trim()).filter((word) => word.length > 0);
  if (words.length < 1) {
    return "";
  }
  const titleCaseWords = words.map(
    (word) => word[0].toUpperCase() + word.substring(1)
  );
  return titleCaseWords.join(" ");
}
