import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { format } from "date-fns";
const Edit = () => {
  const { id } = useParams();

  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleUpdate = (e) => {
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
      .patch(`http://localhost:5000/event/${id}`, { title, location, date, id })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `${title} data has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire("Network error.Failed to update");
      });
  };

  const getDetail = (id) => {
    if (!id) {
      return history("/");
    }
    axios
      .get(`http://localhost:5000/event/${id}`)
      .then((response) => {
        let data = response.data;
        if (!data) {
          return history("/");
        } else {
          setTitle(data?.title);
          setLocation(data?.location);
          setDate(format(new Date(data?.date), "yyyy-MM-dd"));
        }
      })
      .catch((error) => {
        Swal.fire("Network error");
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getDetail(id);
  }, [id]);

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Event</h1>
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

export default Edit;
