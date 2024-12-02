const UPPERCASE_WORDS = new Set([
  'ram',
  'cpu',
  'gpu',
  'ssd',
  'hdd',
  'nfc',
  'usb',
]);

export function capitalize(text: string): string {
  if (!text) {
    return text;
  }

  if (UPPERCASE_WORDS.has(text.toLowerCase())) {
    return text.toUpperCase();
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
