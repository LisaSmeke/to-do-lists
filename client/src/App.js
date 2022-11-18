import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  // To add title:
  const [title, setTitle] = useState('');
  // To update title:
  const [newTitle, setNewTitle] = useState('');
  // const [todo, setTodo] = useState('');

  const [myLists, setMyLists] = useState([]);
  // const [myTodos, setMyTodos] = useState([]);

  const createList = () => {
    console.log(title);
    Axios.post('http://localhost:3001/create', { title: title }).then(() => {
      setMyLists([...myLists, { title: title }]);
    });
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

  const deleteList = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setMyLists(
        myLists.filter((val) => {
          return val.id != id;
        }),
      );
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
      <div className="main">
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
                <div className="listTitle">
                  <h2>{val.title}</h2>
                </div>
                <div className="deleteList">
                  <button
                    onClick={() => {
                      deleteList(val.id);
                    }}
                  >
                    Delete list
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
