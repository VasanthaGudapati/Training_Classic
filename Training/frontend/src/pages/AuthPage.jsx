import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  School as SchoolIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleTabChange = (event, newValue) => {
    setIsLogin(newValue === 0);
    setErrorMsg('');
    setSuccessMsg('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Basic client-side validation
    if (!email || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        setSuccessMsg('⚡ Welcome back! Redirecting...');
        setTimeout(() => {
          navigate(redirectPath);
        }, 1000);
      } else {
        await register(email, password);
        setSuccessMsg('🎉 Registration successful! Welcome to the course...');
        setTimeout(() => {
          navigate(redirectPath);
        }, 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Decorative premium background light blobs */}
      <Box
        sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)',
          top: '-10%',
          left: '-10%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%)',
          bottom: '-15%',
          right: '-10%',
          zIndex: 0,
        }}
      />

      <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <Paper
          elevation={24}
          sx={{
            width: '100%',
            maxWidth: 460,
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Brand Header */}
          <Box
            sx={{
              p: 4.5,
              pb: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3.5,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 16px rgba(15, 23, 42, 0.2)',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SchoolIcon sx={{ fontSize: '2.2rem' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: '#4f46e5', // Primary Indigo
                letterSpacing: '-0.03em',
                textAlign: 'center',
                fontFamily: "'Merriweather', serif",
              }}
            >
              CSForge
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 0.5,
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              Forge Your Computer Science Career
            </Typography>
          </Box>

          {/* Form Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.06)', px: 3 }}>
            <Tabs
              value={isLogin ? 0 : 1}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  py: 2,
                  fontFamily: "'Outfit', sans-serif",
                },
              }}
            >
              <Tab label="Sign In" value={0} />
              <Tab label="Create Account" value={1} />

            </Tabs>
          </Box>

          {/* Form Content */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 4.5,
              pt: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            {/* Status Messages */}
            {errorMsg && (
              <Fade in={!!errorMsg}>
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    borderWidth: '1.5px',
                  }}
                >
                  {errorMsg}
                </Alert>
              </Fade>
            )}

            {successMsg && (
              <Fade in={!!successMsg}>
                <Alert
                  severity="success"
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    borderWidth: '1.5px',
                    backgroundColor: 'rgba(16, 185, 129, 0.02)',
                  }}
                >
                  {successMsg}
                </Alert>
              </Fade>
            )}

            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              disabled={loading}
              variant="outlined"
              placeholder="you@domain.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, fontSize: '0.9rem' },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              disabled={loading}
              variant="outlined"
              placeholder="••••••••"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end" disabled={loading}>
                      {showPassword ? <VisibilityOffIcon sx={{ fontSize: '1.2rem' }} /> : <VisibilityIcon sx={{ fontSize: '1.2rem' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, fontSize: '0.9rem' },
              }}
            />

            {/* Confirm Password (only for Signup) */}
            {!isLogin && (
              <Fade in={!isLogin}>
                <TextField
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                  fullWidth
                  disabled={loading}
                  variant="outlined"
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3, fontSize: '0.9rem' },
                  }}
                />
              </Fade>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : isLogin ? <LoginIcon /> : <PersonAddIcon />}
              sx={{
                mt: 1.5,
                py: 1.8,
                borderRadius: 3,
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: "'Outfit', sans-serif",
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.25)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)',
                },
              }}
            >
              {loading ? (isLogin ? 'Authenticating...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Course Account')}
            </Button>
          </Box>
        </Paper>
      </Zoom>
    </Box>
  );
}
