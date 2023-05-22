import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as S from "../../styles/location/location.style";
import { FirestoreSettings } from "../../types/firestoreSettings";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";

interface CurrentLocationProps {
  settings: FirestoreSettings;
}

type StackParamList = {
  Location: undefined;
  AddStation: undefined;
};

// Create a type for the navigation prop
type NavigationProp = NativeStackNavigationProp<StackParamList, "Location">;

const CurrentLocation = ({ settings }: CurrentLocationProps) => {
  const { selected } = settings.location;
  const navigation = useNavigation<NavigationProp>();

  //FUNCTIONS
  const addStation = () => {
    navigation.navigate("AddStation");
  };

  //EFFECTS
  useEffect(() => {
    navigation.setOptions({ title: "현재 측정소" });
  }, []);

  return (
    <S.CurrentLocationLayout>
      {selected.stationName ? (
        <S.CurrentLocationCard mode="contained">
          <S.CurrentLocationCard.Title
            title={selected.stationName}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            subtitle={selected.addr}
            right={() => (
              <View>
                <Button onPress={addStation}>수정</Button>
              </View>
            )}
          />
          <S.CurrentLocationCard.Content>
            <S.Text>{selected.item}</S.Text>
          </S.CurrentLocationCard.Content>
        </S.CurrentLocationCard>
      ) : (
        <S.StationNotFound>
          <S.AddStation mode="contained" onPress={addStation}>
            <S.AddStation.Title
              title="측정소 추가"
              left={() => <S.AddButton icon="plus" />}
            />
          </S.AddStation>
        </S.StationNotFound>
      )}
    </S.CurrentLocationLayout>
  );
};

export default CurrentLocation;
