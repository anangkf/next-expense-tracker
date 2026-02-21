import { CategoryRequest } from "@/features/categories/types";
import { TemplateRequest } from "@/features/templates/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { SummaryItem } from "../types/summary";

interface OnboardingState {
  currency: string;
  categories: CategoryRequest[];
  templates: TemplateRequest[];
  summary: SummaryItem[];
}

const initialState: OnboardingState = {
  currency: "",
  categories: [],
  templates: [],
  summary: [
    {
      id: "categories",
      name: "Categories",
      icon: "layout-dashboard",
      items: [],
    },
    {
      id: "templates",
      name: "Templates",
      icon: "clipboard-check",
      items: [],
    },
    {
      id: "preferences",
      name: "Preferences",
      icon: "globe",
      items: [],
    },
  ],
};

type OnboardingAction =
  | { type: "SET_CURRENCY"; payload: string }
  | { type: "TOGGLE_CATEGORY"; payload: CategoryRequest }
  | { type: "TOGGLE_TEMPLATE"; payload: TemplateRequest }
  | { type: "RESET" };

const onboardingReducer = (
  state: OnboardingState,
  action: OnboardingAction,
) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
        summary: state.summary.map((item) =>
          item.id === "preferences"
            ? { ...item, items: [action.payload] }
            : item,
        ),
      };
    case "TOGGLE_CATEGORY":
      const isCategoryExist = state.categories.some(
        (c) => c.name === action.payload.name,
      );
      const newCategories = isCategoryExist
        ? state.categories.filter((c) => c.name !== action.payload.name)
        : [...state.categories, action.payload];

      return {
        ...state,
        categories: isCategoryExist
          ? state.categories.filter((c) => c.name !== action.payload.name)
          : [...state.categories, action.payload],
        summary: state.summary.map((item) =>
          item.id === "categories"
            ? { ...item, items: newCategories.map((c) => c.name) }
            : item,
        ),
      };
    case "TOGGLE_TEMPLATE":
      const isTemplateExist = state.templates.some(
        (t) => t.name === action.payload.name,
      );
      const newTemplates = isTemplateExist
        ? state.templates.filter((t) => t.name !== action.payload.name)
        : [...state.templates, action.payload];

      return {
        ...state,
        templates: isTemplateExist
          ? state.templates.filter((t) => t.name !== action.payload.name)
          : [...state.templates, action.payload],
        summary: state.summary.map((item) =>
          item.id === "templates"
            ? { ...item, items: newTemplates.map((t) => t.name) }
            : item,
        ),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const OnboardingStateContext = createContext<OnboardingState | undefined>(
  undefined,
);
const OnboardingDispatchContext = createContext<
  Dispatch<OnboardingAction> | undefined
>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingStateContext.Provider value={state}>
      <OnboardingDispatchContext.Provider value={dispatch}>
        {children}
      </OnboardingDispatchContext.Provider>
    </OnboardingStateContext.Provider>
  );
};

export const useOnboardingState = () => {
  const state = useContext(OnboardingStateContext);
  if (!state) {
    throw new Error(
      "useOnboardingState must be used within a OnboardingProvider",
    );
  }
  return state;
};

export const useOnboardingDispatch = () => {
  const dispatch = useContext(OnboardingDispatchContext);
  if (!dispatch) {
    throw new Error(
      "useOnboardingDispatch must be used within a OnboardingProvider",
    );
  }
  return dispatch;
};
