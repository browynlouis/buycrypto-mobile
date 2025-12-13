/**
 * Pretty-prints any value as formatted JSON.
 *
 */
export function printJSON(value: any, space: number = 2, sortKeys: boolean = false): string {
  // If sorting keys is enabled, recursively sort objects
  const sort = (obj: any): any => {
    if (Array.isArray(obj)) {
      // Sort each element inside an array
      return obj.map(sort);
    }
    if (obj && typeof obj === 'object') {
      // Sort object keys alphabetically
      return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = sort(obj[key]);
          return acc;
        }, {} as any);
    }
    return obj;
  };

  const output = sortKeys ? sort(value) : value;

  // Convert to formatted JSON string
  return JSON.stringify(output, null, space);
}
