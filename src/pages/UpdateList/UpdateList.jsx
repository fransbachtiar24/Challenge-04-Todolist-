import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";

function UpdateList() {
  const [task, setTask] = useState();
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  // control ambil data
  useEffect(() => {
    if (params.id) {
      axios
        .get(`https://fake-api-coba.herokuapp.com/todos/${params.id}`)
        .then((res) => {
          setTask(res.data.task);
        });
    }
  }, [params.id]);

  // handleUpdate
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`https://fake-api-coba.herokuapp.com/todos/${params.id}`, {
        task: task,
      })
      .then((r) => {
        swal({
          title: "Data Berhasil Di Update!",
          text: r.data.task,
          icon: "success",
          button: "Ok!",
        });
        navigate("/");
      });
  };

  return (
    <div className="gacor">
      <div className="container-fluid">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div id="document" className="card px-3">
                <div>
                  <i
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                    className="fa fa-arrow-left fa-2x"
                  ></i>
                </div>
                <div className="text-center mt-4">
                  <h1>Update Task</h1>
                </div>
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Masukkan Task"
                      />
                    </div>
                    <button
                      onClick={handleUpdate}
                      type="submit"
                      className="btn btn-secondary ms-2"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateList;
