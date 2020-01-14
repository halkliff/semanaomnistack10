export default function stringToArray(str: string): string[] {
  return str.split(",").map(str => str.trim());
}