import http from "./http";

export let getMockData = (id: number): Promise<any> =>
  http.get("http://localhost:8000/test", {
    params: {
      id,
    },
  });
