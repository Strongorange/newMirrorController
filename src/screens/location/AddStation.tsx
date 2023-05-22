import {
  View,
  Text,
  ScrollView,
  FlatList,
  ListRenderItem,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as S from "../../styles/location/addStation.style";
import getDustStations from "../../utils/getDustStations";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  RadioButton,
} from "react-native-paper";
import { DustStation } from "../../types/dustStationTypes";
import {
  KoreanDistricts,
  KoreanDistrictsArray,
} from "../../types/koreanDistricts";
import firestore from "@react-native-firebase/firestore";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/authState";

const AddStation = () => {
  const navigation = useNavigation();
  const user = useRecoilValue(userState);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");
  const [dustStations, setDustStations] = useState<DustStation[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogSelectedDistrict, setDialogSelectedDistrict] = useState<
    KoreanDistricts | ""
  >("");
  const [selectedDistrict, setSelectedDistrict] = useState<
    KoreanDistricts | ""
  >("");
  // FUNCTIONS
  const callGetDustStations = async (district: KoreanDistricts) => {
    setIsFetching(true);
    try {
      const stations = await getDustStations(district);
      console.log(stations);
      setDustStations(stations);
    } catch (error) {
      console.log(error);
      setFetchError("측정소를 불러오는데 실패했습니다 다시 시도해주세요");
    } finally {
      setIsFetching(false);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const confirmDialog = () => {
    if (dialogSelectedDistrict === "") return;
    setSelectedDistrict(dialogSelectedDistrict);
    setDialogVisible(false);
  };

  const addStationToSettings = async (station: DustStation) => {
    if (user) {
      const documentRef = firestore().collection(user.uid).doc("settings");
      const document = await documentRef.get();
      if (document.exists) {
        const newLocation = {
          selected: {
            ...station,
          },
        };
        await documentRef.update({
          location: newLocation,
        });
        navigation.goBack();
      } else {
        console.log("Settings document does not exist");
      }
    } else {
      console.log("User is not logged in");
    }
  };

  const renderItem: ListRenderItem<DustStation> = ({ item }) => {
    return (
      <S.CurrentLocationCard
        mode="contained"
        onPress={() => addStationToSettings(item)}
      >
        <S.CurrentLocationCard.Title
          title={item.stationName}
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          subtitle={item.addr}
        />
        <S.CurrentLocationCard.Content>
          <S.Text>{item.item}</S.Text>
        </S.CurrentLocationCard.Content>
      </S.CurrentLocationCard>
    );
  };

  //EFFECTS
  useEffect(() => {
    if (selectedDistrict === "") return;
    callGetDustStations(selectedDistrict);
  }, [selectedDistrict]);
  //디버깅
  useEffect(() => {
    navigation.setOptions({ title: "측정소 추가" });
  }, []);

  return (
    <S.AddStationLayout>
      <Button
        mode="contained"
        onPress={() => setDialogVisible(true)}
        style={{ marginBottom: 30 }}
      >
        지역을 선택해주세요
      </Button>

      {isFetching && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {fetchError !== "" && <Text>{String(fetchError)}</Text>}

      {dustStations && !fetchError && !isFetching && (
        <FlatList
          data={dustStations}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.addr)}
          ListHeaderComponent={
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              {selectedDistrict}
            </Text>
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>지역을 선택하세요</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              {KoreanDistrictsArray &&
                KoreanDistrictsArray.map((district) => {
                  if (district === "전국") return;
                  return (
                    <Pressable
                      key={district}
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => setDialogSelectedDistrict(district)}
                    >
                      <RadioButton
                        value={district}
                        status={
                          dialogSelectedDistrict === district
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => setDialogSelectedDistrict(district)}
                      />
                      <Text>{district}</Text>
                    </Pressable>
                  );
                })}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={closeDialog}>취소</Button>
            <Button onPress={confirmDialog}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </S.AddStationLayout>
  );
};

export default AddStation;
