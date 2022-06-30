import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";

const ToDo = () => {
  const [user, loading, error] = useAuthState(auth);

  const email = user?.email;
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/myTasks?email=${email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [email]);
  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <div>
      {tasks.length === 0 ? (
        <h1 className="text-3xl mt-5 text-center">
          There is no task for you!
        </h1>
      ) : (
        <h1 className="text-3xl mt-5 text-center">
          These tasks are waiting for you!
        </h1>
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
                {tasks.map((t) => (
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
              {tasks.length !== 0 && (
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
  );
};

export default ToDo;
