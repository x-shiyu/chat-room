import http from "./http";

export let getMockData = (id: number): Promise<any> =>
  http.get("https://hn.algolia.com/api/v1/items/" + id);
