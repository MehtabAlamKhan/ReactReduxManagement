import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Home() {
  const state = useSelector((state: RootState) => state.user);
  return (
    <>
      <h1>Home</h1>
      <h3>{state.user?.username}</h3>
    </>
  );
}

export default Home;
