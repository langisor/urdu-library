import { hookstate, useHookstate } from "@hookstate/core";
import { Part, Unit, Chapter, Lesson, Appendix } from "./ts-definition";

// Define the shape of our navigation state
interface NavigationState {
  selectedView: "preliminary" | "parts" | "units" | "appendices" | "home";
  selectedPart: Part | null;
  selectedUnit: Unit | null;
  selectedChapter: Chapter | null;
  selectedLesson: Lesson | null;
  selectedAppendix: Appendix | null;
}

// Initial state for navigation
const initialNavigationState: NavigationState = {
  selectedView: "home",
  selectedPart: null,
  selectedUnit: null,
  selectedChapter: null,
  selectedLesson: null,
  selectedAppendix: null,
};

// Create the Hookstate store
const navigationStore = hookstate<NavigationState>(initialNavigationState);

// Export a custom hook to use this store
function useNavigationState() {
  // Changed to function for direct use in this file
  return useHookstate(navigationStore);
}

export default useNavigationState;
