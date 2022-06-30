import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.init";
import useDate from "../../hooks/useDate";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const { today } = useDate();
  const email = user?.email;
  const [tasks, setTasks] = useState([]);
  const todayTasks = tasks.filter((t) => t.date === today);

  useEffect(() => {
    fetch(`http://localhost:5000/myTasks?email=${email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [email]);
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="home">
      {!user && (
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co/X4GfPsW/man-todo.png)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to MyToDo!</h1>
              <p className="mb-5">Save your tasks in the app!</p>
              <Link to="/signUp" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div>
          <h1 className="text-3xl text-center mt-5"> Hello!</h1>
          <h1 className="text-3xl text-center mt-5"> {user?.displayName}!</h1>
          {todayTasks.length === 0 ? (
            <p className="text-2xl text-center mt-2">
              {" "}
              Today is {today}! There is no task for you today! To see your all
              tasks Click To-Do from the menu!
            </p>
          ) : (
            <p className="text-2xl text-center mt-2">
              {" "}
              Today is {today}! Here are your today's tasks! To see your all
              tasks Click To-Do from the menu!
            </p>
          )}

          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Category</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todayTasks.map((t) => (
                  <tr key={t._id}>
                    <td>{t.task}</td>
                    <td>{t.category}</td>
                    <td>{t.time}</td>
                    <td>
                      <button class="btn btn-primary">Completed</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {todayTasks.length !== 0 && (
                <tfoot>
                  <tr>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
//

export default Home;
