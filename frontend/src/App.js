import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
