import { Route, Routes } from "react-router-dom";

import "./App.css";
import SignIn from "./components/Entry/SignIn";
import SignUp from "./components/Entry/SignUp";
import AddNewTask from "./components/Pages/AddNewTask";

import Completed from "./components/Pages/Completed";
import EditingTask from "./components/Pages/EditingTask";
import Home from "./components/Pages/Home";
import ToDo from "./components/Pages/ToDo";
import Footer from "./components/Shared/Footer";
import Navbar from "./components/Shared/Navbar";
import RequireAuth from "./components/Shared/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <ToDo></ToDo>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/completed"
          element={
            <RequireAuth>
              <Completed></Completed>
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/addNewTask"
          element={
            <RequireAuth>
              <AddNewTask></AddNewTask>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <RequireAuth>
              <EditingTask></EditingTask>
            </RequireAuth>
          }
        ></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
