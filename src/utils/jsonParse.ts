//from: https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript
export const safeJsonParse =
  <T>(guard: (o: any) => o is T) =>
  (text: string): ParseResult<T> => {
    const parsed = JSON.parse(text);
    return guard(parsed) ? { parsed, hasError: false } : { hasError: true };
  };

type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown };
