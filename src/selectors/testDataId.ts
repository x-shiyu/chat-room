import { query, originTestData } from "@/atoms/testDataState";
import { selector, selectorFamily } from "recoil";
import { getMockData } from "@/api/mock";

export const originDataId = selectorFamily({
  key: "origin_data_id",
  get:
    (id: number) =>
    async ({ get }) => {
      console.log("getData-----");
      const response = await getMockData(id);
      if (response.error) {
        throw response.error;
      }
      return response;
    },
});

export const originDataChildren = selector({
  key: "origin_data_children",
  get({ get }) {
    return get(originTestData).children || [];
  },
});
