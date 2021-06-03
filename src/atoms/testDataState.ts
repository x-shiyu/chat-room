import { atom } from "recoil";
export interface TestData {
  id?: number;
  created_at?: string;
  children?: any[];
}
export interface Query {
  id?: number;
  page?: number;
}

export const originTestData = atom<TestData>({
  key: "origin_test_data",
  default: {},
});

export const query = atom<Query>({
  key: "query",
  default: { id: 1 },
});
