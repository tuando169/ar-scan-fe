import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Scan from './components/Scan';
import Manage from './components/manage/Manage';
import BottomNav from './components/layouts/BottomNav';

export default function App() {
  return (
    <Router>
      <div className='h-screen w-screen flex flex-col bg-black overflow-hidden'>
        <div className='flex-1 overflow-hidden pb-14'>
          <Routes>
            <Route path='/' element={<Navigate to='/scan' replace />} />
            <Route path='/scan' element={<Scan />} />
            <Route path='/manage' element={<Manage />} />
          </Routes>
        </div>

        <BottomNav />
      </div>
    </Router>
  );
}
