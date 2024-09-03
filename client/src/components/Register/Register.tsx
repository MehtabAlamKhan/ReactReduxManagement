import "../Login/style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../store/features/api/usersApi";
import { useDispatch } from "react-redux";
import {
  loginUser,
  clearUserState,
} from "../../store/features/slices/userSlice";
import { logError } from "../../store/features/slices/errorSlice";

type userRegisterState = {
  username: string;
  password: string;
  email: string;
};

function Register() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<userRegisterState>({
    username: "",
    password: "",
    email: "",
  });

  const [fetchRegister] = useRegisterMutation();

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async () => {
    if (!form.email || !form.password || !form.username) return;
    await fetchRegister(form)
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
        console.log(err);
        dispatch(clearUserState());
        dispatch(logError({ message: err.data.message, status: err.status }));
      });
  };
  return (
    <div className="login-container">
      <div className="login-text-cont">REGISTER</div>
      <div className="username-cont">
        <label>Username</label>
        <input
          onChange={formHandler}
          name="username"
          className="username-input"
          type="text"
        ></input>
      </div>
      <div className="username-cont">
        <label>Email</label>
        <input
          name="email"
          className="username-input"
          type="email"
          onChange={formHandler}
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
            REGISTER
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
