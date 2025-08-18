//  Global helpers
const courseImageBasePath = "/media/mondly/images/";
const courseAudioBasePath = "/media/mondly/audios/";

export const getCourseImage = (id: string | number) => {
  return courseImageBasePath + id;
};

export const getCourseAudio = (
  id: string | number,
  audio_updated_at: string | number
) => {
  return `${courseAudioBasePath}${id}`;
};
export const getAudioUrl = (
  id: string | number,
  audio_updated_at: string | number
) => {
  return `https://d13tz37rv54ob.cloudfront.net/ur/${id}?t=${audio_updated_at}`;
};
//  Vocabulary helpers


/**
 * Defines the shape of the data for each value in the mapped object.
 * This structure is based on the user's provided schema.
 */
