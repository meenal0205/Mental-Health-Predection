import './App.css';
import Dashboard from './components/dashboard';
import SideBar from './components/sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route  ><div className='flex w-full h-full '>
          <div className='w-[15%]'>
            <SideBar />
          </div>
          <div className='w-[85%]'>
            <Dashboard />
          </div>

        </div></Route>
      </Routes>

    </Router>

  );
}

export default App;
