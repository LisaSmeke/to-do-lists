import './App.css';
import { useState } from 'react';

function App() {
  const [list, setList] = useState('');
  const [todo, setTodo] = useState('');

  const displayInfo = () => {
    console.log(list + todo);
  };

  return (
    <div className="App">
      <div className="signIn">
        <label>Username:</label>
        <input type="text" />
        <label>Password:</label>
        <input type="password" />
        <button>Sign in</button>
      </div>
      <div className="createList">
        <h2>My To-do Lists</h2>
        <label>Title:</label>
        <input
          type="text"
          onChange={(event) => {
            setList(event.target.value);
          }}
        />
        <label>to-do:</label>
        <input
          type="text"
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <button onClick={displayInfo}>Create list</button>
      </div>
    </div>
  );
}

export default App;
