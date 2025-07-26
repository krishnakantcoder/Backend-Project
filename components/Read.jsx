import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const theme = localStorage.getItem("theme") || "light";
  async function getData() {
    const response = await fetch("http://localhost:4000");
    const result = await response.json();
    if (!response.ok) {
      console.log("e");
      setError(result.error);
    } else {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.log("e");
      setError(result.error);
    } else {
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(data);
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#333" }}>
                  {ele.name}
                </h5>
                <a
                  href={`mailto:${ele.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ele.email}
                </a>
                <p className="card-text" style={{ color: "#333" }}>
                  {ele.age}
                </p>
                <a
                  href="#"
                  className="card-link"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </a>
                <Link to={`/${ele._id}`} className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
