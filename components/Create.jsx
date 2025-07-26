import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(1);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // check Email
  const allowedTLDs = ["com", "org", "net", "edu", "gov", "in", "co"];
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(\w{2,})$/;
    const match = email.match(emailPattern);
    if (!match) {
      return "Invalid email format!";
    }
    const tld = match[1].toLowerCase();
    if (!allowedTLDs.includes(tld)) {
      return `Invalid TLD! Allowed: ${allowedTLDs.join(", ")}`;
    }
    return "";
  };

  // console.log(name, age, email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateEmail(email);

    if (errorMsg) {
      setError(errorMsg);
    } else {
      const addUser = { name, email, age };

      const response = await fetch("http://localhost:4000", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        console.log("e");
        setError(result.error);
      } else {
        console.log("o");
        setError("");
        setName("");
        setEmail("");
        setAge(1);
        navigate("/all");
      }
    }
  };

  return (
    <div className="container my-3 p-4 rounded shadow">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label ">Name</label>
          <input
            type="text"
            className="form-control bg-transparent text-light"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label ">Email address</label>
          <input
            type="email"
            className="form-control bg-transparent text-light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label ">Age</label>
          <input
            type="number"
            className="form-control bg-transparent text-light"
            min="1"
            max="100"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
