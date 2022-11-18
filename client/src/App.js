import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');

  const [myLists, setMyLists] = useState([]);
  const [myTodos, setMyTodos] = useState([]);

  const createList = () => {
    console.log(title);
    Axios.post('http://localhost:3001/create', { title: title }).then(() =>
      console.log('Success: New list created'),
    );
  };

  // const createTodo = () => {
  //   Axios.post('http://localhost:3001/todo', { todo: todo }).then(() =>
  //     console.log('Success: New todo added'),
  //   );
  // };

  // const getTodos = () => {
  //   Axios.get('http://localhost:3001/todos').then((response) => {
  //     setMyTodos(response.data);
  //   });
  // };

  const getLists = () => {
    Axios.get('http://localhost:3001/lists').then((response) => {
      setMyLists(response.data);
    });
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
            setTitle(event.target.value);
          }}
        />
        <button onClick={createList}>Create list</button>
        <button onClick={getLists}>Show lists</button>
        <div className="myLists">
          {myLists.map((val, key) => {
            return (
              <div className="list">
                <h2 className="listTitle">{val.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
