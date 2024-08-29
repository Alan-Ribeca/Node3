/* eslint-disable react/prop-types */
import React, { useState } from "react";

const CRMContext = React.createContext([{}, () => {}]);

const CRMProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
    auth: false,
  });

  return (
    <CRMContext.Provider value={[auth, setAuth]}>
      {children}
    </CRMContext.Provider>
  );
};

export { CRMContext, CRMProvider };
