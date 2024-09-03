import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  loadUser,
  clearUserState,
} from "../../store/features/slices/userSlice";
import { logError, clearError } from "../../store/features/slices/errorSlice";
import { useAuthenticateTokenQuery } from "../../store/features/api/usersApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("jwt");
  const state = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useAuthenticateTokenQuery(token, {
    skip: token ? false : true,
  });

  useEffect(() => {
    if (isLoading || !data) return;
    const loadedUser = {
      token: token,
      user: {
        username: data.user.username,
        password: data.user.password,
        id: data.user._id,
        email: data.user.email,
      },
    };
    dispatch(loadUser(loadedUser));
    dispatch(clearError());
  }, [data]);

  useEffect(() => {
    if (!error) return;
    const data: any = error;
    const loadedError = {
      message: data.data.message,
      status: data.status,
    };
    dispatch(clearUserState());
    dispatch(logError(loadedError));
  }, [error]);

  const logouthandler = () => {
    localStorage.removeItem("jwt");
    dispatch(clearUserState());
    dispatch(clearError());
  };

  return (
    <>
      <h1>Home</h1>
      <h3>{state.user?.username}</h3>
      {!state.user && (
        <Link to="/login">
          <button>LOGIN</button>
        </Link>
      )}
      {!state.user && (
        <Link to="/register">
          <button>REGISTER</button>
        </Link>
      )}
      {state.user && <button onClick={logouthandler}>LOGOUT</button>}
    </>
  );
}

export default Home;
