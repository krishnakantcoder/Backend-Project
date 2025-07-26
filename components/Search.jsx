import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Search = () => {
  const theme = localStorage.getItem("theme") || "light";
  const location = useLocation();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const pref = queryParams.get("q");
  console.log(pref);
  const getData = async () => {
    if (pref.length === 0) return;
    const response = await fetch(`http://localhost:4000/search?q=${pref}`);

    console.log("hi");
    const result = await response.json();
    if (!response.ok) {
      console.log("e");
      setError(result.error);
    } else {
      setData(result);
    }
  };
  useEffect(() => {
    if (pref) getData();
  }, [pref]);
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      {data.length === 0 ? (
        <h2 className="text-center">Oopps!! No Data Found</h2>
      ) : (
        <h2 className="text-center">Search Data</h2>
      )}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#333" }}>
                  {ele.name}
                </h5>
                <p className="card-text" style={{ color: "#333" }}>
                  {ele.age}
                </p>
                <a
                  href={`mailto:${ele.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ele.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Search;
