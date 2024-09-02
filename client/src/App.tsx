import Index from "./components/index";

function App() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        alignContent: "center",
      }}
      className="App"
    >
      <Index />
    </div>
  );
}

export default App;
