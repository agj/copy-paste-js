export default (regex: RegExp) => (text: string) => regex.test(text);
