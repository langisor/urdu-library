//  Global helpers
// const courseImageBasePath =  `${process.env.NEXT_PUBLIC_BASE_URL}/media/mondly/images/` //localhost:3000
// const courseAudioBasePath = `${process.env.NEXT_PUBLIC_BASE_URL}/media/mondly/audios/` //localhost:3000

// production
const courseImageBasePath =  `${process.env.NEXT_PUBLIC_URL}/media/mondly/images/` //https://urdu-library.netlify.app/
const courseAudioBasePath = `${process.env.NEXT_PUBLIC_URL}/media/mondly/audios/` //https://urdu-library.netlify.app/


export const getCourseImage = (id: string | number) => {
  return courseImageBasePath + id;
};

export const getCourseAudio = (
  id: string | number,
   
) => {
  return `${courseAudioBasePath}${id}`;
};
export const getAudioUrl = (
  id: string | number,
  audio_updated_at: string | number
) => {
  return `https://d13tz37rv54ob.cloudfront.net/ur/${id}?t=${audio_updated_at}`;
};