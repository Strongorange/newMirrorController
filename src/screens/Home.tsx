import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import * as SplashScreen from "expo-splash-screen";
import {
  FB_API_KEY,
  FB_APP_ID,
  FB_AUTH_DOMAIN,
  FB_MESSAGING_SENDER_ID,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
} from "@env";
import * as S from "../styles/home.style";
import CurrentPhotos from "../components/home/CurrentPhotos";
import { useRecoilState } from "recoil";
import { showingPhotosState } from "../states/showingPhotosState";
import FireStorePhotos from "../components/home/FireStorePhotos";
import { StoragePhoto, storagePhotosState } from "../states/storagePhotosState";
import FireStorePhotoControls from "../components/home/FireStorePhotoControls";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
};
// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();
const listRef = ref(storage, "/");

const Home = () => {
  const [showingPhotosAtom, setShowingPhotosAtom] =
    useRecoilState(showingPhotosState);
  const [storagePhotosAtom, setStoragePhotosAtom] =
    useRecoilState(storagePhotosState);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  function onResultPhoto(QuerySnapshot: any) {
    setShowingPhotosAtom(QuerySnapshot.data().photos);
  }

  function onError(error: any) {
    console.error(error);
  }

  useEffect(() => {
    const getStoragePhotos = async () => {
      const storageRes = await listAll(listRef);
      const storagePhotos: StoragePhoto[] = [];

      for (const itemRef of storageRes.items) {
        const reference: any = ref(storage, itemRef.fullPath);
        const downloadUrl = await getDownloadURL(reference);
        const newImage = {
          uri: downloadUrl,
          path: reference._location.path,
          id: reference._location.path,
        };
        storagePhotos.push(newImage);
      }

      setStoragePhotosAtom(storagePhotos);
    };
    try {
      setIsInitialLoading(true);
      firestore()
        .collection("mirror")
        .doc("gallery")
        .onSnapshot(onResultPhoto, onError);

      getStoragePhotos();
    } catch (error) {
      console.log(error);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    if (!isInitialLoading) {
      setTimeout(hideSplash, 1500);
    }
  }, [isInitialLoading]);

  return isInitialLoading ? (
    <S.HomeLayout>
      <S.Text>노루를 데려오는 중</S.Text>
    </S.HomeLayout>
  ) : (
    <S.HomeLayout>
      <CurrentPhotos />
      <FireStorePhotoControls />
      <FireStorePhotos />
    </S.HomeLayout>
  );
};

export default Home;
