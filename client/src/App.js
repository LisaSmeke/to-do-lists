import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [myLists, setMyLists] = useState([]);
  const [todo, setTodo] = useState('');
  const [done, setDone] = useState(false);
  const [myTodos, setMyTodos] = useState([]);

  /*Lists*/
  const createList = () => {
    console.log(title);
    Axios.post('http://localhost:3001/create', { title: title }).then(() => {
      setMyLists([...myLists, { title: title }]);
    });
  };

  const getLists = () => {
    Axios.get('http://localhost:3001/lists').then((response) => {
      setMyLists(response.data);
    });
  };

  const updateListTitle = (id) => {
    Axios.put('http://localhost:3001/update', { title: newTitle, id: id }).then((response) => {
      setMyLists(
        myLists.map((val) => {
          return val.id == id ? { id: val.id, title: newTitle } : val;
        }),
      );
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

  /*To-dos*/
  const createTodo = () => {
    console.log(todo);
    Axios.post('http://localhost:3001/createtodo', { todo: todo, done: done }).then(() => {
      setMyTodos([...myTodos, { todo: todo, done: done }]);
    });
  };

  const getTodos = () => {
    Axios.get('http://localhost:3001/todos').then((response) => {
      setMyTodos(response.data);
    });
  };

  const updateTodo = (id) => {
    Axios.put('http://localhost:3001/updatetodo', { done: true, id: id }).then((response) => {
      setMyTodos(
        myTodos.map((val) => {
          return val.id == id ? { id: val.id, done: true } : val;
        }),
      );
    });
  };

  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/deletetodo/${id}`).then((response) => {
      setMyTodos(
        myTodos.filter((val) => {
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
                  <input
                    type="text"
                    placeholder="new title"
                    onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateListTitle(val.id);
                    }}
                  >
                    Update
                  </button>
                </div>

                <div className="addTodo">
                  <button onClick={getTodos}>Show todos</button>
                  {myTodos.map((val, key) => {
                    return (
                      <div>
                        {' '}
                        <p>{val.todo}</p>
                        <p>{val.done}</p>
                        {/* <button
                          onClick={() => {
                            updateTodo(val.id);
                          }}
                        >
                          Done
                        </button> */}
                        <button
                          onClick={() => {
                            deleteTodo(val.id);
                          }}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="todo"
                    onChange={(event) => {
                      setTodo(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      createTodo(val.id);
                    }}
                  >
                    Add todo
                  </button>
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
