import React, {createContext, useContext, useState} from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  updateLoginState: (status: boolean) => void;
};

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  updateLoginState: function (status: boolean) {
    console.log(status);
  },
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({children}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginState = (status: boolean) => {
    setIsLoggedIn(status);
  };
  return (
    <AppContext.Provider
      value={{isLoggedIn: isLoggedIn, updateLoginState: updateLoginState}}>
      {children}
    </AppContext.Provider>
  );
};
