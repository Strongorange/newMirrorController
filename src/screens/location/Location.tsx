import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as S from "../../styles/location/location.style";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/authState";
import firestore from "@react-native-firebase/firestore";
import {
  defaultFirestoreSettings,
  FirestoreSettings,
} from "../../types/firestoreSettings";

const Location = () => {
  const user = useRecoilValue(userState);
  const [settings, setSettings] = useState(defaultFirestoreSettings);

  // FUNCTIONS

  // Firestore Settings 존재 확인 후 없으면 생성
  const checkSettings = async () => {
    let settingsSubscriber: any;

    if (user) {
      const documentRef = firestore().collection(user.uid).doc("settings");
      const document = await documentRef.get();

      if (!document.exists) {
        await documentRef.set(defaultFirestoreSettings);
      }

      settingsSubscriber = documentRef.onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const settingsData = documentSnapshot.data();
          setSettings(settingsData as FirestoreSettings);
        }
      });

      return () => settingsSubscriber();
    } else {
      console.log("User is not logged in");
    }
  };

  // EFFECTS
  useEffect(() => {
    let subscriber: any;

    const fetchSettings = async () => {
      subscriber = await checkSettings();
    };

    fetchSettings();

    return () => {
      if (subscriber) {
        console.log("Unsubscribing from settings");
        subscriber();
      }
    };
  }, []);

  // 디버깅

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return (
    <S.LocationLayout>
      <Text>Location</Text>
    </S.LocationLayout>
  );
};

export default Location;
