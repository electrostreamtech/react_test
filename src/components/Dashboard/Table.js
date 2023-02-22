import React, { useEffect, useState } from "react";
import Logout from "../Logout";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Table = ({ setIsAuthenticated }) => {
  const [ListData, setListData] = useState([]);

  const getList = () => {
    axios
      .get("http://localhost:5000/event")
      .then((response) => {
        let data = response.data ? response.data : [];
        setListData(data);
      })
      .catch((error) => {
        Swal.fire("Network error");
      });
  };

  const deleteItem = (id) => {
    Swal.fire({
      icon: "question",
      title: "Delete Action",
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`http://localhost:5000/event/${id}`)
          .then((response) => {
            getList();
            Swal.fire("Deleted successfully.");
          })
          .catch((error) => {
            Swal.fire("Network error. Failed to delete");
          });
      }
    });
  };
  // eslint-disable-next-line no-use-before-define
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container">
      <header>
        <h1>Event Management System</h1>
        <div style={{ marginTop: "30px", marginBottom: "18px" }}>
          <Link to={`event/add`}>
            <button>Add Event</button>
          </Link>
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
      </header>
      <div className="contain-table">
        <table className="striped-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {ListData.length > 0 ? (
              ListData.map((employee, i) => (
                <tr key={employee.id}>
                  <td>{i + 1}</td>
                  <td>{employee.title}</td>
                  <td>{employee.location}</td>
                  <td>{employee.date} </td>
                  <td className="text-right">
                    <Link to={`/event/edit/${employee.id}`}>
                      <button
                        // onClick={() => handleEdit(employee.id)}
                        className="button muted-button"
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => deleteItem(employee.id)}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Events</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
