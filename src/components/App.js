import React from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import styled from "styled-components";

import Header from "./Header";
import LambdaHeader from "./LambdaHeader";
import View from "./View";
import Login from "./Login";
import Logout from "./Logout";

const App = () => {
  return (
    <AppContainer>
      <LambdaHeader />
      <Header />
      <RouteContainer>
        <PrivateRoute exact path="/view">
          <View />
        </PrivateRoute>
        <PrivateRoute exact path="/logout">
          <Logout />
        </PrivateRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </RouteContainer>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  height: 100%;
`;
const RouteContainer = styled.div`
  display: flex;
  height: 85%;
  align-items: center;
  flex-direction: column;
`;
