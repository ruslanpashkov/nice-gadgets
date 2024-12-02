import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { ErrorContext } from './ErrorContext';

interface Props {
  children: ReactNode;
}

export const ErrorContextProvider: FC<Props> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      error,
      setError,
      clearError,
    }),
    [error, clearError],
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
