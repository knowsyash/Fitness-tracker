import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserOnboarding from './pages/userOnboarding';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashBoard';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import DietPlan from './pages/DietPlan';
import { HealthDataProvider } from './context/HealthDataContext';
import FitnessPlanner from './pages/FitnessPlanner';


function App() {
  return (
    <HealthDataProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Landing Page (without Sidebar) */}
          <Route path="/" element={
            <Box sx={{ pt: '64px' }}>
              <LandingPage />
            </Box>
          } />
          <Route path="/start" element={
            <Box sx={{ pt: '64px' }}>
              <UserOnboarding />
            </Box>
          } />
          
          {/* Other Pages (with Sidebar) */}
          <Route path="*" element={
            <Box sx={{ 
              display: 'flex', 
              pt: '64px',
              minHeight: 'calc(100vh - 64px)'
            }}>
              <Sidebar />
              <Box component="main" sx={{ 
                flexGrow: 1, 
                ml: { sm: '320px' },
                width: { sm: `calc(100% - 320px)` },
                p: 3,
                backgroundColor: '#212121'
              }}>
                <Routes>
                  {/* <Route path="/start" element={<UserOnboarding />} /> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dietPlan" element={<DietPlan />} />
                  <Route path="/fitnessPlan" element={<FitnessPlanner></FitnessPlanner>} />
                </Routes>
              </Box>
            </Box>
          } />
        </Routes>
      </BrowserRouter>
    </HealthDataProvider>
  );
}

export default App;