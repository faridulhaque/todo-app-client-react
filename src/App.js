import { Route, Routes } from 'react-router-dom';

import './App.css';
import SignIn from './components/Entry/SignIn';
import SignUp from './components/Entry/SignUp';
import AddTask from './components/Pages/AddTask';
import Completed from './components/Pages/Completed';
import Home from './components/Pages/Home';
import ToDo from './components/Pages/ToDo';
import Navbar from './components/Shared/Navbar';
import RequireAuth from './components/Shared/RequireAuth';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/todo" element={<RequireAuth><ToDo></ToDo></RequireAuth>}></Route>
        <Route path="/completed" element={<RequireAuth><Completed></Completed></RequireAuth>}></Route>
        <Route path="/addTask" element={<RequireAuth><AddTask></AddTask></RequireAuth>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
      </Routes>
    </div>
  );
}

export default App;
