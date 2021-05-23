import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const { component: Component, ...rest } = props;
  const isAuthorized = localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={(routeProps: RouteProps) =>
        isAuthorized ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;