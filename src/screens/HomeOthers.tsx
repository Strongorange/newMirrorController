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
import { defaultMessages } from "../types/messagesTypes";

initFB();
const storage = getStorage();

const HomeOthers = () => {
  // States
  const [user, setUser] = useRecoilState(userState);
  const [showingPhotosAtom, setShowingPhotosAtom] =
    useRecoilState(showingPhotosState);
  const [storagePhotosAtom, setStoragePhotosAtom] =
    useRecoilState(storagePhotosState);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Functions
  // Functions

  const initializeFirestore = async (uid: string) => {
    const collectionRef = firestore().collection(`${uid}`);

    const createGalleryDocPromise = await collectionRef.doc("gallery").set({
      photos: [],
    });
    const createMessageDocPromise = await collectionRef
      .doc("messages")
      .set(defaultMessages);
    try {
      await Promise.all([createGalleryDocPromise, createMessageDocPromise]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect의 user", user?.email);
    if (user) {
      const getStoragePhotos = async () => {
        try {
          const listRef = ref(storage, `/${user?.uid}/`);
          const storageResponse = await listAll(listRef);
          const storagePhotos: StoragePhoto[] = [];

          for (const itemRef of storageResponse.items) {
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
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => {
            setIsInitialLoading(false);
          }, 1000);
        }
      };

      setIsInitialLoading(true);

      // fireStore에서 Gallery 정보 가져오기
      const collectionRef = firestore().collection(`${user!.uid}`);
      const galleryUnsubscribe = collectionRef.doc("gallery").onSnapshot(
        async (documentSnapshot) => {
          if (!documentSnapshot.exists) {
            console.log("No such document!", user!.uid);
            await initializeFirestore(user.uid);
          }
          const showingPhotos = documentSnapshot.data()?.photos;
          if (showingPhotos) {
            setShowingPhotosAtom(showingPhotos);
          }
        },
        (error) => console.log(error)
      );

      // storage에서 사진 가져오기
      getStoragePhotos();
      setIsInitialLoading(false);

      return () => {
        galleryUnsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    return () => {
      console.log("HomeOthers 초기화");
      setUser(null);
      setShowingPhotosAtom([]);
      setStoragePhotosAtom([]);
    };
  }, []);

  // 디버깅
  //   useEffect(() => {
  //     console.log(user);
  //   }, [user]);

  //   useEffect(() => {
  //     console.log(showingPhotosAtom);
  //   }, [showingPhotosAtom]);

  //   useEffect(() => {
  //     console.log(storagePhotosAtom);
  //   }, [storagePhotosAtom]);

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

export default HomeOthers;
