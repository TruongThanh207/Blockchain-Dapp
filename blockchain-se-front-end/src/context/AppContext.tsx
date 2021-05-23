import React from "react";
import {IAppContext} from "./IAppContext";

const initialState: IAppContext = {
  isAuthorized: !!localStorage.getItem('token'),
  loading: false,
}

const AppContext = React.createContext(initialState);
export default AppContext;


