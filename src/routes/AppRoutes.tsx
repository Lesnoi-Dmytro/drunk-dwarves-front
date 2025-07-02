import ThemeSwitch from '@/components/shared/ThemeSwitch/ThemeSwitch';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/games" element={<ThemeSwitch />} />
        <Route path="*" element={<Navigate to="/games" replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
