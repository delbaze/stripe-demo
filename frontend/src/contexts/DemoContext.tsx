import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface IDemoContext {
    updateState: (value: string) => void;
    stateValue: string[];
    stateValueWithFilter: (value: string) => string[];
}
// export const DemoContext = createContext<IDemoContext>({
//   state: [],
//   setState: () => {},
// });
export const DemoContext = createContext({} as IDemoContext);

function DemoContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<string[]>(["a", "b", "c", "d", "e", "f"]);

  const methods = {
    updateState: (value: string) => {
      setState((s) => [...state, value]);
    },
    stateValue: state,
    stateValueWithFilter: (value: string) => {
        return state.filter((e) => e !== value)
    }
  };

  return (
    <DemoContext.Provider value={methods}>
      {children}
    </DemoContext.Provider>
  );
}

export default DemoContextProvider;
