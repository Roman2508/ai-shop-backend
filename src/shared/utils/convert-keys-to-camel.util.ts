const toCamelCase = (str: string): string => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const convertKeysToCamel = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamel) as T;
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[toCamelCase(key)] = convertKeysToCamel(value);
    }
    return newObj as T;
  }

  return obj;
};
