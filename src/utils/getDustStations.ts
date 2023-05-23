import { KoreanDistricts } from "../types/koreanDistricts";
import axios from "axios";
import { DUST_API_KEY } from "@env";

const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";

const getDustStations = async (district: KoreanDistricts) => {
  try {
    const { data } = await axios(API_URL, {
      params: {
        serviceKey: DUST_API_KEY,
        returnType: "json",
        addr: district,
        numOfRows: 100,
      },
      timeout: 10000,
    });
    console.log(data.response.body.items);
    return data.response.body.items;
  } catch (error) {
    console.log(error);
  }
};

export default getDustStations;
