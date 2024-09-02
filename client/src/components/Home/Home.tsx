import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UseDispatch } from "react-redux";
import {
  loadUser,
  clearUserState,
} from "../../store/features/slices/userSlice";
import { logError, clearError } from "../../store/features/slices/errorSlice";
import { useAuthenticateTokenQuery } from "../../store/features/api/usersApi";
import { useEffect } from "react";

function Home() {
  const state = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { data, isError, isLoading, error } = useAuthenticateTokenQuery();

  useEffect(() => {
    if (isLoading || !data) return;
    const loadedUser = {
      token: localStorage.getItem("jwt"),
      user: {
        username: data.user.username,
        password: data.user.password,
        id: data.user._id,
        email: data.user.email,
      },
    };
    dispatch(loadUser(loadedUser));
    // dispatch(clearError());
  }, [data]);

  useEffect(() => {
    if (!error) return;
    if ("data" in error && "status" in error) {
      const loadedError = {
        msg: error.data,
        status: error.status,
      };
      dispatch(logError(loadedError));
    }
  }, [error]);

  return (
    <>
      <h1>Home</h1>
      <h3>{state.user?.username}</h3>
    </>
  );
}

export default Home;
