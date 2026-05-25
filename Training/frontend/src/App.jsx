import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PlaygroundPage from './pages/PlaygroundPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Create a custom premium light Material UI theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f172a', // Slate-900 (Bold charcoal)
      dark: '#000000',
    },
    secondary: {
      main: '#475569', // Slate-600
    },
    background: {
      default: '#ffffff', // regular white background
      paper: '#ffffff', // pure white card background
    },
    text: {
      primary: '#0f172a', // slate-900
      secondary: '#475569', // slate-600
      disabled: '#94a3b8', // slate-400
    },
    success: {
      main: '#10b981', // Emerald-500
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

/**
 * Route protection wrapper to lock content down for unauthenticated sessions
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login screen, saving original destination
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

function AppContent() {
  const { isAuthenticated, authFetch } = useAuth();
  const [curriculumData, setCurriculumData] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch status of workspace files on load, utilizing authFetch
  const fetchStatus = () => {
    if (!isAuthenticated) return;
    setLoading(true);
    authFetch('/api/status')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data) => {
        setCurriculumData(data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStatus();
    } else {
      setCurriculumData({});
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      {/* Dynamic Authorization Page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected Main Workspace Paths */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard
              curriculumData={curriculumData}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              fetchStatus={fetchStatus}
              loading={loading}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playground/:day"
        element={
          <ProtectedRoute>
            <PlaygroundPage
              curriculumData={curriculumData}
              onRefresh={fetchStatus}
            />
          </ProtectedRoute>
        }
      />

      {/* Catch-all fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
