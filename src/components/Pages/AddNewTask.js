import React, { useEffect, useState } from "react";
import "./pages.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Alert } from "react-st-modal";

const AddNewTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const [date, setDate] = useState(new Date());
  const newDate = format(date, "yyyy-MM-dd");

  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const email = user?.email;
  const allData = {
    task,
    category,
    newDate,
    time,
    email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && task && category && time && newDate) {
      fetch(`https://my-todo-app-production.up.railway.app/tasks`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(allData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            Alert("Data added successfully","Great!");
          }
        });
    } else {
      await Alert("Don't leave an input field empty","Alert!");
    }
  };

  useEffect(() => {
    const keyDownHandler = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (email && task && category && time && date) {
          fetch(`https://my-todo-app-production.up.railway.app/tasks`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(allData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                Alert("Data added successfully","Wonderful");
              }
            });
        } else {
          await Alert("Don't leave an input field empty","Alert!");
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [allData]);
  if (loading) {
    return <div></div>;
  }
  return (
    <div className="addNewTask my-10">
      <div>
        {" "}
        <DayPicker
          mode="single"
          selected={format(date, "yyyy-MM-dd")}
          onSelect={setDate}
        />
      </div>
      <form className="form-wrapper">
        <div className="card-body">
          <h1 className="text-3xl text-center">Add a new task</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task</span>
            </label>
            <input
              onChange={(e) => setTask(e.target.value)}
              type="text"
              placeholder="Task Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Description</span>
            </label>
            <input
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="Task description"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Date</span>
            </label>
            <input
              readOnly
              value={format(date, "yyyy-MM-dd")}
              placeholder=""
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Time</span>
            </label>
            <input
              onChange={(e) => setTime(e.target.value)}
              type="time"
              placeholder=""
              className="input input-bordered"
            />
          </div>

          <div className="form-control mt-6">
            <button onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewTask;
