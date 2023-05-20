import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as S from "../../styles/location/addStation.style";
import getDustStations from "../../utils/getDustStations";

const AddStation = () => {
  // FUNCTIONS
  const callGetDustStations = async () => {
    const stations = await getDustStations("서울");
    console.log(stations);
  };

  //디버깅
  useEffect(() => {
    callGetDustStations();
  }, []);

  return (
    <S.AddStationLayout>
      <Text>AddStation</Text>
    </S.AddStationLayout>
  );
};

export default AddStation;
