import React from "react";
import {Redirect, Route, Switch} from 'react-router';
import MainLayout from "../layouts/main/Main.layout";

const MyRouter: React.FC<any> = props => {
  return (
      <Switch>
        <Route path="/">
          <MainLayout/>
        </Route>
        <Route path="">
          <Redirect to={'/'} exact/>
        </Route>
      </Switch>
  )
}
export default MyRouter;