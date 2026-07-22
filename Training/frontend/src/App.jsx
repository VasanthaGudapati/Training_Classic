import React, { useState, useEffect, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PlaygroundPage from './pages/PlaygroundPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';

import { ColorModeContext } from './context/ColorModeContext';

// Create a custom premium theme generator
const getAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0f172a' : '#f8fafc',
      dark: mode === 'light' ? '#000000' : '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#475569' : '#94a3b8',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#030712',
      paper: mode === 'light' ? '#ffffff' : '#0f172a',
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f8fafc',
      secondary: mode === 'light' ? '#475569' : '#94a3b8',
      disabled: mode === 'light' ? '#94a3b8' : '#475569',
    },
    success: {
      main: '#10b981', // Emerald
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Merriweather', serif", fontWeight: 900 },
    h2: { fontFamily: "'Merriweather', serif", fontWeight: 800 },
    h3: { fontFamily: "'Merriweather', serif", fontWeight: 800 },
    h4: { fontFamily: "'Merriweather', serif", fontWeight: 800 },
    h5: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: "'Merriweather', serif",
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
          backgroundImage: 'none',
          boxShadow: mode === 'light' 
            ? '0 10px 30px -5px rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.02)'
            : '0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 0, 0, 0.2)',
          border: mode === 'light'
            ? '1px solid rgba(15, 23, 42, 0.06)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
              initialView="dashboard"
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
        path="/roadmap"
        element={
          <ProtectedRoute>
            <Dashboard
              initialView="roadmap"
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
        path="/interview"
        element={
          <ProtectedRoute>
            <Dashboard
              initialView="interview"
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
        path="/projects"
        element={
          <ProtectedRoute>
            <Dashboard
              initialView="projects"
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
        path="/profile"
        element={
          <ProtectedRoute>
            <Dashboard
              initialView="profile"
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
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prev) => {
        const next = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', next);
        return next;
      });
    },
    mode,
  }), [mode]);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
