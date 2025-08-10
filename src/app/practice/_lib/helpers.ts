const courseImageBasePath = "/media/mondly/images/";
const courseAudioBasePath = "/media/mondly/audios/";

export const getCourseImage = (id: string | number) => {
  return courseImageBasePath + id;
};

export const getCourseAudio = (
  id: string | number,
  audio_updated_at: string | number
) => {
  return `${courseAudioBasePath}${id}?t=/${audio_updated_at}`;
};
