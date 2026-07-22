import React, { useState, useEffect, useRef } from 'react';
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
  Divider,
  Grid,
  Card,
  CardContent,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
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
  RocketLaunch as LogoIcon,
  LightbulbOutlined as LightbulbIcon,
  SportsEsports as TrophyIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  SkipPrevious as ResetIcon,
  CompareArrows as CompareIcon,
  Check as CheckIcon,
  SmartToyOutlined as BotIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Print as PrintIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import TerminalConsole from '../components/TerminalConsole';
import NotesSection from '../components/NotesSection';
import { TEMPLATES } from '../utils/templates';
import { THEORY_DATA } from '../utils/theoryData';
import { INTERACTIVE_CS_DATA } from '../utils/interactiveCSData';
import { useAuth } from '../context/AuthContext';

// Core content databases
import { getTheoryChapter } from '../utils/theoryChaptersData';
import { getQuizzesForDay } from '../utils/quizzesData';
import { getCompleteExplanation } from '../utils/completeExplanationData';
import { getInterviewQuestions } from '../utils/interviewQuestionsData';
import { getPracticeProblems } from '../utils/practiceProblemsData';
import { getAllProjectsForDay } from '../utils/projectsData';
import { PROJECT_HUB_DATABASE } from '../utils/projectHubData';
import { MINI_PROJECTS } from '../utils/miniProjectsData';

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
          background: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 3,
        },
      }}
    >
      {value === index && (
        <Box sx={{ pr: 1.5, pb: 4 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------
// 💡 INTERACTIVE ANIME SIMULATORS & DRY RUNS (VISUALGO-STYLE)
// ---------------------------------------------------------
function InteractiveVisualizer({ dayNum, data }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // interval delay in ms
  const timerRef = useRef(null);

  // Interactive custom states per visualizer type
  const [customArray, setCustomArray] = useState(["10", "20"]);
  const [arrayInput, setArrayInput] = useState("");
  const [customString, setCustomString] = useState("racecar");
  const [stringInput, setStringInput] = useState("");
  const [customSearchTarget, setCustomSearchTarget] = useState(22);

  const dryRunSteps = data?.dryRun || [
    { step: 1, desc: "System initialized. Loading core concepts." },
    { step: 2, desc: "Ready to explore visualizations. Click Next to simulate steps." }
  ];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= dryRunSteps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, dryRunSteps.length, speed]);

  const handleNext = () => {
    setStep(prev => Math.min(dryRunSteps.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  // Variable tracker variables list
  const getTrackerVariables = () => {
    switch (dayNum) {
      case 2:
        return [
          { name: "size", val: step >= 3 ? customArray.length + 1 : step },
          { name: "capacity", val: step >= 3 ? 4 : 2 },
          { name: "elements", val: JSON.stringify(customArray) }
        ];
      case 3:
        return [
          { name: "text", val: customString },
          { name: "left", val: Math.min(step, Math.floor(customString.length / 2)) },
          { name: "right", val: Math.max(customString.length - 1 - step, Math.floor(customString.length / 2)) },
          { name: "match", val: customString[Math.min(step, Math.floor(customString.length / 2))] === customString[Math.max(customString.length - 1 - step, Math.floor(customString.length / 2))] ? "True" : "False" }
        ];
      default:
        return [
          { name: "executionState", val: `Step ${step + 1}` },
          { name: "activePointers", val: "1" }
        ];
    }
  };

  // Dynamic Visualizers
  const renderVisualization = () => {
    switch (dayNum) {
      case 2: // Dynamic Array
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <TextField 
                size="small" 
                placeholder="Val" 
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                sx={{ width: 80, '& input': { fontSize: '0.75rem', p: 1 } }}
              />
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => {
                  if (arrayInput.trim()) {
                    setCustomArray([...customArray, arrayInput.trim()]);
                    setArrayInput("");
                  }
                }}
                sx={{ textTransform: 'none', fontSize: '0.7rem', py: 0.5 }}
              >
                Append
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                color="error"
                onClick={() => setCustomArray(customArray.slice(0, -1))}
                sx={{ textTransform: 'none', fontSize: '0.7rem', py: 0.5 }}
              >
                Pop
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {Array.from({ length: step >= 3 ? 4 : 2 }).map((_, idx) => {
                let val = customArray[idx] || null;
                const isAllocated = idx < (step >= 3 ? 4 : 2);
                return (
                  <Box
                    key={idx}
                    sx={{
                      width: 50,
                      height: 50,
                      border: '2px solid',
                      borderColor: isAllocated ? '#10b981' : 'rgba(15, 23, 42, 0.08)',
                      backgroundColor: val ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#10b981',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {val || "-"}
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: -18, fontSize: '0.62rem', color: 'text.disabled' }}>
                      [{idx}]
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );

      case 3: // Strings
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <TextField 
                size="small" 
                placeholder="Custom Word" 
                value={stringInput}
                onChange={(e) => setStringInput(e.target.value)}
                sx={{ width: 140, '& input': { fontSize: '0.75rem', p: 1 } }}
              />
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => {
                  if (stringInput.trim()) {
                    setCustomString(stringInput.trim());
                    setStringInput("");
                    setStep(0);
                  }
                }}
                sx={{ textTransform: 'none', fontSize: '0.7rem', py: 0.5 }}
              >
                Visualize
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, position: 'relative', pb: 2 }}>
              {customString.split("").map((char, idx) => {
                const maxL = Math.floor(customString.length / 2);
                const isLeft = idx === Math.min(step, maxL);
                const isRight = idx === Math.max(customString.length - 1 - step, maxL);
                const highlight = isLeft || isRight;
                return (
                  <Box
                    key={idx}
                    sx={{
                      width: 36,
                      height: 40,
                      border: '1px solid',
                      borderColor: highlight ? '#10b981' : 'rgba(15, 23, 42, 0.1)',
                      backgroundColor: highlight ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: highlight ? '#10b981' : 'text.primary',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {char}
                    {isLeft && (
                      <Typography variant="caption" sx={{ position: 'absolute', top: -18, color: 'success.main', fontWeight: 800 }}>
                        L➜
                      </Typography>
                    )}
                    {isRight && (
                      <Typography variant="caption" sx={{ position: 'absolute', bottom: -18, color: 'primary.main', fontWeight: 800 }}>
                        ⬅R
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2, width: '100%' }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              CS Concept Logic Flow
            </Typography>
            <Box sx={{ border: '2px dashed rgba(15, 23, 42, 0.15)', p: 3, borderRadius: 3, textAlign: 'center', width: '80%' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                Memory Allocation Stack/Heap
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 2 }}>
                <Paper sx={{ p: 1.5, border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>STACK</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>ptr_addr: 0x7ffd</Typography>
                </Paper>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>➜</Typography>
                <Paper sx={{ p: 1.5, border: '1px solid rgba(15, 23, 42, 0.08)', backgroundColor: 'rgba(16, 185, 129, 0.02)' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>HEAP OBJECT</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>Data Block size={step + 1}</Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, mb: 3 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Controls Panel */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
            🎨 Premium CS Logic Simulator
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            {/* Speed Control */}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>Speed:</Typography>
              {[
                { label: "0.5x", val: 2000 },
                { label: "1x", val: 1000 },
                { label: "2x", val: 500 }
              ].map(s => (
                <Chip 
                  key={s.val}
                  label={s.label} 
                  size="small" 
                  onClick={() => setSpeed(s.val)}
                  color={speed === s.val ? "primary" : "default"}
                  variant={speed === s.val ? "filled" : "outlined"}
                  sx={{ height: 20, fontSize: '0.65rem', cursor: 'pointer' }}
                />
              ))}
            </Box>
            <Divider orientation="vertical" flexItem />
            {/* Play controls */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton onClick={handlePrev} disabled={step === 0} size="small">
                <ChevronLeftIcon />
              </IconButton>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setIsPlaying(!isPlaying)}
                startIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
                sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.72rem', borderRadius: 2 }}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <IconButton onClick={handleNext} disabled={step >= dryRunSteps.length - 1} size="small">
                <ChevronRightIcon />
              </IconButton>
              <IconButton onClick={handleReset} size="small" color="error">
                <ResetIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Visual Board & Memory View Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Execution Simulation Board
            </Typography>
            <Box sx={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.01)', borderRadius: 3, border: '1px solid rgba(15, 23, 42, 0.04)', p: 2 }}>
              {renderVisualization()}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Variable State Tracker
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2.5, maxHeight: 160 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ backgroundColor: 'rgba(15, 23, 42, 0.03)' }}>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', py: 0.5 }}>Variable</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', py: 0.5 }}>Value</TableCell>
                  </TableRow>
                  {getTrackerVariables().map((v, idx) => (
                    <TableRow key={idx}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem', py: 0.5, color: 'primary.main', fontWeight: 700 }}>{v.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem', py: 0.5 }}>{v.val}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Execution Timeline stepper indicator */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', display: 'block', mb: 1 }}>
            Execution Timeline (Live Trace)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
            {dryRunSteps.map((s, idx) => {
              const active = idx === step;
              const completed = idx < step;
              return (
                <Box 
                  key={idx}
                  sx={{ 
                    px: 1.5, 
                    py: 0.8, 
                    borderRadius: 2, 
                    border: '1px solid',
                    borderColor: active ? '#10b981' : (completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(15, 23, 42, 0.08)'),
                    backgroundColor: active ? 'rgba(16, 185, 129, 0.05)' : (completed ? 'rgba(16, 185, 129, 0.01)' : 'transparent'),
                    color: active ? '#10b981' : (completed ? 'text.secondary' : 'text.disabled'),
                    minWidth: 100,
                    textAlign: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Step {idx + 1}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Dry Run Stepper Status Log */}
        <Box sx={{ backgroundColor: '#0f172a', p: 2, borderRadius: 2.5, color: '#e2e8f0' }}>
          <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
            Status Log Trace
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'system-ui', lineHeight: 1.5, fontSize: '0.8rem' }}>
            {dryRunSteps[step]?.desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------
// 🧠 INTERACTIVE QUIZ CONSTRUCTS
// ---------------------------------------------------------
function InteractiveQuiz({ quizzes, onAddXP }) {
  const [activeType, setActiveType] = useState("All");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  if (!quizzes || quizzes.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
        No quizzes loaded for this section. Check back soon!
      </Typography>
    );
  }

  const filteredQuizzes = quizzes.filter(q => activeType === "All" || q.type === activeType);
  const activeQuiz = filteredQuizzes[currentIdx] || filteredQuizzes[0] || quizzes[0];

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setTypedAnswer("");
    setIsChecked(false);
  };

  const handleOptionClick = (idx) => {
    if (isChecked) return;
    setSelectedOpt(idx);
  };

  const handleCheckAnswer = () => {
    if (isChecked) return;
    setIsChecked(true);

    if (activeQuiz.type === "Fill in the blank") {
      const correctWord = activeQuiz.options[activeQuiz.answer].toLowerCase().trim();
      const userWord = typedAnswer.toLowerCase().trim();
      const match = userWord === correctWord;
      setIsCorrect(match);
      if (match) {
        setQuizScore(prev => prev + 1);
        onAddXP(100);
      }
    } else {
      const match = selectedOpt === activeQuiz.answer;
      setIsCorrect(match);
      if (match) {
        setQuizScore(prev => prev + 1);
        onAddXP(100);
      }
    }
  };

  const handleNextQuiz = () => {
    setSelectedOpt(null);
    setTypedAnswer("");
    setIsChecked(false);
    setCurrentIdx(prev => (prev + 1) % filteredQuizzes.length);
  };

  const quizTypes = ["All", "MCQ", "True/False", "Fill in the blank", "Code Output", "Scenario"];

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, p: 1.5, mb: 3 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Category Filters bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>
            ⚡ Active Recall Quiz System
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {quizTypes.map(type => (
              <Chip 
                key={type}
                label={type} 
                size="small" 
                onClick={() => handleTypeChange(type)}
                color={activeType === type ? "primary" : "default"}
                variant={activeType === type ? "filled" : "outlined"}
                sx={{ height: 22, fontSize: '0.65rem', cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip label={activeQuiz.type} color="secondary" variant="outlined" size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
            Question {currentIdx + 1} of {filteredQuizzes.length}
          </Typography>
        </Box>
        
        {/* Code Output Formatting */}
        {activeQuiz.type === "Code Output" ? (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5 }}>
              Analyze the code snippet below and predict the output:
            </Typography>
            <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', color: '#a5b4fc', borderRadius: 2, fontFamily: 'monospace', fontSize: '0.75rem', overflowX: 'auto', mb: 2 }}>
              {activeQuiz.question.replace("Predict the stdout output of the following code snippet related to " + activeQuiz.type + ":\n\n", "")}
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ fontWeight: 750, color: 'text.primary', fontSize: '0.86rem', lineHeight: 1.5 }}>
            {activeQuiz.question}
          </Typography>
        )}

        {/* Answer Entry UI */}
        {activeQuiz.type === "Fill in the blank" ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField 
              fullWidth
              size="small"
              placeholder="Type your answer here..."
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={isChecked}
              sx={{ '& input': { fontSize: '0.8rem' } }}
            />
            {isChecked && (
              <Typography variant="caption" sx={{ color: isCorrect ? 'success.main' : 'error.main', fontWeight: 800 }}>
                {isCorrect ? "Correct!" : `Incorrect! Correct answer is: "${activeQuiz.options[activeQuiz.answer]}"`}
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {activeQuiz.options.map((opt, oIdx) => {
              let bgColor = 'transparent';
              let borderStyle = '1px solid rgba(15, 23, 42, 0.08)';
              if (selectedOpt === oIdx) {
                bgColor = 'rgba(25, 118, 210, 0.04)';
                borderStyle = '1px solid #1976d2';
              }
              if (isChecked) {
                if (oIdx === activeQuiz.answer) {
                  bgColor = 'rgba(16, 185, 129, 0.08)';
                  borderStyle = '2px solid #10b981';
                } else if (selectedOpt === oIdx) {
                  bgColor = 'rgba(239, 68, 68, 0.08)';
                  borderStyle = '2px solid #ef4444';
                }
              }

              return (
                <Box
                  key={oIdx}
                  onClick={() => handleOptionClick(oIdx)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    border: borderStyle,
                    backgroundColor: bgColor,
                    cursor: isChecked ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: isChecked ? bgColor : 'rgba(15, 23, 42, 0.02)',
                    }
                  }}
                >
                  {opt}
                  {isChecked && oIdx === activeQuiz.answer && <CheckIcon color="success" sx={{ fontSize: '1.1rem' }} />}
                </Box>
              );
            })}
          </Box>
        )}

        {isChecked && (
          <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: 'rgba(15, 23, 42, 0.02)', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
              📚 Explanation Detail:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
              {activeQuiz.explanation}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
          {!isChecked ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleCheckAnswer}
              disabled={activeQuiz.type === "Fill in the blank" ? !typedAnswer.trim() : selectedOpt === null}
              sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 3 }}
            >
              Verify Answer
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={handleNextQuiz}
              sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 3 }}
            >
              Next Question
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------
// 📇 DYNAMIC MEMORY FLASHCARDS (FLIP ANIME)
// ---------------------------------------------------------
function Flashcards({ cards }) {
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('flashcard_bookmarks') || '[]'));

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[idx];
  const isBookmarked = bookmarks.includes(`${idx}-${currentCard.q}`);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setFlipped(false);
    setIdx(prev => (prev + 1) % cards.length);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    const key = `${idx}-${currentCard.q}`;
    let newBookmarks;
    if (bookmarks.includes(key)) {
      newBookmarks = bookmarks.filter(b => b !== key);
    } else {
      newBookmarks = [...bookmarks, key];
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('flashcard_bookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary' }}>
            📇 Active Recall Flashcards
          </Typography>
          <IconButton onClick={handleBookmark} size="small" color="primary">
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>

        {/* Flip Box Frame */}
        <Box
          onClick={handleFlip}
          sx={{
            perspective: '1000px',
            cursor: 'pointer',
            height: 140,
            width: '100%',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'none',
            }}
          >
            {/* Front Card */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                border: '1px dashed rgba(15, 23, 42, 0.15)',
                borderRadius: 3,
                backgroundColor: 'rgba(15, 23, 42, 0.01)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                boxSizing: 'border-box'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.85rem' }}>
                Q: {currentCard.q}
              </Typography>
            </Box>

            {/* Back Card */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                borderRadius: 3,
                backgroundColor: 'rgba(16, 185, 129, 0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                boxSizing: 'border-box'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main', fontSize: '0.82rem', lineHeight: 1.5 }}>
                A: {currentCard.a}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600 }}>
            Click card to flip
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={handleNext}
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 2 }}
          >
            Next Card
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------
// 🤖 OFFLINE-FIRST STREAMING AI TUTOR FRAMEWORK
// ---------------------------------------------------------
function AITutorWidget({ dayNum, title }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! I'm your Google DeepMind study tutor. Select a shortcut below or type a query to explore Day ${dayNum} (${title}) concepts deeply.` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (promptType) => {
    switch (promptType) {
      case 'explain_simply':
        return `Let's explain Day ${dayNum} simply! Imagine you are building a LEGO tower. Each block sits directly on top of the other, but what if you need to rearrange them? In computing, different topics solve this in unique ways: dynamic arrays rearrange everything to double capacity, linked lists hook nodes like paperclips, and stacks stack up plate-by-plate! It's all about making memory access faster or saving storage slots.`;
      case 'analogy':
        return `Here is a real-world analogy for Day ${dayNum}: It's like checking bags at the airport. Static allocation reserves a locked locker size beforehand. Dynamic structures let you request more lockers or link subsequent suitcases with dynamic pointer coordinates. The algorithm handles the logistics automatically so you don't lose key parameters!`;
      case 'cheat':
        return `Day ${dayNum} 2-Minute Cheat Sheet Summary:\n• Core Rule: Always check boundary values (Null checks, empty strings, division by zero).\n• Complexity: Focus on maintaining O(1) lookups or O(log N) splits.\n• Tip: Drawing a pointer diagram saves hours of debugging stack variables.`;
      case 'interview':
        return `Mock FAANG Question for Day ${dayNum}:\n'Explain how this concept scales when data size grows by 1000x. What bottlenecks occur, and how do we resolve them?'\n💡 Tip: Focus on space constraints (Heap memory limits) and explain how cache hits/misses impact runtime.`;
      default:
        return `I can help you review the concepts for Day ${dayNum}. Try selecting one of the rapid explanation shortcuts above!`;
    }
  };

  const handleShortcutClick = (type, label) => {
    if (isTyping) return;
    
    // Add user message
    const newMsgs = [...messages, { role: 'user', text: label }];
    setMessages(newMsgs);
    setIsTyping(true);

    setTimeout(() => {
      setMessages([...newMsgs, { role: 'bot', text: getAIResponse(type) }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const newMsgs = [...messages, { role: 'user', text: inputValue }];
    setMessages(newMsgs);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages([...newMsgs, { role: 'bot', text: `That's a great question about Day ${dayNum}! To answer that, consider that every algorithm must balance time complexity (CPU cycles) and space complexity (Ram registers). Focusing on standard constraints is the key to passing technical rounds.` }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, p: 1, backgroundColor: 'rgba(15, 23, 42, 0.01)' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BotIcon color="primary" />
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
            🤖 AI Study Tutor
          </Typography>
        </Box>

        {/* Chat Feed */}
        <Box
          sx={{
            height: 180,
            overflowY: 'auto',
            border: '1px solid rgba(15, 23, 42, 0.06)',
            borderRadius: 2.5,
            p: 2,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.06)', borderRadius: 2 }
          }}
        >
          {messages.map((m, idx) => (
            <Box
              key={idx}
              sx={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: m.role === 'user' ? 'primary.main' : 'rgba(15, 23, 42, 0.04)',
                color: m.role === 'user' ? '#ffffff' : 'text.primary',
                p: 1.2,
                borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                fontSize: '0.78rem',
                fontWeight: 500,
                maxWidth: '85%',
                whiteSpace: 'pre-line'
              }}
            >
              {m.text}
            </Box>
          ))}
          {isTyping && (
            <Typography variant="caption" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
              Tutor is drafting reply...
            </Typography>
          )}
        </Box>

        {/* Canned Shortcuts */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip label="Explain Simply 👶" onClick={() => handleShortcutClick('explain_simply', "Explain this concept simply")} size="small" variant="outlined" sx={{ cursor: 'pointer', fontSize: '0.68rem', fontWeight: 600 }} />
          <Chip label="Real Analogy 💡" onClick={() => handleShortcutClick('analogy', "Give me an analogy")} size="small" variant="outlined" sx={{ cursor: 'pointer', fontSize: '0.68rem', fontWeight: 600 }} />
          <Chip label="2-Min Cheat Sheet 📄" onClick={() => handleShortcutClick('cheat', "Show cheat sheet")} size="small" variant="outlined" sx={{ cursor: 'pointer', fontSize: '0.68rem', fontWeight: 600 }} />
          <Chip label="FAANG Prep 🎙️" onClick={() => handleShortcutClick('interview', "Give me mock interview questions")} size="small" variant="outlined" sx={{ cursor: 'pointer', fontSize: '0.68rem', fontWeight: 600 }} />
        </Box>

        {/* Custom Input */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Ask AI Tutor..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            fullWidth
            InputProps={{
              sx: { fontSize: '0.78rem', borderRadius: 2 }
            }}
          />
          <Button variant="contained" size="small" onClick={handleSend} sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 2 }}>
            Send
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------
// 🎓 LINE-BY-LINE CODE EXPLAINER COMPONENT
// ---------------------------------------------------------
function LineByLineExplainer({ lang, codeLines, lineData }) {
  const [selectedLine, setSelectedLine] = useState(null);

  if (!codeLines || codeLines.length === 0) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        🔍 Line-by-Line Code Explainer
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1.5 }}>
        Click any highlighted line of code below to analyze its purpose, memory changes, and complexity:
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        {/* Lines Board */}
        <Box
          sx={{
            flex: 1,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            backgroundColor: '#020617',
            color: '#94a3b8',
            borderRadius: 3,
            p: 2,
            border: '1px solid rgba(15, 23, 42, 0.08)',
            overflowX: 'auto',
            maxHeight: 280,
            overflowY: 'auto'
          }}
        >
          {codeLines.map((line, idx) => {
            const hasExp = lineData && Object.keys(lineData).some(key => line.includes(key));
            const isSel = selectedLine === idx;
            return (
              <Box
                key={idx}
                onClick={() => hasExp && setSelectedLine(isSel ? null : idx)}
                sx={{
                  py: 0.2,
                  px: 1,
                  display: 'flex',
                  gap: 2,
                  cursor: hasExp ? 'pointer' : 'default',
                  backgroundColor: isSel ? 'rgba(52, 211, 153, 0.15)' : (hasExp ? 'rgba(52, 211, 153, 0.03)' : 'transparent'),
                  color: isSel ? '#34d399' : (hasExp ? '#a7f3d0' : 'inherit'),
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: hasExp ? 'rgba(52, 211, 153, 0.1)' : 'transparent'
                  }
                }}
              >
                <Box sx={{ width: 24, textAlign: 'right', opacity: 0.3 }}>{idx + 1}</Box>
                <Box sx={{ whiteSpace: 'pre' }}>{line}</Box>
              </Box>
            );
          })}
        </Box>

        {/* Explain Board */}
        {selectedLine !== null ? (() => {
          const lineText = codeLines[selectedLine];
          const matchKey = lineData && Object.keys(lineData).find(key => lineText.includes(key));
          const explanation = matchKey ? lineData[matchKey] : "Core syntax instruction.";

          return (
            <Card variant="outlined" sx={{ width: { xs: '100%', md: 240 }, borderRadius: 3, backgroundColor: 'rgba(52, 211, 153, 0.02)', borderColor: 'rgba(16, 185, 129, 0.15)', flexShrink: 0 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.main', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Line {selectedLine + 1} Explained
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.03)', p: 1, borderRadius: 1.5, wordBreak: 'break-all' }}>
                  {lineText.trim()}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                  {explanation}
                </Typography>
              </CardContent>
            </Card>
          );
        })() : (
          <Box sx={{ width: { xs: '100%', md: 240 }, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(15, 23, 42, 0.08)', borderRadius: 3, p: 3, textAlign: 'center', flexShrink: 0 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Select any green-tinted line of code to see the step explanation.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------
// 💻 CODING PRACTICE PROBLEMS COMPONENT
// ---------------------------------------------------------
function CodingProblemItem({ item, onTrySolution }) {
  const [solLang, setSolLang] = useState('python');
  return (
    <Accordion variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', mb: 1.5, '&:before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexWrap: 'wrap', gap: 1.2 }}>
          <Typography variant="body2" sx={{ fontWeight: 800 }}>
            {item.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip label={item.difficulty} size="small" color={item.difficulty === 'Easy' ? 'success' : (item.difficulty === 'Medium' ? 'warning' : 'error')} variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
            {item.companyTags?.slice(0, 3).map((comp, idx) => (
              <Chip key={idx} label={comp} size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
            ))}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderTop: '1px solid rgba(15,23,42,0.06)', p: 3 }}>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
            📋 Problem Statement:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.5 }}>
            {item.statement}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
              🔒 Constraints:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>
              {item.constraints}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
              ⚠️ Edge Cases:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>
              {item.edgeCases}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ p: 2, backgroundColor: 'rgba(25, 118, 210, 0.02)', borderRadius: 2.5, border: '1px dashed rgba(25, 118, 210, 0.15)' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
            💡 Algorithmic Approach & Hints:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 1 }}>
            {item.approach}
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {item.hints.map((hint, idx) => (
              <Box component="li" key={idx} sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>{hint}</Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.8 }}>
            💻 Verified Solution Code (Multi-Language):
          </Typography>
          
          {/* Lang Selector Bar */}
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            {['python', 'java', 'cpp', 'javascript'].map(l => (
              <Chip 
                key={l}
                label={l.toUpperCase()} 
                size="small" 
                onClick={() => setSolLang(l)}
                color={solLang === l ? "primary" : "default"}
                variant={solLang === l ? "filled" : "outlined"}
                sx={{ height: 20, fontSize: '0.62rem', cursor: 'pointer' }}
              />
            ))}
          </Box>

          <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', color: '#a5b4fc', borderRadius: 2.5, fontFamily: 'monospace', fontSize: '0.75rem', overflowX: 'auto' }}>
            {item.solutions?.[solLang] || "No code solution available for this language."}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Complexity: Time {item.timeComplexity} | Space {item.spaceComplexity}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => onTrySolution(item.solutions?.[solLang] || "")}
              sx={{ textTransform: 'none', fontSize: '0.72rem', fontWeight: 700, borderRadius: 1.5 }}
            >
              Load Solution in Sandbox Editor
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

// ---------------------------------------------------------
// 🎓 PREMIUM CERTIFICATE OF COMPLETION
// ---------------------------------------------------------
function CertificateGenerator({ stats, userEmail }) {
  const printCertificate = () => {
    window.print();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 4,
        p: 4,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        textAlign: 'center',
        border: '3px solid #10b981',
        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '@media print': {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          boxShadow: 'none',
          backgroundColor: '#0f172a !important',
          color: '#ffffff !important',
          zIndex: 9999
        }
      }}
    >
      {/* Decorative Ribbon */}
      <Box sx={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, backgroundColor: '#10b981', transform: 'rotate(45deg)' }} />

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 4 }}>
        <LogoIcon sx={{ fontSize: '3.5rem', color: '#10b981' }} />
        
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#10b981' }}>
            Certificate of Completion
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', letterSpacing: 1, textTransform: 'uppercase', mt: 0.5, display: 'block' }}>
            Core Computer Science Practical Revision Program
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#94a3b8', mb: 1 }}>
            This is proudly awarded to
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, textDecoration: 'underline', textDecorationColor: '#10b981', mb: 1, letterSpacing: '-0.02em' }}>
            {userEmail || "Distinguished Student"}
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}>
            for successfully completing the rigorous 30-Day Computer Science syllabus, covering Data Structures, OOP, Operating Systems, Networking, and Databases.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ maxWidth: 600, borderTop: '1px solid rgba(255,255,255,0.08)', pt: 3, mt: 1 }}>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#10b981' }}>30/30</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>Days Completed</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#10b981' }}>{stats.score * 100} XP</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>Experience Points</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#10b981' }}>100%</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>Mastery Rate</Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }} className="no-print">
          <Button
            variant="contained"
            color="success"
            startIcon={<PrintIcon />}
            onClick={printCertificate}
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
          >
            Print / Save PDF
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            href="https://www.linkedin.com"
            target="_blank"
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
          >
            Share on LinkedIn
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

const getEnrichedAnswerDetails = (q, a) => {
  const lowerQ = q.toLowerCase();
  
  let definition = a || "This concept defines how components or values are created, structured, and executed inside the runtime context.";
  let explanation = "Under the hood, this structure manages system memory and variables allocation by checking safety bounds and preventing logic corruption.";
  let realWorld = "Used in modern development frameworks (like React, Spring, or Django) to decouple code layers, control execution flow, and speed up query searches.";
  let bestResponse = `Clearly explain the primary mechanism (e.g. data flows, scope layers, or pointer redirections). Detail the time/space complexities, and name a concrete scenario where you utilized this pattern to optimize a component.`;
  let keywords = "Time Complexity, Scope boundaries, Memory Allocations, Performance optimization, References";
  let tip = "Always start with the core classification (e.g., design pattern, data structure, or syntax rule) before detailing specific method configurations.";
  let codeExample = "";
  let complexity = "";

  if (lowerQ.includes("stack") || lowerQ.includes("heap")) {
    explanation = "Stack memory is organized as a Last-In-First-Out (LIFO) structure managed by the CPU for local variables. Heap memory is a large, unorganized pool used for dynamic variables that can persist beyond stack frames.";
    realWorld = "Local variable allocations inside functions use Stack memory, while large objects or database structures reside in the Heap.";
    keywords = "LIFO, Memory allocation, Pointers, Stack Frame, Garbage Collection, Deallocation";
    tip = "Emphasize that stack access is extremely fast (measured in nanoseconds) compared to heap access which involves lookup overhead.";
    complexity = "Stack Allocation: O(1) | Heap Allocation: O(1) average, but subject to fragmentation.";
  } else if (lowerQ.includes("compiler") || lowerQ.includes("interpreter")) {
    explanation = "A compiler translates the entire source code into native machine code at once before execution. An interpreter translates and executes the code line-by-line at runtime.";
    realWorld = "Languages like C++ are compiled for maximum CPU efficiency. Languages like Python are interpreted for fast development and portability.";
    keywords = "Lexical analysis, AST (Abstract Syntax Tree), Compilation, Runtime loop, JIT";
    tip = "Mention JIT (Just-In-Time) compilation (like V8 or JVM) which combines compiling and interpreting for optimization.";
  } else if (lowerQ.includes("recursion") || lowerQ.includes("recursive")) {
    explanation = "Recursion is a programming pattern where a function solves a problem by calling itself with scaled-down inputs until it hits a base case.";
    realWorld = "Directory traversal, tree structures (JSON parsers), and DFS graph algorithms are inherently recursive.";
    keywords = "Base case, Recursive step, Call stack frame, Stack overflow, Tail recursion";
    tip = "Always highlight that recursion has a space overhead of O(N) due to stack frames, and mention how to optimize it to O(1) using iteration.";
    complexity = "Time: O(N) for linear recursion | Space: O(N) stack depth.";
    codeExample = "def recurse(n):\n    if n <= 1: return 1\n    return n * recurse(n - 1)";
  } else if (lowerQ.includes("oop") || lowerQ.includes("object") || lowerQ.includes("encapsulation") || lowerQ.includes("polymorphism")) {
    explanation = "Object-Oriented Programming (OOP) organizes software around data (objects) rather than logic, utilizing Encapsulation, Inheritance, Polymorphism, and Abstraction.";
    realWorld = "UI components libraries (like React or Android components) represent widgets as classes/objects that inherit properties.";
    keywords = "Encapsulation, Inheritance, Polymorphism, Abstraction, Class Blueprint, Methods";
    tip = "Focus on the SOLID design principles when talking about OOP to demonstrate senior-level system design skills.";
  } else if (lowerQ.includes("array") || lowerQ.includes("search") || lowerQ.includes("sort")) {
    explanation = "Arrays store elements in contiguous memory slots, allowing O(1) index access. Sorting rearranges these elements according to a comparator.";
    realWorld = "Database index tables, search filters, and audio/video streaming buffers.";
    keywords = "Contiguous memory, Pointer arithmetic, Cache locality, Bubble sort, Quick sort, Binary search";
    tip = "Discuss cache locality—elements in an array are cached together, making linear scans extremely fast at the hardware level.";
    complexity = "Search: O(1) by index, O(N) by value | Binary Search: O(log N).";
    codeExample = "int binarySearch(int[] arr, int target) {\n    int l = 0, r = arr.length - 1;\n    while(l <= r) {\n        int m = l + (r-l)/2;\n        if(arr[m] == target) return m;\n        if(arr[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}";
  } else if (lowerQ.includes("dbms") || lowerQ.includes("sql") || lowerQ.includes("database")) {
    explanation = "Relational Database Management Systems store data in tables with predefined schemas. SQL is used to query, join, and manipulate this structured data.";
    realWorld = "Financial transactional ledgers (ACID compliant) and e-commerce shopping carts.";
    keywords = "ACID, Indexing, Joins, Primary Key, Foreign Key, Normalization, Query Optimizer";
    tip = "Always explain the difference between Clustered and Non-Clustered indexing to show database scaling expertise.";
  } else if (lowerQ.includes("mvc") || lowerQ.includes("mvvm") || lowerQ.includes("architecture")) {
    explanation = "MVC (Model-View-Controller) decouples an application into three distinct components to organize complex codebases: Model (data), View (UI), and Controller (logic router).";
    realWorld = "Backend frameworks (like Django, Spring, Rails) use MVC to link database schemas with visual templates.";
    keywords = "Decoupling, Separation of concerns, Model state, Controller routing, View presentation";
    tip = "Point out that keeping 'models fat and controllers thin' is a key best practice for clean modular architectures.";
  } else if (lowerQ.includes("socket") || lowerQ.includes("http") || lowerQ.includes("network")) {
    explanation = "Sockets allow standard network communication endpoints between client and server hosts over TCP/IP or UDP connection slots.";
    realWorld = "Chat applications, web browsers requesting site assets, and online multiplayer games.";
    keywords = "TCP handshake, Socket descriptor, Ports, Hostname resolver, Headers envelope";
    tip = "Be prepared to explain the exact differences between TCP (reliable, connection-oriented) and UDP (unreliable, fast, connectionless).";
  }

  return {
    definition,
    explanation,
    realWorld,
    bestResponse,
    keywords,
    tip,
    codeExample,
    complexity
  };
};

const normalizeProject = (p) => {
  if (!p) return null;
  
  let guide = [];
  if (Array.isArray(p.implementationGuide)) {
    guide = p.implementationGuide.map((item) => ({
      task: item.task || item.title || "Step Details",
      instruction: item.instruction || item.desc || "Follow the step instructions to build this module.",
      code: item.code || ""
    }));
  } else if (Array.isArray(p.steps)) {
    guide = p.steps.map((step, idx) => ({
      task: `Step ${idx + 1}`,
      instruction: step,
      code: `# Starter code for ${p.title}\ndef solve():\n    pass`
    }));
  }

  let extList = [];
  if (Array.isArray(p.extensions)) extList = p.extensions;
  else if (Array.isArray(p.extensionIdeas)) extList = p.extensionIdeas;
  else extList = ["Add metrics logging dashboards.", "Add unit test validations."];

  let concepts = [];
  if (Array.isArray(p.coreConcepts)) concepts = p.coreConcepts;
  else if (Array.isArray(p.requiredConcepts)) concepts = p.requiredConcepts;
  else concepts = ["System Design", "Backend Design", p.difficulty || "Intermediate"];

  return {
    projectId: p.projectId || p.id,
    title: p.title,
    difficulty: p.difficulty || "Intermediate",
    estimatedTime: p.estimatedTime || "3 Hours",
    description: p.description || p.problemStatement || "",
    objective: p.objective || p.learningObjectives || p.problemStatement || "",
    coreConcepts: concepts,
    folderStructure: p.folderStructure || "src/\n├── main.py\n└── config.json",
    systemArchitecture: p.systemArchitecture || p.architectureDiagram || p.architecture || "Client Terminal -> Controller -> Output",
    databaseDesign: p.databaseDesign || "No database required.",
    implementationGuide: guide,
    uiMockup: p.uiMockup || p.frontendDesign || p.expectedOutput || "Standard Console Layout",
    commonMistakes: Array.isArray(p.commonMistakes) ? p.commonMistakes : ["Ignoring border constraints", "Not handling null variables"],
    deploymentGuide: p.deploymentGuide || p.deployment || "Deploy locally on sandbox terminal console.",
    testingGuide: p.testingGuide || p.testingStrategy || p.testing || "Verify against unit cases.",
    gitBestPractices: p.gitBestPractices || p.gitHubBestPractices || "Commit clean, documented files.",
    extensions: extList,
    milestones: p.milestones || p.roadmap || "Milestone 1: Prototype core features (2 Hours)\nMilestone 2: Finalize test coverage & debug (1 Hour)\nMilestone 3: Write deployment pipeline (1 Hour)",
    resumeDesc: p.resumeDesc || `Engineered a production-ready ${p.title || 'module'} in Python/JavaScript. Built standard libraries integration, designed clean error interfaces, and drafted continuous testing suites.`,
    githubStructure: p.githubStructure || `github.com/username/${(p.title || 'project').toLowerCase().replace(/[^a-z0-9]/g, '-')}\n├── README.md\n├── src/\n│   └── main.py\n└── tests/\n    └── test_main.py`,
    expectedOutputs: p.expectedOutputs || p.expectedOutput || `$ run-system\n[INFO] Starting execution for ${p.title || 'module'}...\n[SUCCESS] Loaded configurations.\n[DEBUG] Running execution loops.\n[SUCCESS] Execution finished successfully (0 errors).`
  };
};

// ---------------------------------------------------------
// 🎓 MAIN PLAYGROUND COMPONENT
// ---------------------------------------------------------
export default function PlaygroundPage({ curriculumData, onRefresh }) {
  const { authFetch, user, logout } = useAuth();
  const { day } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const dayNum = parseInt(day);
  const item = curriculumData[dayNum];
  
  const theory = { ...THEORY_DATA[dayNum], ...getTheoryChapter(dayNum) };
  const interactiveData = {
    ...INTERACTIVE_CS_DATA[dayNum],
    quizzes: getQuizzesForDay(dayNum),
    practice: getPracticeProblems(dayNum),
    interview: getInterviewQuestions(dayNum)
  };

  const projectParam = searchParams.get('project');
  let activeProject = null;
  if (projectParam) {
    let rawProj = getAllProjectsForDay(dayNum).find(p => p.projectId === projectParam);
    if (!rawProj) {
      rawProj = PROJECT_HUB_DATABASE.find(p => p.projectId === projectParam);
    }
    if (!rawProj) {
      rawProj = MINI_PROJECTS.find(p => p.id === projectParam);
    }
    if (rawProj) {
      activeProject = normalizeProject(rawProj);
    }
  }
  const explanationData = getCompleteExplanation(dayNum);

  const [checkedTasks, setCheckedTasks] = useState(() => {
    if (!activeProject) return {};
    const saved = localStorage.getItem(`project_tasks_${activeProject.projectId}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (activeProject) {
      const saved = localStorage.getItem(`project_tasks_${activeProject.projectId}`);
      setCheckedTasks(saved ? JSON.parse(saved) : {});
    }
  }, [activeProject]);

  const handleToggleTask = (taskIdx) => {
    if (!activeProject) return;
    setCheckedTasks(prev => {
      const next = { ...prev, [taskIdx]: !prev[taskIdx] };
      localStorage.setItem(`project_tasks_${activeProject.projectId}`, JSON.stringify(next));
      return next;
    });
  };

  // Global user XP and stats stored in localStorage
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('user_xp') || '0'));
  
  const handleAddXP = (amount) => {
    setXp(prev => {
      const next = prev + amount;
      localStorage.setItem('user_xp', next.toString());
      return next;
    });
  };

  const [tabValue, setTabValue] = useState(0);
  const [exampleLang, setExampleLang] = useState('python');
  const [lang, setLang] = useState('python');
  const [codeText, setCodeText] = useState('');

  const saveAndSetCode = (newCode) => {
    setCodeText(newCode);
    if (dayNum !== undefined && !isNaN(dayNum)) {
      const storageKey = activeProject
        ? `project_${user?.email || 'anon'}_${activeProject.projectId}_${lang}`
        : (user?.email ? `code_${user.email}_day_${dayNum}_${lang}` : `code_anon_day_${dayNum}_${lang}`);
      localStorage.setItem(storageKey, newCode);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = codeText.substring(0, selectionStart) + '    ' + codeText.substring(selectionEnd);
      saveAndSetCode(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
      }, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const textUpToCursor = codeText.substring(0, selectionStart);
      const lastNewLine = textUpToCursor.lastIndexOf('\n');
      const currentLine = textUpToCursor.substring(lastNewLine + 1);
      const match = currentLine.match(/^([ \t]*)/);
      let indentation = match ? match[1] : '';
      if (currentLine.trim().endsWith(':')) {
        indentation += '    ';
      }
      const newValue = codeText.substring(0, selectionStart) + '\n' + indentation + codeText.substring(selectionEnd);
      saveAndSetCode(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1 + indentation.length;
      }, 0);
    }
  };
  
  const [terminalOutput, setTerminalOutput] = useState('Ready to execute script...');
  const [exitCode, setExitCode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lintError, setLintError] = useState(null);
  const [tasksOpen, setTasksOpen] = useState(false);

  useEffect(() => {
    if (dayNum !== undefined && !isNaN(dayNum)) {
      const storageKey = activeProject
        ? `project_${user?.email || 'anon'}_${activeProject.projectId}_${lang}`
        : (user?.email ? `code_${user.email}_day_${dayNum}_${lang}` : `code_anon_day_${dayNum}_${lang}`);
      const savedCode = localStorage.getItem(storageKey);
      if (savedCode !== null) {
        setCodeText(savedCode);
      } else {
        const template = activeProject 
          ? (activeProject.implementationGuide[0]?.code || '') 
          : (TEMPLATES[lang]?.[dayNum] || '');
        setCodeText(template);
      }
      setTerminalOutput(activeProject ? `Project Workspace Loaded: ${activeProject.title}` : 'Ready to execute playground sandbox...');
      setExitCode(null);
    }
  }, [dayNum, lang, user?.email, activeProject]);

  useEffect(() => {
    if (activeProject) {
      setTabValue(6);
    } else {
      setTabValue(0);
    }
  }, [activeProject]);

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
          setLintError({ message: err.message, line: null });
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
              setLintError({ message: err.message, line: err.line });
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

  const completedCount = Object.entries(curriculumData).filter(([day, item]) => day !== '0' && day !== 0 && item.completed).length;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleResetTemplate = () => {
    const template = activeProject 
      ? (activeProject.implementationGuide[0]?.code || '') 
      : (TEMPLATES[lang]?.[dayNum] || '');
    saveAndSetCode(template);
    setTerminalOutput(activeProject ? 'Project starter code reset!' : 'Template reset. Ready to run!');
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
          if (data.exit_code === 0) {
            handleAddXP(50); // XP for compiling code successfully!
          }
          onRefresh();
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
            try { return JSON.stringify(arg, null, 2); } catch { return String(arg); }
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
        handleAddXP(50);
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

  useEffect(() => {
    if (curriculumData && Object.keys(curriculumData).length > 0 && !item) {
      navigate('/', { replace: true });
    }
  }, [curriculumData, item, navigate]);

  if (!item) {
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

  // Split template code lines to power the Line-by-Line Code Explainer
  const codeLines = codeText ? codeText.split('\n') : [];

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
          '@media print': { display: 'none' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <LogoIcon sx={{ fontSize: '1.8rem', color: '#10b981' }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              CSForge
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, fontSize: '0.68rem', letterSpacing: 0.5 }}>
              FORGE YOUR CS CAREER
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button onClick={() => navigate('/')} startIcon={<HomeIcon />} sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.82rem', color: 'text.secondary' }}>Home</Button>
          <Button onClick={() => navigate('/?scroll=modules')} startIcon={<ModulesIcon />} sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.82rem', color: 'text.secondary' }}>Core Modules</Button>
          <Button onClick={() => navigate(`/playground/${dayNum}`)} startIcon={<CodeIcon />} sx={{ textTransform: 'none', fontWeight: 750, fontSize: '0.82rem', color: 'primary.main', backgroundColor: 'rgba(15,23,42,0.04)' }}>Practice Coding</Button>
          <Button onClick={() => setTasksOpen(true)} startIcon={<TasksIcon />} sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.82rem', color: 'success.main', backgroundColor: 'rgba(16, 185, 129, 0.06)' }}>Daily Tasks</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Gamified XP Pill */}
          <Chip label={`🏆 ${xp} XP`} variant="outlined" color="primary" sx={{ fontWeight: 800, fontSize: '0.78rem' }} />
          {user && (
            <Tooltip title={`Signed in as: ${user.email}`} arrow>
              <Avatar sx={{ width: 38, height: 38, fontSize: '0.9rem', fontWeight: 700, bgcolor: 'primary.main', color: '#ffffff' }}>
                {avatarLetter}
              </Avatar>
            </Tooltip>
          )}
          <IconButton onClick={logout} sx={{ border: '1px solid rgba(239, 68, 68, 0.15)', color: 'error.main' }}>
            <LogoutIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
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
          backgroundColor: '#ffffff',
          '@media print': { display: 'none' }
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
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>Workspace File:</Typography>
          <Box component="code" sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', backgroundColor: 'rgba(15, 23, 42, 0.04)', px: 1.8, py: 0.6, borderRadius: 2, color: 'primary.main' }}>
            {item.path}
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleToggleProgress(dayNum, !item.completed)}
            color={item.completed ? "success" : "inherit"}
            sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.72rem', borderRadius: 2.5, px: 1.8 }}
          >
            {item.completed ? "✓ Done" : "Mark Done"}
          </Button>
        </Box>
      </Box>

      {/* ==========================================
         MAIN WORKSPACE: ALWAYS UNIFIED SPLIT SANDBOX
         ========================================== */}
      <Box sx={{ display: 'flex', flexGrow: 1, minHeight: 0, p: 3, gap: 4, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: THEMATIC DETAILS & INTERACTIVE WIDGETS */}
        <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(15, 23, 42, 0.08)', flexShrink: 0, '@media print': { display: 'none' } }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="premium features tabs">
              <Tab label="📚 Theory & Concept" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.78rem' }} />
              <Tab label="🎨 Visual Simulator" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.78rem' }} />
              <Tab label="🛠️ Specs & Explainer" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.78rem' }} />
              <Tab label="🧠 Quiz & Cards" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.78rem' }} />
              <Tab label="🎯 Placement Prep" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.78rem' }} />
              <Tab label="📝 Notes & AI Tutor" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.78rem' }} />
              {activeProject && <Tab label="📁 Project Workspace" sx={{ textTransform: 'none', fontWeight: 800, color: 'success.main', fontSize: '0.78rem' }} />}
            </Tabs>
          </Box>

          {/* Tab 0: Concept Theory */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              {/* Header block */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: 'primary.main' }}>
                  {theory.title || item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {theory.definition || item.desc}
                </Typography>
              </Box>

              {/* History & Motivation cards */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      📜 Historical Background
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      {theory.history}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%', borderLeft: '3px solid #1976d2' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'primary.main' }}>
                      💡 Core Motivation
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      {theory.motivation}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Internal workings & Visual Diagram */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                  ⚙️ Internal Mechanics & Low-Level Processing
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', lineHeight: 1.6, mb: 2 }}>
                  {theory.internalWorking}
                </Typography>
                
                {theory.visualDiagram && (
                  <Box sx={{ p: 2.5, backgroundColor: '#020617', borderRadius: 3, border: '1px solid rgba(15, 23, 42, 0.08)', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.72rem', whiteSpace: 'pre-wrap', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1, fontWeight: 700 }}>
                      SYSTEM FLOW DIAGRAM:
                    </Typography>
                    {theory.visualDiagram}
                  </Box>
                )}

                {theory.animations && (
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: 'rgba(25, 118, 210, 0.03)', border: '1px dashed rgba(25, 118, 210, 0.2)', borderRadius: 3 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                      🎬 Dynamic Animation Description
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      {theory.animations}
                    </Typography>
                  </Paper>
                )}
              </Box>

              {/* Pros & Cons */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main', mb: 1.5 }}>
                        ✓ Primary Advantages
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {(theory.advantages || ["Highly optimized access", "Predictable execution patterns"]).map((adv, idx) => (
                          <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.8 }}>{adv}</Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'error.main', mb: 1.5 }}>
                        ✗ Disadvantages & Constraints
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {(theory.disadvantages || ["Requires upfront resource limits config", "High copy cost during expansion transitions"]).map((dis, idx) => (
                          <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.8 }}>{dis}</Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Industry Applications & Comparisons */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                  🌐 Industry Application & Real-World Use
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', mb: 2 }}>
                  Used in production environments by leading platforms: <strong>{theory.industryExamples?.join(", ") || "Google, Amazon, Meta"}</strong>.
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {(theory.realWorldApplications || ["High capacity web routers", "Operating system context registers"]).map((app, idx) => (
                    <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{app}</Box>
                  ))}
                </Box>
              </Box>

              {interactiveData.comparison && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    🔀 Comparison Table: {interactiveData.comparison.title}
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow sx={{ backgroundColor: 'rgba(15, 23, 42, 0.03)' }}>
                          {interactiveData.comparison.headers.map((h, idx) => (
                            <TableCell key={idx} sx={{ fontWeight: 800, fontSize: '0.75rem', py: 1 }}>{h}</TableCell>
                          ))}
                        </TableRow>
                        {interactiveData.comparison.rows.map((row, rIdx) => (
                          <TableRow key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <TableCell key={cIdx} sx={{ fontSize: '0.74rem', py: 1, fontWeight: cIdx === 0 ? 700 : 500 }}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Best Practices & Common Mistakes */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: 'rgba(16, 185, 129, 0.01)', borderColor: 'rgba(16, 185, 129, 0.15)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main', mb: 1 }}>
                      🛡️ Best Practices
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {(theory.bestPractices || ["Always check memory indexes boundaries.", "Close resources in finally blocks."]).map((p, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{p}</Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: 'rgba(239, 68, 68, 0.01)', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'error.main', mb: 1 }}>
                      ⚠️ Common Pitfalls
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {(theory.commonMistakes || ["Forgetting bounds validations.", "Creating memory leak references."]).map((pit, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{pit}</Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* FAQs */}
              {theory.faqs && theory.faqs.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    ❓ Frequently Asked Questions (FAQ)
                  </Typography>
                  {theory.faqs.map((faq, idx) => (
                    <Paper key={idx} variant="outlined" sx={{ p: 2, mb: 1.5, borderRadius: 2.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
                        Q: {faq.q}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.5 }}>
                        A: {faq.a}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}

              {/* Revision Notes */}
              {theory.revisionNotes && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    📝 Revision & Chapter Notes
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {theory.revisionNotes.map((note, idx) => (
                      <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.8, lineHeight: 1.5 }}>{note}</Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Tab 1: Interactive Visualizer & Simulator */}
          <TabPanel value={tabValue} index={1}>
            <InteractiveVisualizer dayNum={dayNum} data={interactiveData} />
          </TabPanel>

          {/* Tab 2: Complete Program Explanation */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              {/* Objective & Problem Statement */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main', mb: 1.5 }}>
                  🔍 Complete Program Walkthrough
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <strong>Objective:</strong> {explanationData.objective}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.6, mt: 1 }}>
                  <strong>Problem Statement:</strong> {explanationData.problem}
                </Typography>
              </Box>

              {/* Motivation & Real-world examples */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, height: '100%', backgroundColor: 'rgba(25, 118, 210, 0.01)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                      ❓ Why this problem exists
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                      {explanationData.whyExists}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, height: '100%', backgroundColor: 'rgba(16, 185, 129, 0.01)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                      🌐 Real-world application
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                      {explanationData.realWorld}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Algorithm & Pseudo Code */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                    ⚙️ Algorithm Steps
                  </Typography>
                  <Box component="ol" sx={{ pl: 2, mb: 2 }}>
                    {explanationData.algorithm.map((step, idx) => (
                      <Box component="li" key={idx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.5 }}>{step}</Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                    📝 Pseudo Code Blueprint
                  </Typography>
                  <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', borderRadius: 3, color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.74rem', overflowX: 'auto' }}>
                    {explanationData.pseudoCode}
                  </Box>
                </Grid>
              </Grid>

              {/* Complete Code Walkthrough */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                  📖 Code Walkthrough & Implementation Details
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.5 }}>
                  {explanationData.stepByStep}
                </Typography>
              </Box>

              {/* Execution Trace Diagram */}
              {explanationData.executionDiagram && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                    📊 Execution Trace Visual Diagram
                  </Typography>
                  <Box sx={{ p: 2, backgroundColor: '#020617', borderRadius: 3, color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.72rem', whiteSpace: 'pre' }}>
                    {explanationData.executionDiagram}
                  </Box>
                </Box>
              )}

              {/* Dry Run & Variable State Table */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                  📊 Variable State Table & Dry Run Trace
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2.5, mb: 2 }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow sx={{ backgroundColor: 'rgba(15, 23, 42, 0.03)' }}>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem' }}>Variable</TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem' }}>Value State</TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem' }}>Role</TableCell>
                      </TableRow>
                      {explanationData.variables.map((v, idx) => (
                        <TableRow key={idx}>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700 }}>{v.name}</TableCell>
                          <TableCell sx={{ fontSize: '0.72rem', color: 'primary.main' }}>{v.type}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem' }}>{v.value}</TableCell>
                          <TableCell sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{v.desc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'rgba(15, 23, 42, 0.01)', borderRadius: 2.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 0.5, color: 'text.primary' }}>
                    Iteration Trace Notes:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {explanationData.dryRun.map((trace, idx) => (
                      <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{trace}</Box>
                    ))}
                  </Box>
                </Paper>
              </Box>

              {/* Memory Layout Stack / Heap */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                  🧠 Memory Visualizer (Stack & Heap Allocation)
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'rgba(15, 23, 42, 0.01)', borderRadius: 2.5, fontFamily: 'monospace', fontSize: '0.78rem' }}>
                  {explanationData.memoryMap}
                </Paper>
              </Box>

              {/* Sample Inputs & Outputs */}
              {explanationData.inputOutput && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                      📥 Sample Inputs
                    </Typography>
                    <Box component="pre" sx={{ p: 2, backgroundColor: '#0f172a', color: '#38bdf8', borderRadius: 2.5, fontSize: '0.74rem', fontFamily: 'monospace' }}>
                      {explanationData.inputOutput.input}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                      📤 Sample Outputs
                    </Typography>
                    <Box component="pre" sx={{ p: 2, backgroundColor: '#0f172a', color: '#10b981', borderRadius: 2.5, fontSize: '0.74rem', fontFamily: 'monospace' }}>
                      {explanationData.inputOutput.output}
                    </Box>
                  </Grid>
                </Grid>
              )}

              {/* 10 Test Cases */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                  🧪 Comprehensive Test Cases Suite (10 Target Cases)
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2.5 }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow sx={{ backgroundColor: 'rgba(15, 23, 42, 0.03)' }}>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', width: '8%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', width: '18%' }}>Test Category</TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', width: '37%' }}>Sample Input Value</TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', width: '37%' }}>Expected Output State</TableCell>
                      </TableRow>
                      {explanationData.testCases.map((tc) => (
                        <TableRow key={tc.id}>
                          <TableCell sx={{ fontSize: '0.72rem', fontWeight: 700 }}>#{tc.id}</TableCell>
                          <TableCell sx={{ fontSize: '0.72rem', color: tc.type === 'Edge Case' ? 'error.main' : 'primary.main', fontWeight: 600 }}>{tc.type}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem' }}>{tc.input}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'success.main' }}>{tc.expected}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Edge Cases & Complexity */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(239, 68, 68, 0.15)', height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'error.main', mb: 1 }}>
                        ⚠️ Edge Cases & Pitfalls
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {explanationData.edgeCases.map((ec, idx) => (
                          <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{ec}</Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(16, 185, 129, 0.15)', height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main', mb: 1 }}>
                        ⚡ Optimizations & Complexities
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
                        Time Complexity: <strong>{explanationData.timeComplexity}</strong><br />
                        Space Complexity: <strong>{explanationData.spaceComplexity}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary', fontStyle: 'italic' }}>
                        {explanationData.optimizations}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Alternative Solutions & Caching */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                  🔄 Alternative Solutions & Trade-offs
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'rgba(15, 23, 42, 0.01)', borderRadius: 2.5 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.5 }}>
                    {explanationData.alternatives}
                  </Typography>
                </Paper>
              </Box>

              {/* Interview Discussion & Key takeaways */}
              <Box>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderLeft: '4px solid #10b981' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: 'success.main' }}>
                    💼 Interview Board discussion
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.5, mb: 2 }}>
                    {explanationData.interview}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>
                    🔑 Key Takeaways:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {explanationData.takeaways.map((take, idx) => (
                      <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{take}</Box>
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Box>
          </TabPanel>

          {/* Tab 3: Active Recall Quizzes & Flashcards */}
          <TabPanel value={tabValue} index={3}>
            <InteractiveQuiz quizzes={interactiveData.quizzes} onAddXP={handleAddXP} />
            <Flashcards cards={interactiveData.flashcards} />
          </TabPanel>

          {/* Tab 4: Placement Prep & Cheat Sheet */}
          <TabPanel value={tabValue} index={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              {/* Interview Prep Questions Accordions */}
              {interactiveData.interview && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    🎙️ FAANG Interview Preparation (15 Target Questions)
                  </Typography>
                  {interactiveData.interview.map((item, idx) => (
                    <Accordion key={idx} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', mb: 1.5, '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexWrap: 'wrap', gap: 1.2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                            Q{idx+1}: {item.q}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Chip label={item.difficulty} size="small" color={item.difficulty === 'Easy' ? 'success' : (item.difficulty === 'Medium' ? 'warning' : 'error')} variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
                            <Chip label={item.type} size="small" color="secondary" variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ borderTop: '1px solid rgba(15,23,42,0.06)', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {(() => {
                          const details = getEnrichedAnswerDetails(item.q, item.a || item.answer || item.expectedAnswer);
                          return (
                            <>
                              <Box sx={{ p: 2, backgroundColor: 'rgba(15, 23, 42, 0.02)', borderRadius: 2.5, borderLeft: '3px solid #1976d2' }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 0.5, color: 'primary.main' }}>
                                  🎯 Expected Answer (Definition & Explanation):
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.primary', lineHeight: 1.5, fontWeight: 700, mb: 0.5 }}>
                                  {details.definition}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                                  {details.explanation}
                                </Typography>
                              </Box>

                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    🌐 Real-world Example:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                                    {details.realWorld}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    🎙️ Best Interview Response Strategy:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                                    {details.bestResponse}
                                  </Typography>
                                </Grid>
                              </Grid>

                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.main', display: 'block', mb: 0.5 }}>
                                    🔑 Important Keywords:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'success.main', fontWeight: 600 }}>
                                    {details.keywords}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'warning.main', display: 'block', mb: 0.5 }}>
                                    💡 Interview Tip:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'warning.main', fontStyle: 'italic' }}>
                                    {details.tip}
                                  </Typography>
                                </Grid>
                              </Grid>

                              {details.complexity && (
                                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                                  {details.complexity}
                                </Typography>
                              )}

                              {details.codeExample && (
                                <Box>
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    💻 Code Example:
                                  </Typography>
                                  <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', color: '#a5b4fc', borderRadius: 2, fontSize: '0.74rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                                    {details.codeExample}
                                  </Box>
                                </Box>
                              )}
                            </>
                          );
                        })()}
                        {item.companyTags && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', mt: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mr: 1 }}>Target Companies:</Typography>
                            {item.companyTags.map((comp, cIdx) => (
                              <Chip key={cIdx} label={comp} size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
                            ))}
                          </Box>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              {/* Related Coding Practice Problems */}
              {interactiveData.practice && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                    🎯 Related Coding Practice Problems (O(1) Try Directly in Sandbox!)
                  </Typography>
                  {interactiveData.practice.map((prob, idx) => (
                    <CodingProblemItem 
                      key={idx} 
                      item={prob} 
                      onTrySolution={(code) => {
                        saveAndSetCode(code);
                        setTerminalOutput("Loaded coding solution into editor window. Modify or run tests!");
                      }} 
                    />
                  ))}
                </Box>
              )}

              {/* Revision Cheat Sheet */}
              {interactiveData.cheatsheet && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
                    📄 5-Minute Concept Cheat Sheet
                  </Typography>
                  <Paper sx={{ p: 2.5, backgroundColor: 'rgba(15, 23, 42, 0.01)', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                      Summary: {interactiveData.cheatsheet.summary}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      {interactiveData.cheatsheet.tips.map((tip, tIdx) => (
                        <Box component="li" key={tIdx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{tip}</Box>
                      ))}
                    </Box>
                    <Box component="pre" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', p: 1.5, backgroundColor: '#020617', color: '#a5b4fc', borderRadius: 2 }}>
                      {interactiveData.cheatsheet.syntax}
                    </Box>
                  </Paper>
                </Box>
              )}

              {/* Certificate view if Day 30 complete */}
              {completedCount === 30 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main', mb: 2 }}>
                    🏆 Unlock Completion Certificate
                  </Typography>
                  <CertificateGenerator stats={{ score: completedCount }} userEmail={user?.email} />
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Tab 5: Notes & AI Study Tutor */}
          <TabPanel value={tabValue} index={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <NotesSection day={dayNum} />
              <AITutorWidget dayNum={dayNum} title={item.title} />
            </Box>
          </TabPanel>

          {/* Tab 6: 📁 Project Workspace */}
          {activeProject && (
            <TabPanel value={tabValue} index={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                {/* Project Header */}
                <Box sx={{ borderBottom: '2px solid rgba(16, 185, 129, 0.2)', pb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'success.main' }}>
                      📁 Project Workbench: {activeProject.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={activeProject.difficulty} color="success" size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                      <Chip label={activeProject.estimatedTime} color="primary" size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.84rem' }}>
                    {activeProject.description}
                  </Typography>
                </Box>

                {/* Goals & Objectives */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                    🎯 Project Objectives & Core Requirements
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 1.5 }}>
                    Your primary objective is: <strong>{activeProject.objective}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 750, color: 'text.primary', display: 'block', mb: 0.8 }}>
                    Core Concepts Exercised:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {activeProject.coreConcepts.map((concept, idx) => (
                      <Chip key={idx} label={concept} size="small" variant="outlined" sx={{ fontSize: '0.68rem', height: 22 }} />
                    ))}
                  </Box>
                </Box>

                {/* Folder Structure blueprint */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    📂 Folder Structure & Architectural Blueprint
                  </Typography>
                  <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.74rem', borderRadius: 3, overflowX: 'auto', border: '1px solid rgba(15,23,42,0.08)' }}>
                    {activeProject.folderStructure}
                  </Box>
                </Box>

                {/* Architecture & DB schema */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}>
                        ⚙️ System Architecture
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {activeProject.systemArchitecture}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: 'secondary.main' }}>
                        🗄️ Database Design Schema
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {activeProject.databaseDesign}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Step-by-Step Task Checklist */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    📝 Implementation Checklist & Step-by-Step Guide
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                    {activeProject.implementationGuide.map((step, idx) => (
                      <Paper 
                        key={idx} 
                        variant="outlined" 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2.5, 
                          backgroundColor: checkedTasks[idx] ? 'rgba(16, 185, 129, 0.02)' : 'transparent',
                          borderColor: checkedTasks[idx] ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15,23,42,0.08)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                          <Checkbox 
                            size="small" 
                            checked={!!checkedTasks[idx]} 
                            onChange={() => handleToggleTask(idx)}
                            sx={{ p: 0.2, color: 'success.main', '&.Mui-checked': { color: 'success.main' } }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 800, fontSize: '0.8rem', textDecoration: checkedTasks[idx] ? 'line-through' : 'none', color: checkedTasks[idx] ? 'text.disabled' : 'text.primary', mb: 0.5 }}>
                              Task {idx + 1}: {step.task}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontSize: '0.74rem' }}>
                              {step.instruction}
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                saveAndSetCode(step.code);
                                setTerminalOutput(`Loaded template code for Task ${idx+1} in editor window.`);
                              }}
                              sx={{ textTransform: 'none', fontSize: '0.66rem', py: 0.2, px: 1, borderRadius: 1.5 }}
                            >
                              Load Task Template
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </Box>

                {/* System Flowchart */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    📐 Architectural Data Flow
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2, backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: 3, border: '1px solid rgba(0,0,0,0.04)' }}>
                    {activeProject.systemArchitecture.split(/ -> |->/).map((step, idx, arr) => (
                      <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ p: 1.5, px: 3, backgroundColor: 'background.paper', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', maxWidth: 400, width: '100%' }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block' }}>Step {idx + 1}</Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.primary', fontWeight: 600 }}>{step.trim()}</Typography>
                        </Box>
                        {idx < arr.length - 1 && (
                          <Typography variant="body2" sx={{ color: 'text.disabled', my: 0.5, fontWeight: 900 }}>
                            ↓
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Expected Console Outputs */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    🖥️ Expected Console / Execution Output
                  </Typography>
                  <Box component="pre" sx={{ p: 2.5, backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'monospace', fontSize: '0.76rem', borderRadius: 3, overflowX: 'auto', border: '1px solid rgba(15,23,42,0.1)' }}>
                    {activeProject.expectedOutputs}
                  </Box>
                </Box>

                {/* Milestones & Roadmap Stepper */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
                    📅 Project Milestones & Timeline Roadmap
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2, borderLeft: '2px solid rgba(0,0,0,0.06)' }}>
                    {activeProject.milestones.split('\n').map((m, idx) => (
                      <Box key={idx} sx={{ position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: -22, top: 4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'success.main' }} />
                        <Typography variant="body2" sx={{ fontWeight: 800, fontSize: '0.8rem', color: 'text.primary' }}>
                          {m.split(':')[0] || `Milestone ${idx+1}`}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.2 }}>
                          {m.split(':').slice(1).join(':').trim() || m}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Integration Testing Checklist */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    🧪 Integration & End-to-End Testing Checklist
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: 'rgba(239, 68, 68, 0.01)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5, mb: 2 }}>
                      {activeProject.testingGuide}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[
                        "Verify server boots up and binds successfully to local socket port.",
                        "Simulate connection drops and verify socket handler reconnects cleanly.",
                        "Check that buffer boundaries are checked and don't lead to out of bounds errors.",
                        "Run concurrent test scripts asserting data packet structure matches expected values."
                      ].map((t, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'error.main' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Box>

                {/* Portfolio Mapping & Resume Integration */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    💼 Portfolio & Resume Integration Guide
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, borderLeft: '4px solid #3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.01)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'info.main', mb: 1 }}>
                      How to present this project on your Resume:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', fontStyle: 'italic', mb: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2, border: '1px solid rgba(0,0,0,0.05)' }}>
                      "{activeProject.resumeDesc}"
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 0.5 }}>
                      Recommended GitHub Repository Layout:
                    </Typography>
                    <Box component="pre" sx={{ p: 2, backgroundColor: '#1e293b', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.7rem', borderRadius: 2, overflowX: 'auto', mb: 2 }}>
                      {activeProject.githubStructure}
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                      Tip: When talking to recruiters, emphasize the trade-offs you made (e.g. why you chose a slide window token bucket vs Leaky bucket) and the exact tests you wrote to prove performance.
                    </Typography>
                  </Paper>
                </Box>

                {/* UI Mockup & Extensions */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                    📱 User Interface Mockup & Layout Specs
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2.5, backgroundColor: 'rgba(15, 23, 42, 0.01)', borderRadius: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {activeProject.uiMockup}
                    </Typography>
                  </Paper>
                </Box>

                {/* Common Mistakes & Deployment */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderLeft: '4px solid #ef4444', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'error.main', mb: 1 }}>
                        ⚠️ Common Mistakes to Avoid
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {activeProject.commonMistakes.map((mistake, idx) => (
                          <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{mistake}</Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderLeft: '4px solid #10b981', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main', mb: 1 }}>
                        🚀 Deployment Instructions
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {activeProject.deploymentGuide}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Testing & Git Practices */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                        🧪 Testing Strategy
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {activeProject.testingGuide}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                        🌿 Git & Team workflow best practices
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {activeProject.gitBestPractices}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Extensions / Bonus */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                    🚀 Extension Ideas & Bonus Challenges
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {activeProject.extensions.map((ext, idx) => (
                      <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>{ext}</Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          )}
        </Box>

        {/* RIGHT COLUMN: INTERACTIVE CODE SANDBOX */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, borderLeft: '1px solid rgba(15, 23, 42, 0.08)', pl: 4, overflow: 'hidden', '@media print': { display: 'none' } }}>
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
            onChange={(e) => saveAndSetCode(e.target.value)}
            onKeyDown={handleKeyDown}
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
            '&::-webkit-scrollbar': { width: 5 },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(15, 23, 42, 0.06)', borderRadius: 3 }
          }}
        >
          <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Object.entries(curriculumData)
              .filter(([day]) => day !== '0' && day !== 0)
              .map(([day, task]) => {
                const dayNumItem = parseInt(day);
                const isDone = task.completed;
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleProgress(dayNumItem, !isDone);
                            }}
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
