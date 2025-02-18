import Button from "./Button";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="App">
      <h1>React Button Test</h1>
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}

export default App;