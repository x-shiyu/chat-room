export function mapAdd<K, V>(origin: Map<K, V>, key: K, value: V): Map<K, V> {
  let map = new Map(origin);
  map.set(key, value);
  return map;
}
