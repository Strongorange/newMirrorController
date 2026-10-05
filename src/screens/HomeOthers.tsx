import React, { useState, useEffect, useCallback } from "react";
import * as S from "../styles/home.style";
import CurrentPhotos from "../components/home/CurrentPhotos";
import { useRecoilState } from "recoil";
import { showingPhotosState } from "../states/showingPhotosState";
import FireStorePhotos from "../components/home/FireStorePhotos";
import { storagePhotosState } from "../states/storagePhotosState";
import FireStorePhotoControls from "../components/home/FireStorePhotoControls";
import initFB from "../utils/initFirebase";
import { userState } from "../states/authState";
import { useNavigation } from "@react-navigation/native";
import {
  createEmptyGallerySlots,
  createMirrorGalleryDoc,
  sanitizeMirrorGallerySlots,
} from "../types/mediaTypes";
import {
  listMirrorLibraryItems,
  MIRROR_GALLERY_COLLECTION,
  MIRROR_GALLERY_DOC_ID,
  observeMirrorGalleryDoc,
  saveMirrorGalleryDoc,
} from "../utils/mirrorMedia";

initFB();

const HomeOthers = () => {
  // Navigation
  const navigation = useNavigation();

  // States
  const [user] = useRecoilState(userState);
  const [, setShowingPhotosAtom] = useRecoilState(showingPhotosState);
  const [storagePhotosAtom, setStoragePhotosAtom] =
    useRecoilState(storagePhotosState);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const initializeMirrorGallery = useCallback(async () => {
    try {
      await saveMirrorGalleryDoc(createMirrorGalleryDoc());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const getStoragePhotos = async () => {
        try {
          const storagePhotos = await listMirrorLibraryItems();
          setStoragePhotosAtom(storagePhotos);
        } catch (error) {
          console.log(error);
        } finally {
          setIsInitialLoading(false);
        }
      };

      setIsInitialLoading(true);

      const galleryUnsubscribe = observeMirrorGalleryDoc(
        async (documentSnapshot) => {
          const nextSlots = sanitizeMirrorGallerySlots(
            documentSnapshot.data()?.slots
          );
          const needsReset =
            !documentSnapshot.exists() ||
            documentSnapshot.data()?.schemaVersion !== 2;

          if (needsReset) {
            await initializeMirrorGallery();
          }

          setShowingPhotosAtom(
            needsReset ? createEmptyGallerySlots() : nextSlots
          );
        },
        (error) => console.log(error)
      );

      getStoragePhotos();

      return () => {
        galleryUnsubscribe();
      };
    } else {
      setShowingPhotosAtom(createEmptyGallerySlots());
      setStoragePhotosAtom([]);
      setIsInitialLoading(false);
    }
  }, [initializeMirrorGallery, setShowingPhotosAtom, setStoragePhotosAtom, user]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "미러의 사진",
    });
  }, []);

  // 디버깅
  //   useEffect(() => {
  //     console.log(user);
  //   }, [user]);

  //   useEffect(() => {
  //     console.log(showingPhotosAtom);
  //   }, [showingPhotosAtom]);

  useEffect(() => {
    console.log(storagePhotosAtom);
  }, [storagePhotosAtom]);

  return isInitialLoading ? (
    <S.HomeLayout>
      <S.Text>사진을 불러오는 중</S.Text>
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
