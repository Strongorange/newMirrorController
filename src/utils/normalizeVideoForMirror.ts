import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as VideoThumbnails from "expo-video-thumbnails";

const TARGET_POSTER_MAX_DIMENSION = 640;
const TARGET_POSTER_COMPRESS = 0.8;
const POSTER_CAPTURE_TIME_MS = 1000;

export const normalizeVideoForMirror = async (video: ImagePicker.ImageInfo) => {
  return {
    // iOS에서는 picker preset이 H.264/AAC MP4로 내보내고,
    // Android에서는 현재 선택된 로컬 비디오를 그대로 업로드한다.
    uri: video.uri,
  };
};

export const generateVideoPosterForMirror = async (videoUri: string) => {
  const thumbnail = await VideoThumbnails.getThumbnailAsync(videoUri, {
    time: POSTER_CAPTURE_TIME_MS,
  });
  const resizeAction =
    Math.max(thumbnail.width, thumbnail.height) > TARGET_POSTER_MAX_DIMENSION
      ? [
          {
            resize:
              thumbnail.width >= thumbnail.height
                ? { width: TARGET_POSTER_MAX_DIMENSION }
                : { height: TARGET_POSTER_MAX_DIMENSION },
          },
        ]
      : [];

  return manipulateAsync(thumbnail.uri, resizeAction, {
    compress: TARGET_POSTER_COMPRESS,
    format: SaveFormat.JPEG,
  });
};
