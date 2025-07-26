import tocData from "@/data/toc-data.json";

const getItemMediaFiles = (id: string, type: string) => {
  // check if type is lesson, chapter
  if (type === "lesson") {
    return tocData.toc.sound_and_script.find((item) => {
      return item.id === id;
    });
  }

  if (type === "chapter") {
    const unit = tocData.toc.units.find((item) => {
      return item.id === id;
    });
    return unit?.chapters.find((item) => {
      return item.id === id;
    });
  }
};

const getUnitMediaFiles = (id: string) => {
  return tocData.toc.units.find((item) => {
    return item.id === id;
  });
};

export { getItemMediaFiles, getUnitMediaFiles };
