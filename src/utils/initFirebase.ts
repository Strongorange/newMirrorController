// Your web app's Firebase configuration
import {
  FB_API_KEY,
  FB_APP_ID,
  FB_AUTH_DOMAIN,
  FB_MESSAGING_SENDER_ID,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
} from "@env";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
};

const initFB = () => {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
};

export default initFB;
