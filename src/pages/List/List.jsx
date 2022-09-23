import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/style.css";
import { useNavigate } from "react-router-dom";

function List() {
  // state
  const [task, setTask] = useState();
  const [refetchData, setRefetchData] = useState(true);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  // control get
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fake-api-coba.herokuapp.com/todos"
      );
      setTask(response.data);
      setRefetchData(false);
    } catch (error) {
      alert(error, "Data Tidak Terambil");
    }
  };

  // =======================darkmode================
  const dark = (isDark) => {
    if (isDark) {
      document.body.setAttribute("id", "darkmode");
      document.getElementById("light").style.visibility = "hidden";
      document.getElementById("dark").style.visibility = "visible";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("id", "");
      document.getElementById("light").style.visibility = "visible";
      document.getElementById("dark").style.visibility = "hidden";
      localStorage.removeItem("theme");
    }
  };

  // controll Done
  const handleDone = () => {
    axios
      .get("https://fake-api-coba.herokuapp.com/todos/?complete=true")
      .then((response) => {
        setTask(response.data);
        setRefetchData(false);
      });
  };

  // control todo
  const handleTodo = () => {
    axios
      .get("https://fake-api-coba.herokuapp.com/todos/?complete=false")
      .then((response) => {
        setTask(response.data);
        setRefetchData(false);
      });
  };

  // control searching
  const handleSearch = () => {
    axios
      .get(`https://fake-api-coba.herokuapp.com/todos/?task=${search}`)
      .then((response) => {
        setTask(response.data);
      });
  };

  // ========handleDelete==================
  const handleDelete = (id) => {
    axios
      .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
      .then((res) => {
        console.log(res);
        setRefetchData(true);
      });
  };

  // ==============
  useEffect(() => {
    if (refetchData) fetchData();
  }, [refetchData]);
  // ============================

  return (
    <div className="gradient-custom susu">
      <div className="container-fluid">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div id="document" className="card brodi">
                <div className="text-center mt-4">
                  <div className="d-flex justify-content-end mx-5 ms-auto">
                    <i
                      className="fa fa-sun-o fa-2x"
                      id="dark"
                      onClick={() => dark(false)}
                    ></i>
                    <i
                      className="fa fa-moon-o fa-2x"
                      id="light"
                      onClick={() => dark(true)}
                    ></i>
                  </div>
                  <h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-journals"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                      <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
                    </svg>
                    Todo-Do-List
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-journals"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                      <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
                    </svg>
                  </h1>
                </div>
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        type="text"
                        id="form2"
                        className="form-control"
                        placeholder="searching"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSearch();
                      }}
                      type="submit"
                      className="btn btn-info ms-2"
                    >
                      Search
                    </button>
                  </form>
                  <div className="d-flex justify-content-end">
                    <div className="col">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/create");
                        }}
                      >
                        <i className="fa fa-plus fa-2x text-success glow"></i>
                      </div>
                    </div>
                    <ul className="nav nav-tabs mb-4 pb-2">
                      <li className="nav-item bear">
                        <div
                          className="nav-link"
                          onClick={() => {
                            fetchData();
                          }}
                        >
                          All
                        </div>
                      </li>
                      <li className="nav-item bear">
                        <div
                          className="nav-link"
                          onClick={() => {
                            handleTodo();
                          }}
                        >
                          Todo
                        </div>
                      </li>
                      <li className="nav-item bear">
                        <div
                          className="nav-link"
                          onClick={() => {
                            handleDone();
                          }}
                        >
                          Completed
                        </div>
                      </li>
                    </ul>
                  </div>
                  <table className="table table-bordered table-hover text-center">
                    <thead className="table-dark">
                      <tr>
                        <th></th>
                        <th>To Do List</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task &&
                        task.map((item) => {
                          return (
                            <>
                              <tr>
                                <td className="d-flex justify-content-center">
                                  <div className="form-check">
                                    <input
                                      checked={item.complete}
                                      onChange={() => {
                                        axios
                                          .patch(
                                            `https://fake-api-coba.herokuapp.com/todos/${item.id}`,
                                            {
                                              complete: !item.complete,
                                            }
                                          )
                                          .then(() => {
                                            setRefetchData(true);
                                          });
                                      }}
                                      type="checkbox"
                                      className="form-check-input text-success"
                                    />
                                  </div>
                                </td>
                                <td>
                                  {!item.complete ? (
                                    <div>{item.task}</div>
                                  ) : (
                                    <strike>{item.task}</strike>
                                  )}
                                </td>
                                <td>
                                  {!item.complete ? (
                                    <div className="text-danger">
                                      In Progress
                                    </div>
                                  ) : (
                                    <div className="text-success">Done</div>
                                  )}
                                </td>
                                <td>
                                  <i
                                    onClick={() => {
                                      navigate(`/update/${item.id}`);
                                    }}
                                    className="fa fa-pencil fa-2x text-warning mx-3"
                                  ></i>
                                  <i
                                    onClick={() => handleDelete(item.id)}
                                    className="fa fa-trash-o fa-2x text-danger"
                                  ></i>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      {/* https://fake-api-coba.herokuapp.com/todos/ */}
                    </tbody>
                  </table>
                  <div className="row g-0">
                    <div className="d-flex justify-content-center py-2 mt-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          Promise.all(
                            task
                              .filter((e) => e.complete)
                              .map(async ({ id }) => {
                                await fetch(
                                  `https://fake-api-coba.herokuapp.com/todos/${id}`,
                                  {
                                    method: "DELETE",
                                  }
                                )
                                  .then(async (response) => {
                                    return response;
                                  })
                                  .then((data) => {
                                    return data.status;
                                  });
                              })
                          ).then((response) => {
                            setRefetchData(true);
                            task();
                          });
                        }}
                      >
                        Delete Done Task
                      </button>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        onClick={() => {
                          Promise.all(
                            task.map(async ({ id }) => {
                              await fetch(
                                `https://fake-api-coba.herokuapp.com/todos/${id}`,
                                {
                                  method: "DELETE",
                                }
                              )
                                .then(async (res) => {
                                  return res;
                                })
                                .then((data) => {
                                  return data.status;
                                });
                            })
                          ).then((response) => {
                            setRefetchData(true);
                          });
                        }}
                        className="btn btn-danger"
                      >
                        Delete All Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
