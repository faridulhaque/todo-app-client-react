import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import "react-day-picker/dist/style.css";
import "./pages.css";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase.init";

const AddTask = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <p>loading...</p>;
  }

  const onSubmit = (data) => {
    const task = data.task;
    const category = data.category;
    const date = data.date;
    const time = data.time;
    const email = user.email;
    const allData = {
      task,
      category,
      date,
      time,
      email,
    };
    console.log(allData)
    if (task && category && date && time && email) {
      fetch(`http://localhost:5000/tasks`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json',

        },
        body: JSON.stringify(allData)
      })
      .then(res => res.json())
      .then(data =>{
        
      })
    }
    }
  
  return (
    <div>
      <h1 className="text-3xl text-center text-primary my-10">Add new task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="addTask-wrapper mb-10">
        <div>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task</span>
              </label>
              <input
                type="text"
                placeholder="Task"
                className="input input-bordered"
                {...register("task", {
                  required: {
                    value: true,
                  },
                })}
              />
            </div>
            <small className="text-danger">
              {errors.task?.type === "required" && "Task is required"}
            </small>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task category</span>
              </label>
              <input
                type="text"
                placeholder="Task category"
                className="input input-bordered"
                {...register("category", {
                  required: {
                    value: true,
                  },
                })}
              />
              <small className="text-danger">
                {errors.category?.type === "required" && "Category is required"}
              </small>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                placeholder="Date"
                className="input input-bordered"
                {...register("date", {
                  required: {
                    value: true,
                  },
                })}
              />
            </div>
            <small className="text-danger">
              {errors.date?.type === "required" && "Date is required"}
            </small>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <input
                type="time"
                placeholder="Time"
                className="input input-bordered"
                {...register("time", {
                  required: {
                    value: true,
                  },
                })}
              />
            </div>
            <small className="text-danger">
              {errors.time?.type === "required" && "Time is required"}
            </small>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
