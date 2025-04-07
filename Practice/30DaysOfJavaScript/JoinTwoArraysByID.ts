type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

type ArrayType = { id: number } & Record<string, JSONValue>;

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  const updated = [...arr1, ...arr2].reduce((obj, cur) => {
    obj[cur.id] = obj[cur.id] ? { ...obj[cur.id], ...cur } : cur;
    return obj;
  }, {} as Record<string, ArrayType>);

  return Object.values(updated);
}
