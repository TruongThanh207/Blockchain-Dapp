import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useMemo, useState } from "react";
import ReactNotification from "react-notifications-component";
import { Route, Switch, useRouteMatch } from "react-router";
import Header from "../../components/Header/Header";
import AppContext from "../../context/AppContext";
import Login from "../../pages/Login/Login";
import MyWallet from "../../pages/MyWallet/MyWallet";
import Transaction from "../../pages/Transaction/Transaction";
import Verify from "../../pages/Verify/Verify";
import PrivateRoute from "../../router/PrivateRoute";

const MainLayout: React.FC<any> = props => {
  const match = useRouteMatch<{ id: string }>();
  const url = useMemo(() => match.url === '/' ? '' : match.url, [match.url]);

  const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);


  return (
    <AppContext.Provider value={{ isAuthorized, setIsAuthorized, loading, setLoading }}>
      <ReactNotification />
      <Layout className={'container bg-transparent'}>
        <Header />
        <Content className={'bg-white'}>
          <Switch>
            <PrivateRoute exact path={`${match.url}`} component={MyWallet} />
            <Route path={`${url}/login`} component={Login}>
            </Route>
            <PrivateRoute path={`${url}/transaction`} component={Transaction}>
            </PrivateRoute>
            <PrivateRoute path={`${url}/verify`} component={Verify}>
            </PrivateRoute>
          </Switch>
        </Content>
        {/*<Footer/>*/}
      </Layout>
    </AppContext.Provider>
  )
}
export default MainLayout;