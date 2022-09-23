import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Tambah() {
  const [task, setTask] = useState();
  const complete = false;

  const navigate = useNavigate();

  const handleCreate = () => {
    axios
      .post(`https://fake-api-coba.herokuapp.com/todos`, {
        task: task,
        complete: complete,
      })
      .then((r) => {
        swal({
          title: "Data Berhasil Di Tambah!",
          text: r.data.task,
          icon: "success",
          button: "Ok!",
        });
        navigate("/");
      })
      .catch((rawe) => alert(rawe, "DATA TIDAK TERINPUT"));
  };

  //  swal({
  //     title: "Failed!",
  //     icon: "warning",
  //     button: "Ok!",
  //     dangerMode: true,
  //   });
  return (
    <div className="gacor">
      <div className="container-fluid">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div id="document" className="card px-3">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  <i className="fa fa-arrow-left fa-2x"></i>
                </div>
                <div className="text-center mt-4">
                  <h1>Tambahkan Task</h1>
                </div>
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input
                        onChange={(e) => setTask(e.target.value)}
                        type="text"
                        id="form2"
                        className="form-control"
                        placeholder="Masukkan Task"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault(e);
                        handleCreate();
                      }}
                      type="submit"
                      className="btn btn-secondary ms-2"
                    >
                      Create
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

export default Tambah;
