import { useCallback, useMemo, useReducer } from "react";

export type LoadingValue<E, V> = {
  error?: E;
  loading: boolean;
  reset: () => void;
  setError: (error: E) => void;
  setValue: (value?: V) => void;
  value?: V;
};

type ReducerState<E, V> = {
  error?: E;
  loading: boolean;
  value?: V;
};

type ErrorAction<E> = { type: "error"; error: E };
type ResetAction<R> = { type: "reset"; defaultValue?: R };
type ValueAction<V> = { type: "value"; value: V };
type ReducerAction<E, V> =
  | ErrorAction<E>
  | ResetAction<V>
  | ValueAction<V | undefined>;

const defaultState = <T>(defaultValue?: T) => {
  return {
    loading: defaultValue === undefined || defaultValue === null,
    value: defaultValue,
  };
};

const reducer =
  <E, V>() =>
  (
    state: ReducerState<E, V>,
    action: ReducerAction<E, V>,
  ): ReducerState<E, V> => {
    switch (action.type) {
      case "error":
        return {
          ...state,
          error: action.error,
          loading: false,
          value: undefined,
        };
      case "reset":
        return defaultState(action.defaultValue as V);
      case "value":
        return {
          ...state,
          error: undefined,
          loading: false,
          value: action.value,
        };
      default:
        return state;
    }
  };

const useLoadingValues = <E, V>(
  getDefaultValue?: () => V,
): LoadingValue<E, V> => {
  const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
  const [state, dispatch] = useReducer(
    reducer<E, V>(),
    defaultState(defaultValue),
  );

  const reset = useCallback(() => {
    const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    dispatch({ type: "reset", defaultValue });
  }, [getDefaultValue]);

  const setError = useCallback((error: E) => {
    dispatch({ type: "error", error });
  }, []);

  const setValue = useCallback((value?: V) => {
    dispatch({ type: "value", value });
  }, []);

  return useMemo(
    () => ({
      error: state.error,
      loading: state.loading,
      reset,
      setError,
      setValue,
      value: state.value,
    }),
    [state.error, state.loading, reset, setError, setValue, state.value],
  );
};

export default useLoadingValues;
