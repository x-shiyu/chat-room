import { Notice } from "@/atoms/Notice";

//生成新的map
export function mapAdd<K, V>(origin: Map<K, V>, key: K, value: V): Map<K, V> {
  let map = new Map(origin);
  map.set(key, value);
  return map;
}

export const toString = (obj: any): string => {
  return Object.prototype.toString.call(obj);
};

//map和object互转
export function mapAndArray(data: any): Map<number, number> | string {
  if (toString(data) === "[object Map]") {
    return JSON.stringify(Array.from(data.entries()));
  } else {
    if (data) {
      return new Map(JSON.parse(data));
    }
    return new Map();
  }
}

export function noticeParse(data: Notice | string) {
  if (typeof data === "string") {
    let result = JSON.parse(data);
    result["latest_view_room"] = mapAndArray(result["latest_view_room"]);
    return result;
  } else {
    return JSON.stringify({
      latest_view_room: data.latest_view_room,
      latest_view_contact: mapAndArray(data.latest_view_contact),
    });
  }
}

export function saveNoticeViewTime(data: any) {
  localStorage.setItem("latest_view_contact", data["latest_view_contact"]);
  localStorage.setItem(
    "latest_view_room",
    mapAndArray(data["latest_view_room"]) as string
  );
}

export function stateSplice(
  state: any[],
  filterFn: (item: any) => boolean,
  newData: any
) {
  let newState = [...state];
  let index = newState.findIndex(filterFn);
  newState.splice(index, 1, {
    ...newState[index],
    ...newData,
  });
  return newState;
}
