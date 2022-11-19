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

  const updateListTitle = (list_id) => {
    Axios.put('http://localhost:3001/update', { title: newTitle, list_id: list_id }).then(
      (response) => {
        setMyLists(
          myLists.map((val) => {
            return val.list_id == list_id ? { list_id: val.list_id, title: newTitle } : val;
          }),
        );
      },
    );
  };

  const deleteList = (list_id) => {
    Axios.delete(`http://localhost:3001/delete/${list_id}`).then((response) => {
      setMyLists(
        myLists.filter((val) => {
          return val.list_id != list_id;
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

  const updateTodo = (todo_id) => {
    Axios.put('http://localhost:3001/updatetodo', { done: true, todo_id: todo_id }).then(
      (response) => {
        setMyTodos(
          myTodos.map((val) => {
            console.log('task done');
            return val.todo_id == todo_id ? { todo_id: val.todo_id, done: true } : val;
          }),
        );
      },
    );
  };

  const deleteTodo = (todo_id) => {
    Axios.delete(`http://localhost:3001/deletetodo/${todo_id}`).then((response) => {
      setMyTodos(
        myTodos.filter((val) => {
          return val.todo_id != todo_id;
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
        <label>New list:</label>
        <input
          type="text"
          placeholder="List title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        ></input>
        <button type="submit" onClick={createList}>
          Create
        </button>
        <button onClick={getLists}>Show all</button>
        <div className="myLists">
          {myLists.map((val, key) => {
            return (
              <div className="list">
                <div className="listTitle">
                  <h2>{val.title}</h2>
                  <input
                    className="newTitleInput"
                    type="text"
                    placeholder="Update list title"
                    onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}
                  />
                  <button
                    className="renameBtn"
                    onClick={() => {
                      updateListTitle(val.list_id);
                    }}
                  >
                    Rename
                  </button>
                </div>

                <div className="addTodo">
                  <button className="allTodosBtn" onClick={getTodos}>
                    All to-dos
                  </button>
                  {myTodos.map((val, key) => {
                    return (
                      <div className="todo">
                        {' '}
                        <p>{val.todo}</p>
                        {/* <p>{val.done}</p> */}
                        <div className="todoBtns">
                          <button
                            className="doneBtn"
                            onClick={() => {
                              updateTodo(val.todo_id);
                            }}
                          >
                            Done
                          </button>
                          <button
                            className="xBtn"
                            onClick={() => {
                              deleteTodo(val.todo_id);
                            }}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="New to-do"
                    onChange={(event) => {
                      setTodo(event.target.value);
                    }}
                  />
                  <button
                    className="addBtn"
                    onClick={() => {
                      createTodo(val.id);
                    }}
                  >
                    Add
                  </button>
                </div>

                <div className="deleteList">
                  <button
                    className="deleteBtn"
                    onClick={() => {
                      deleteList(val.list_id);
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
