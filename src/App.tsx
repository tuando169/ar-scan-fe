import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import Scan from './components/Scan';
import Manage from './components/Manage';

function Navigation() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) navigate('/scan');
          else if (newValue === 1) navigate('/manage');
        }}
      >
        <BottomNavigationAction label='Scan' icon={<QrCodeScannerIcon />} />
        <BottomNavigationAction label='Manage' icon={<ManageSearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          paddingBottom: '56px',
        }}
      >
        <Routes>
          <Route path='/scan' element={<Scan />} />
          <Route path='/manage' element={<Manage />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}
