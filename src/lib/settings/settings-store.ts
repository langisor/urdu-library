import { hookstate, useHookstate } from "@hookstate/core";

type TargetLanguageFont = "nastaliq" | "cursive" | "naskh";
const defaultSettings = {
  targetLanguageFont: "nastaliq" as TargetLanguageFont,
};

const settingsState = hookstate(defaultSettings);

export const setTargetLanguageFont = (font: TargetLanguageFont) => {
  settingsState.set({
    targetLanguageFont: font,
  });
};

export const useSettings = () => {
  return useHookstate(settingsState);
};
