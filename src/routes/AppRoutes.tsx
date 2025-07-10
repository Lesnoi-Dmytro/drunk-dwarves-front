import ThemeSwitch from '@/components/shared/ThemeSwitch/ThemeSwitch';
import { Card, CardContent, Typography } from '@mui/material';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/games"
          element={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '100%',
              }}
            >
              <Card>
                <CardContent>
                  <Typography gutterBottom>Test</Typography>
                </CardContent>
              </Card>
              <ThemeSwitch />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/games" replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
