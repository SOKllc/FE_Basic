import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import AsyncComponent from "../../hoc/AsyncComponent/AsyncComponent";

const AsyncHome = AsyncComponent(() => import("./Home/Home"));
const AsyncPreferance = AsyncComponent(() => import("./Preferance/Preferance"));

const routes = (props) => {
  return (
    <Aux>
      <Switch>
        <Route path="/" exact component={AsyncHome} />
        <Route path="/Preferance" component={AsyncPreferance} />
      </Switch>
    </Aux>
  );
};

export default routes;
