import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const Add = () => {
  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    if (!title || !location || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    axios
      .post(`http://localhost:5000/event`, { title, location, date })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: `${title} data has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        history("/");
      })
      .catch((error) => {
        Swal.fire("Network error.Failed to update");
      });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Event</h1>
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="date">Date *</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="location">Location *</label>
        <input
          id="location"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => history("/")}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
