export function getAlt(filename: string) {
  const match = filename.match(/\d+/);

  return match && parseInt(match[0], 10);
}
