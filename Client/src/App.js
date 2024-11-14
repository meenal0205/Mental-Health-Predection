
import './App.css';
import Dashboard from './components/dashboard';
import SideBar from './components/sidebar';

function App() {
  return (
   
      <div className='flex w-full h-full '>
        <div className='w-[15%]'>
        <SideBar  />
        </div> 
        <div className='w-[85%]'> 
        <Dashboard />
        </div>
        
      </div>

  
  );
}

export default App;
