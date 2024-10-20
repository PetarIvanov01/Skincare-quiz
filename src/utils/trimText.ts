export function trimText(text: string, maxLength: number = 400): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
