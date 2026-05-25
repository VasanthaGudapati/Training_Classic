import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  Tooltip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Code as CodeIcon,
  Restore as RestoreIcon,
  PlayArrow as PlayArrowIcon,
  AutoStories as AutoStoriesIcon,
  Terminal as TerminalIcon,
  Home as HomeIcon,
  MenuBook as ModulesIcon,
  PlaylistAddCheck as TasksIcon,
  CheckCircle as CheckedIcon,
  RadioButtonUnchecked as UncheckedIcon,
  ArrowForward as ArrowForwardIcon,
  Logout as LogoutIcon,
  RocketLaunch as LogoIcon
} from '@mui/icons-material';
import TerminalConsole from '../components/TerminalConsole';
import NotesSection from '../components/NotesSection';
import { TEMPLATES } from '../utils/templates';
import { THEORY_DATA } from '../utils/theoryData';
import { useAuth } from '../context/AuthContext';

// Tab panel helper component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`playground-tabpanel-${index}`}
      aria-labelledby={`playground-tab-${index}`}
      {...other}
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        pt: 2.5,
        minHeight: 0,
        display: value === index ? 'block' : 'none',
        height: '100%',
        '&::-webkit-scrollbar': {
          width: 6,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 3,
        },
      }}
    >
      {value === index && (
        <Box sx={{ pr: 1.5, pb: 2 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

export default function PlaygroundPage({ curriculumData, onRefresh }) {
  const { authFetch, user, logout } = useAuth();
  const { day } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const dayNum = parseInt(day);
  const item = curriculumData[dayNum];
  const theory = THEORY_DATA[dayNum] || {};

  const [tabValue, setTabValue] = useState(0);
  const [exampleLang, setExampleLang] = useState('python');
  const [lang, setLang] = useState('python');
  const [codeText, setCodeText] = useState('');
  
  // Terminal state
  const [terminalOutput, setTerminalOutput] = useState('Ready to execute script...');
  const [exitCode, setExitCode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lintError, setLintError] = useState(null);
  
  // Checklist Drawer state
  const [tasksOpen, setTasksOpen] = useState(false);

  // Set default templates when dayNum or lang changes
  useEffect(() => {
    if (dayNum !== undefined && !isNaN(dayNum)) {
      const template = TEMPLATES[lang]?.[dayNum] || '';
      setCodeText(template);
      setTerminalOutput('Ready to execute playground sandbox...');
      setExitCode(null);
    }
  }, [dayNum, lang]);

  // Debounced real-time linter checking syntax on change
  useEffect(() => {
    if (!codeText || !codeText.trim()) {
      setLintError(null);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (lang === 'javascript') {
        try {
          new Function(codeText);
          setLintError(null);
        } catch (err) {
          setLintError({
            message: err.message,
            line: null
          });
        }
      } else if (lang === 'python') {
        authFetch('/api/lint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeText, lang: 'python' })
        })
          .then((res) => {
            if (!res.ok) throw new Error('API error');
            return res.json();
          })
          .then((data) => {
            if (data.errors && data.errors.length > 0) {
              const err = data.errors[0];
              setLintError({
                message: err.message,
                line: err.line
              });
            } else {
              setLintError(null);
            }
          })
          .catch(() => {
            setLintError(null);
          });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [codeText, lang]);

  // Navigate home if dayNum is invalid
  useEffect(() => {
    if (curriculumData && Object.keys(curriculumData).length > 0 && !item) {
      navigate('/');
    }
  }, [dayNum, curriculumData, item, navigate]);

  if (!item) {
    return (
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.default' }}>
        <Typography variant="h6">⌛ Resolving Day {day} playground...</Typography>
      </Box>
    );
  }

  // Count completions for checklist Drawer
  const completedCount = Object.entries(curriculumData).filter(([day, item]) => day !== '0' && day !== 0 && item.exists).length;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleResetTemplate = () => {
    const template = TEMPLATES[lang]?.[dayNum] || '';
    setCodeText(template);
    setTerminalOutput('Template reset. Ready to run!');
    setExitCode(null);
  };

  const handleRunPlayground = () => {
    setIsRunning(true);
    setExitCode(null);

    if (lang === 'python') {
      setTerminalOutput(`[System] Dispatching Python code runner to server...\n\n`);
      authFetch('/api/run_code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeText })
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => { throw new Error(err.error || 'Server runner failed') });
          }
          return res.json();
        })
        .then((data) => {
          let outputText = '';
          if (data.stdout) outputText += `--- STDOUT ---\n${data.stdout}\n`;
          if (data.stderr) outputText += `--- STDERR ---\n${data.stderr}\n`;
          outputText += `\n[Playground completed with Exit Code: ${data.exit_code}]`;
          
          setTerminalOutput(outputText);
          setExitCode(data.exit_code);
          onRefresh(); // Sync file status badge
        })
        .catch((err) => {
          setTerminalOutput(`❌ Critical Runner Error: ${err.message}`);
          setExitCode(-99);
        })
        .finally(() => {
          setIsRunning(false);
        });
    } else {
      setTerminalOutput(`[System] Launching browser JavaScript sandbox...\n\n`);
      
      const logBuffer = [];
      const originalLog = console.log;
      
      console.log = (...args) => {
        const formatted = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');
        logBuffer.push(formatted);
      };

      try {
        const sandboxFn = new Function(codeText);
        const start = performance.now();
        sandboxFn();
        const end = performance.now();
        
        let outputText = '--- BROWSER JS SANDBOX ---\n';
        outputText += logBuffer.join('\n') || '[Success: Script completed with no log print statements]';
        outputText += `\n\n[Playground completed in ${(end - start).toFixed(4)} ms]`;
        
        setTerminalOutput(outputText);
        setExitCode(0);
      } catch (e) {
        let errorText = '--- BROWSER JS SANDBOX ERROR ---\n';
        errorText += e.stack || e.message;
        setTerminalOutput(errorText);
        setExitCode(1);
      } finally {
        console.log = originalLog;
        setIsRunning(false);
      }
    }
  };

  // Generate day-specific specifications
  const getSpecs = () => {
    if (!item.desc) return [];
    const parts = item.desc.split(/[,.;] and |, |\. /);
    const specs = parts
      .map(part => part.trim())
      .filter(part => part.length > 0)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1));
      
    specs.push("Handle boundaries, empty inputs, and potential edge cases correctly.");
    specs.push("Verify execution efficiency using execution timing markers.");
    return specs;
  };
  
  const bullets = getSpecs();
  const avatarLetter = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'background.default' }}>
      
      {/* ==========================================
         TOP GLOBAL APPLICATION NAVBAR (CONSISTENT)
         ========================================== */}
      <Box
        component="header"
        sx={{
          height: 72,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.01)',
        }}
      >
        {/* Brand Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <LogoIcon sx={{ fontSize: '1.8rem', color: 'primary.main' }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Core CS Revision
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, fontSize: '0.68rem', letterSpacing: 0.5 }}>
              30-DAY CHALLENGE
            </Typography>
          </Box>
        </Box>

        {/* Center Nav Options */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            onClick={() => navigate('/')}
            startIcon={<HomeIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              color: 'text.secondary',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                color: 'text.primary'
              },
            }}
          >
            Home
          </Button>

          <Button
            onClick={() => navigate('/?scroll=modules')}
            startIcon={<ModulesIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              color: 'text.secondary',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                color: 'text.primary',
              },
            }}
          >
            Core Modules
          </Button>

          <Button
            onClick={() => navigate(`/playground/${dayNum}`)}
            startIcon={<CodeIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              backgroundColor: 'rgba(15, 23, 42, 0.04)',
              color: 'primary.main',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Practice Coding
          </Button>

          <Button
            onClick={() => setTasksOpen(true)}
            startIcon={<TasksIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              backgroundColor: 'rgba(16, 185, 129, 0.06)',
              color: 'success.main',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
              },
            }}
          >
            Daily Tasks
          </Button>
        </Box>

        {/* Right Session Utilities */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Tooltip title={`Signed in as: ${user.email}`} arrow>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
                  border: '2px solid rgba(15, 23, 42, 0.05)',
                  cursor: 'pointer',
                }}
              >
                {avatarLetter}
              </Avatar>
            </Tooltip>
          )}

          <Tooltip title="Log Out Session" arrow>
            <IconButton
              onClick={logout}
              sx={{
                border: '1px solid rgba(239, 68, 68, 0.15)',
                backgroundColor: 'rgba(239, 68, 68, 0.02)',
                color: 'error.main',
                p: 1.2,
                borderRadius: 2.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ==========================================
         PLAYGROUND SPECIFIC SUB-HEADER TOOLBAR
         ========================================== */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
          px: 4,
          py: 2,
          flexShrink: 0,
          backgroundColor: '#ffffff'
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 1, display: 'block', lineHeight: 1 }}>
            {item.module}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1, color: 'text.primary', letterSpacing: '-0.01em' }}>
            Day {dayNum}: {item.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Target File Workspace:
          </Typography>
          <Box component="code" sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', backgroundColor: 'rgba(15, 23, 42, 0.04)', px: 1.8, py: 0.6, borderRadius: 2, color: 'primary.main', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
            {item.path}
          </Box>
        </Box>
      </Box>

      {/* ==========================================
         MAIN WORKSPACE: ALWAYS UNIFIED SPLIT SANDBOX
         ========================================== */}
      <Box sx={{ display: 'flex', flexGrow: 1, minHeight: 0, p: 3, gap: 4, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: THEORY & DOCUMENTATION DETAILS */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(15, 23, 42, 0.08)', flexShrink: 0 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="playground views tabs">
              <Tab label="📚 Theory & Examples" sx={{ textTransform: 'none', fontWeight: 600, minWidth: 80, fontSize: '0.8rem' }} />
              <Tab label="🛠️ Coding Specs" sx={{ textTransform: 'none', fontWeight: 600, minWidth: 80, fontSize: '0.8rem' }} />
              <Tab label="🎯 Practice Exercises" sx={{ textTransform: 'none', fontWeight: 600, minWidth: 80, fontSize: '0.8rem' }} />
              <Tab label="📝 Study Notes" sx={{ textTransform: 'none', fontWeight: 600, minWidth: 80, fontSize: '0.8rem' }} />
            </Tabs>
          </Box>

          {/* Tab 0: Concept Theory */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                  Core Computer Science Concept
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.85rem', mb: 1.5 }}>
                  {item.desc}
                </Typography>
                {theory.concept && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.85rem', pl: 2, borderLeft: '3px solid rgba(15, 23, 42, 0.25)', py: 0.5 }}>
                    {theory.concept}
                  </Typography>
                )}
              </Box>

              {theory.analogy && (
                <Paper elevation={0} sx={{ p: 2, backgroundColor: 'rgba(15, 23, 42, 0.02)', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                    💡 Beginner-Friendly Analogy
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', lineHeight: 1.6 }}>
                    {theory.analogy}
                  </Typography>
                </Paper>
              )}

              {theory.complexity && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    ⚙️ Complexity Analysis
                  </Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 3 }}>
                    <Table size="small">
                      <TableBody>
                        {theory.complexity.split('. ').map((comp, idx) => {
                           const [label, value] = comp.split(': ');
                           if (!label || !value) return null;
                           return (
                             <TableRow key={idx} sx={{ '&:last-child td': { border: 0 } }}>
                               <TableCell sx={{ fontWeight: 600, color: 'text.primary', borderColor: 'rgba(15, 23, 42, 0.06)', fontSize: '0.78rem', py: 1 }}>
                                 {label}
                               </TableCell>
                               <TableCell sx={{ fontFamily: "'JetBrains Mono', monospace", color: 'primary.main', borderColor: 'rgba(15, 23, 42, 0.06)', fontSize: '0.78rem', py: 1 }}>
                                 {value}
                               </TableCell>
                             </TableRow>
                           );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {theory.examples && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      📋 Example Program
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                      <Chip
                        label="Python"
                        size="small"
                        onClick={() => setExampleLang('python')}
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: exampleLang === 'python' ? 'primary.main' : 'rgba(15, 23, 42, 0.04)',
                          color: exampleLang === 'python' ? '#ffffff' : 'text.secondary',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: exampleLang === 'python' ? 'primary.dark' : 'rgba(15, 23, 42, 0.08)' }
                        }}
                      />
                      <Chip
                        label="JavaScript"
                        size="small"
                        onClick={() => setExampleLang('javascript')}
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: exampleLang === 'javascript' ? 'primary.main' : 'rgba(15, 23, 42, 0.04)',
                          color: exampleLang === 'javascript' ? '#ffffff' : 'text.secondary',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: exampleLang === 'javascript' ? 'primary.dark' : 'rgba(15, 23, 42, 0.08)' }
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box
                    component="pre"
                    sx={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.78rem',
                      backgroundColor: '#020617',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      borderRadius: 3,
                      p: 2,
                      color: '#a5b4fc',
                      overflowX: 'auto',
                      m: 0,
                    }}
                  >
                    {theory.examples[exampleLang]}
                  </Box>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Tab 1: Coding Specs */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Daily Practice Specifications
              </Typography>
              <Paper elevation={0} sx={{ backgroundColor: 'rgba(15, 23, 42, 0.02)', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 3, p: 2.5 }}>
                <Box component="ul" sx={{ m: 0, pl: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {bullets.map((bullet, idx) => (
                    <Box
                      component="li"
                      key={idx}
                      sx={{
                        fontSize: '0.85rem',
                        color: 'text.secondary',
                        lineHeight: 1.5,
                        listStyleType: 'square',
                        '&::marker': { color: 'primary.main' }
                      }}
                    >
                      {bullet}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </TabPanel>

          {/* Tab 2: Practice Exercises */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                🎯 Active Recall Revision Exercises
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {theory.exercises && theory.exercises.map((ex, idx) => (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      backgroundColor: 'rgba(52, 211, 153, 0.02)',
                      border: '1px solid rgba(52, 211, 153, 0.1)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'start',
                      gap: 2,
                    }}
                  >
                    <Chip
                      label={`Ex ${idx + 1}`}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: 'rgba(52, 211, 153, 0.1)',
                        color: 'success.main',
                        fontSize: '0.7rem',
                      }}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
                      {ex}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </TabPanel>

          {/* Tab 3: Study Notes */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Durable Study Comments
              </Typography>
              <NotesSection day={dayNum} />
            </Box>
          </TabPanel>
        </Box>

        {/* RIGHT COLUMN: INTERACTIVE CODE SANDBOX */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, borderLeft: '1px solid rgba(15, 23, 42, 0.08)', pl: 4, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5, gap: 2, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CodeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                Interactive Code Sandbox
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                Linter Environment:
              </Typography>
              <Chip label="🐍 Python 3" size="small" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.72rem', borderColor: 'rgba(15, 23, 42, 0.12)' }} />
            </Box>
          </Box>

          {/* Sandbox code editor textarea */}
          <Box
            component="textarea"
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            sx={{
              flexGrow: 1,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.82rem',
              backgroundColor: '#020617',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: 3,
              color: '#34d399',
              p: 2.5,
              resize: 'none',
              outline: 'none',
              lineHeight: 1.5,
              minHeight: 180,
              '&:focus': {
                borderColor: 'primary.main',
                boxShadow: '0 0 10px rgba(15, 23, 42, 0.05)',
              },
            }}
          />

          {/* Real-time Code Linter Status Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mt: 1.5,
              px: 2,
              py: 1,
              borderRadius: 2,
              border: '1px solid',
              backgroundColor: lintError ? 'rgba(239, 68, 68, 0.04)' : 'rgba(16, 185, 129, 0.04)',
              borderColor: lintError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              flexShrink: 0,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem', color: lintError ? 'error.main' : 'success.main' }}>
              {lintError ? '⚠️ Lint Warning:' : '✅ Linter Status:'}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: lintError ? 'text.primary' : 'text.secondary', fontWeight: lintError ? 600 : 500, flexGrow: 1 }}>
              {lintError 
                ? `${lintError.message}${lintError.line ? ` (Line ${lintError.line})` : ''}` 
                : 'Syntax is valid. Ready to execute!'}
            </Typography>
          </Box>

          {/* Action triggers */}
          <Box sx={{ display: 'flex', gap: 2, mt: 1.5, justifyContent: 'flex-end', flexShrink: 0 }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<RestoreIcon />}
              onClick={handleResetTemplate}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.78rem',
                borderRadius: 2,
                borderColor: 'rgba(15, 23, 42, 0.08)',
                backgroundColor: 'rgba(15, 23, 42, 0.02)',
                '&:hover': {
                  borderColor: 'rgba(15, 23, 42, 0.16)',
                  backgroundColor: 'rgba(15, 23, 42, 0.04)',
                },
              }}
            >
              Reset Code
            </Button>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={handleRunPlayground}
              disabled={isRunning}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.78rem',
                borderRadius: 2,
                px: 3,
                backgroundColor: 'primary.main',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: 'none',
                },
              }}
            >
              {isRunning ? 'Executing...' : 'Run Sandbox Code'}
            </Button>
          </Box>

          {/* Interactive console */}
          <Box sx={{ flexShrink: 0 }}>
            <TerminalConsole
              output={terminalOutput}
              exitCode={exitCode}
              isRunning={isRunning}
            />
          </Box>
        </Box>
      </Box>

      {/* ==========================================
         RIGHT SLIDING DRAWER: DAILY CS TASKS (CONSISTENT)
         ========================================== */}
      <Drawer
        anchor="right"
        open={tasksOpen}
        onClose={() => setTasksOpen(false)}
        PaperProps={{
          sx: {
            width: 420,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: '#ffffff',
            boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.05)',
            borderLeft: '1px solid rgba(15, 23, 42, 0.08)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Daily Checklist Tasks
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Syllabus Completion
            </Typography>
          </Box>
          <Chip
            label={`${completedCount}/30 Done`}
            color="success"
            sx={{ fontWeight: 700, fontSize: '0.78rem' }}
          />
        </Box>

        <Divider />

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            pr: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            '&::-webkit-scrollbar': {
              width: 5,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(15, 23, 42, 0.06)',
              borderRadius: 3,
            }
          }}
        >
          <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Object.entries(curriculumData)
              .filter(([day]) => day !== '0' && day !== 0)
              .map(([day, task]) => {
                const dayNumItem = parseInt(day);
                const isDone = task.exists;
                return (
                  <Paper
                    key={day}
                    elevation={0}
                    sx={{
                      border: '1px solid rgba(15, 23, 42, 0.06)',
                      borderRadius: 3,
                      backgroundColor: isDone ? 'rgba(16, 185, 129, 0.02)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'rgba(15, 23, 42, 0.15)',
                        backgroundColor: 'rgba(15, 23, 42, 0.02)',
                        transform: 'translateX(-2px)',
                      }
                    }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setTasksOpen(false);
                          navigate(`/playground/${dayNumItem}`);
                        }}
                        sx={{ py: 1.5, px: 2, borderRadius: 3 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Checkbox
                            checked={isDone}
                            readOnly
                            icon={<UncheckedIcon sx={{ fontSize: '1.2rem', color: 'text.disabled' }} />}
                            checkedIcon={<CheckedIcon sx={{ fontSize: '1.2rem', color: 'success.main' }} />}
                            sx={{ p: 0 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Day ${dayNumItem}: ${task.title}`}
                          secondary={task.module.split('. ')[1] || task.module}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: isDone ? 'text.secondary' : 'text.primary',
                              textDecoration: isDone ? 'line-through' : 'none',
                              lineHeight: 1.3
                            }
                          }}
                          secondaryTypographyProps={{
                            sx: {
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              color: isDone ? 'text.disabled' : 'text.disabled',
                              mt: 0.3
                            }
                          }}
                        />
                        <ArrowForwardIcon sx={{ fontSize: '1rem', color: 'text.disabled', ml: 1 }} />
                      </ListItemButton>
                    </ListItem>
                  </Paper>
                );
              })}
          </List>
        </Box>
      </Drawer>

    </Box>
  );
}
