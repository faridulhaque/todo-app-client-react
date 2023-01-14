import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { Alert } from "react-st-modal";

const EditingTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const [task, setTask] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://my-todo-app-production.up.railway.app/taskediting/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
      });
  }, [task]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const category = e.target.category.value;
    const time = e.target.time.value;
    const newDate = e.target.newDate.value;
    const email = user?.email;
    const allData = {
      task,
      category,
      time,
      newDate,
      email
    };
    if (task && category && time && newDate && email) {

        fetch(`https://my-todo-app-production.up.railway.app/editTask/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(allData),
      })
        .then((res) => res.json())
        .then((data) => {
            if(data.acknowledged){

              Alert("Data updated successfully","Wonderful!")
            }
        });
    }
     else {
      await Alert("You must fill out the input fields","Alert!");
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task</span>
          </label>
          <input name="task" type="text" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task description</span>
          </label>
          <input name="category" type="text" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            name="time"
            value={task.time}
            disabled
            type="text"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            name="newDate"
            value={task.newDate}
            disabled
            type="text"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditingTask;
