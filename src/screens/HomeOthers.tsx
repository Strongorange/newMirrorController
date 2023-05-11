import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import * as SplashScreen from "expo-splash-screen";
import * as S from "../styles/home.style";
import CurrentPhotos from "../components/home/CurrentPhotos";
import { useRecoilState, useRecoilValue } from "recoil";
import { showingPhotosState } from "../states/showingPhotosState";
import FireStorePhotos from "../components/home/FireStorePhotos";
import { StoragePhoto, storagePhotosState } from "../states/storagePhotosState";
import FireStorePhotoControls from "../components/home/FireStorePhotoControls";
import initFB from "../utils/initFirebase";
import { userState } from "../states/authState";

// Your web app's Firebase configuration
initFB();
const storage = getStorage();

const HomeOthers = () => {
  // States
  const user = useRecoilValue(userState);
  const [showingPhotosAtom, setShowingPhotosAtom] =
    useRecoilState(showingPhotosState);
  const [storagePhotosAtom, setStoragePhotosAtom] =
    useRecoilState(storagePhotosState);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const listRef = ref(storage, `/${user?.uid}/`);

  function onResultPhoto(QuerySnapshot: any) {
    setShowingPhotosAtom(QuerySnapshot.data().photos);
  }

  function onError(error: any) {
    console.error(error);
  }

  // TODO: Firestore에 저장된 현재 Display되는 사진 가져와 ShowingPhotosAtom에 저장

  useEffect(() => {
    if (user) {
      try {
        const collectionRef = firestore().collection(`${user.uid}`);
        const galleryUnsubscribe = collectionRef
          .doc("gallery")
          .onSnapshot((documentSnapshot) => {
            const showingPhotos = documentSnapshot.data()?.photos;
            if (showingPhotos) {
              setShowingPhotosAtom(showingPhotos);
            }
          });

        return () => {
          galleryUnsubscribe();
        };
      } catch (error) {
        console.log(error);
      } finally {
        setIsInitialLoading(false);
      }
    } else {
      console.log("User is not logged in");
    }
  }, []);

  //   useEffect(() => {
  //     const getStoragePhotos = async () => {
  //       const storageRes = await listAll(listRef);
  //       const storagePhotos: StoragePhoto[] = [];

  //       for (const itemRef of storageRes.items) {
  //         const reference: any = ref(storage, itemRef.fullPath);
  //         const downloadUrl = await getDownloadURL(reference);
  //         const newImage = {
  //           uri: downloadUrl,
  //           path: reference._location.path,
  //           id: reference._location.path,
  //         };
  //         storagePhotos.push(newImage);
  //       }

  //       setStoragePhotosAtom(storagePhotos);
  //     };
  //     try {
  //       setIsInitialLoading(true);
  //       firestore()
  //         .collection("mirror")
  //         .doc("gallery")
  //         .onSnapshot(onResultPhoto, onError);

  //       getStoragePhotos();
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsInitialLoading(false);
  //     }
  //   }, []);

  // 디버깅
  //   useEffect(() => {
  //     console.log(user);
  //   }, [user]);

  useEffect(() => {
    console.log(showingPhotosAtom);
  }, [showingPhotosAtom]);

  return isInitialLoading ? (
    <S.HomeLayout>
      <S.Text>노루를 데려오는 중</S.Text>
    </S.HomeLayout>
  ) : (
    <S.HomeLayout>
      <S.Text>Others!</S.Text>
      {/* <CurrentPhotos />
      <FireStorePhotoControls />
      <FireStorePhotos /> */}
    </S.HomeLayout>
  );
};

export default HomeOthers;
