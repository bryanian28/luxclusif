import React, { useState } from "react";

import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Login.module.css";

const Login = (props) => {
  const [emailState, dispatchEmail] = useState();
  const [passwordState, dispatchPassword] = useState();

  const submitHandler = (event) => {
    event.preventDefault();

    if (emailState === "admin" && passwordState === "admin") {
      props.history.push("/home");
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="username"
          label="Username"
          type="username"
          value={emailState}
          onChange={(event) => dispatchEmail(event.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={passwordState}
          onChange={(event) => dispatchPassword(event.target.value)}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
