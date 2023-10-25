import './App.css';

const App = () => {

  console.log(process.env.REACT_APP_API_KEY)

  return (
    <div className="App">
      <header className="App-header">
        Welcome to Health Declaration App
      </header>
    </div>
  );
}

export default App;
