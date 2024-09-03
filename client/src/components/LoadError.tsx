import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logError, clearError } from "../store/features/slices/errorSlice";
import { loadUser } from "../store/features/slices/userSlice";
import { RootState } from "../store/store";
import { useAuthenticateTokenQuery } from "../store/features/api/usersApi";

function LoadError() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const { data, isError, error } = useAuthenticateTokenQuery(token, {
    skip: token ? false : true,
  });

  useEffect(() => {
    if (!data) return;
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
  }, [data]);

  useEffect(() => {
    if (!isError) return;
    var status, message;
    if ("data" in error) {
      const d: any = error.data ? error.data : null;
      if ("msg" in d) {
        message = d.msg;
      }
    }

    if ("status" in error) {
      status = error.status;
    }

    dispatch(logError({ message, status }));
  }, [error]);

  return (
    <div>
      {token && <h1>{token}</h1>}
      <button>Load Error</button>
      <button>Clear Error</button>
    </div>
  );
}

export default LoadError;
