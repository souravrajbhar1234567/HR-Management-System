import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <EmployeeProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  borderRadius: '12px',
                  background: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '12px',
                  fontWeight: '500',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                },
              }}
            />
            <AppRoutes />
          </EmployeeProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;