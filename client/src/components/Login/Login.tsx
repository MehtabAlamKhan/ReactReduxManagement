import "./style.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useLoginMutation } from "../../store/features/api/usersApi";
import {
  clearUserState,
  loginUser,
} from "../../store/features/slices/userSlice";
import { logError } from "../../store/features/slices/errorSlice";

type userState = {
  username: string;
  password: string;
};

function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<userState>({
    username: "",
    password: "",
  });
  const [fetchLogin] = useLoginMutation();

  const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async () => {
    if (!form.password && !form.username) return;
    await fetchLogin(form)
      .unwrap()
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        const responseUser = {
          token: res.token,
          user: {
            username: res.user.username,
            password: res.user.password,
            id: res.user._id,
            email: res.user.email,
          },
        };

        dispatch(loginUser(responseUser));
      })
      .catch((err) => {
        dispatch(clearUserState());
        dispatch(logError({ msg: err.data.msg, status: err.status }));
      });
  };

  return (
    <div className="login-container">
      <div className="login-text-cont">LOGIN</div>
      <div className="username-cont">
        <label>Username</label>
        <input
          onChange={formHandler}
          name="username"
          className="username-input"
          type="text"
        ></input>
      </div>
      <div className="pass-cont">
        <label>Password</label>
        <input
          name="password"
          className="password-input"
          type="text"
          onChange={formHandler}
        ></input>
      </div>
      <div className="remember-me-cont">Remember Me</div>
      <div className="button-cont">
        <Link to="/">
          <button onClick={submitHandler} className="login-button">
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
