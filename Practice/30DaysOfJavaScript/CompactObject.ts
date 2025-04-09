type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
  if (Array.isArray(obj)) {
    const result = [];
    for (const item of obj) {
      const temp =
        Array.isArray(item) || (typeof item === "object" && item !== null)
          ? compactObject(item)
          : item;
      if (Boolean(temp)) result.push(temp);
    }
    return result;
  }

  const result: Record<string, JSONValue> = {};
  for (const [key, value] of Object.entries(obj)) {
    const temp =
      Array.isArray(value) || (typeof value === "object" && value !== null)
        ? compactObject(value)
        : value;
    if (Boolean(temp)) result[key] = temp;
  }
  return result;
}

// reduceで書いてたけど遅くて通らなかったから渋々for文で。
