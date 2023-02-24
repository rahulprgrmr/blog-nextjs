export function exclude(obj: any, excludeKeys: string[]) {
  for (let key of excludeKeys) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }
  return obj;
}
