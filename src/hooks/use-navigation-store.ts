import { hookstate, useHookstate } from "@hookstate/core";
import {
  Chapter,
  Lesson,
} from "../data/course-book/ts-definition";

// Define the shape of our navigation state
interface NavigationState {
  selectedView: 
  "cover"
  | "preliminary"
  | "appendices"
  | "chapters"
  | "units"
  | "lessons";

  selectedChapter: Chapter | null;
  selectedLesson: Lesson | null;
}

// Initial state for navigation
const initialNavigationState: NavigationState = {
  selectedView: "cover",
  selectedChapter: null,
  selectedLesson: null,
};

// Create the Hookstate store
const navigationStore = hookstate<NavigationState>(initialNavigationState);

// Export a custom hook to use this store
function useNavigationState() {
  // Changed to function for direct use in this file
  return useHookstate(navigationStore);
}

export default useNavigationState;
