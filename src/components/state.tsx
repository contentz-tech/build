import { createContext, useContext } from "react";
import { jsx } from "@emotion/core";
import { IState } from "../state";

const StateContext = createContext<IState | null>(null);

interface StateProviderProps {
  state: IState;
  children: JSX.Element[] | JSX.Element;
}

function StateProvider({ state, children }: StateProviderProps) {
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
}

function useState(): IState {
  const state = useContext(StateContext);
  if (state === null)
    throw new Error(
      "Wrap your component in `StateProvider` and pass a valid state."
    );
  return state;
}

export { StateProvider, useState };
