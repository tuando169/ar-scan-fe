import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Scan from './components/scan/Scan';
import Manage from './components/manage/Manage';
import BottomNav from './components/layouts/BottomNav';

export default function App() {
  return (
    <Router>
      <div className='min-h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden'>
        <div className='flex-1 overflow-hidden pb-16'>
          <Routes>
            <Route path='/' element={<Navigate to='/scan\' replace />} />
            <Route path='/scan' element={<Scan />} />
            <Route path='/manage' element={<Manage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}