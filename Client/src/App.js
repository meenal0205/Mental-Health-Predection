import './App.css';
import Dashboard from './components/dashboard';
import SideBar from './components/sidebar';
import Navbar from './components/dashboard-components/navbar';
import Diary from './components/diary';
import Therapists from './components/therapists';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={
          <div className='flex w-full bg-[#f7f3ff]'>
            <div className='w-[15%]'>
              <SideBar />
            </div>
            <div className='w-[85%]'>
              <div className='bg-white'>
                <Navbar />
                <div className='p-4 bg-[#f7f3ff] min-h-[90%] top-[8%] absolute w-[85%]'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        } >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/diary' element={<Diary />} />
          <Route path='/therapists' element={<Therapists />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
