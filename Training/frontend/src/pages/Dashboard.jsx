import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ColorModeContext } from '../context/ColorModeContext';

import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Divider,
  Paper,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Popover,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  TextField
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Home as HomeIcon,
  MenuBook as ModulesIcon,
  Code as CodeIcon,
  PlaylistAddCheck as TasksIcon,
  CheckCircle as CheckedIcon,
  RadioButtonUnchecked as UncheckedIcon,
  ArrowForward as ArrowForwardIcon,
  RocketLaunch as LogoIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Notifications as BellIcon,
  EmojiEvents as TrophyIcon,
  Search as SearchIcon,
  LocalFireDepartment as StreakIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Leaderboard as LeaderboardIcon,
  ExpandMore as ExpandMoreIcon,
  WorkspacePremium as PremiumIcon,
  AssignmentTurnedIn as ProjectIcon,
  Work as WorkIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import DashboardGrid from '../components/DashboardGrid';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS, getDayLearningPath } from '../utils/learningPaths';
import { ACHIEVEMENTS, checkUnlockedAchievements } from '../utils/achievementsData';
import { getAllProjectsForDay } from '../utils/projectsData';
import LockIcon from '@mui/icons-material/Lock';
import { INTERVIEW_HUB_QUESTIONS } from '../utils/interviewHubData';
import { COMPANY_PREP_DATA, FLASH_CARDS, REVISION_NOTES, STAR_GUIDE, TIPS_DATA } from '../utils/interviewPrepData';
import { PROJECT_HUB_DATABASE } from '../utils/projectHubData';
import { MINI_PROJECTS } from '../utils/miniProjectsData';

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

const MOBILE_MODULES = [
  { id: 'all', label: 'All Paths' },
  { id: 'path_1', label: '1. Foundations' },
  { id: 'path_3', label: '3. Data Structures' },
  { id: 'path_5', label: '5. OS Basics' },
  { id: 'path_7', label: '7. Databases' }
];

export default function Dashboard({ initialView = 'dashboard', curriculumData, activeFilter, onFilterChange, fetchStatus, loading }) {
  const navigate = useNavigate();
  const { user, logout, authFetch } = useAuth();
  const [searchParams] = useSearchParams();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  
  const mainContentRef = useRef(null);
  const modulesGridRef = useRef(null);
  
  const [tasksOpen, setTasksOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [leaderboardAnchor, setLeaderboardAnchor] = useState(null);

  // activeView: 'dashboard' | 'roadmap' | 'interview' | 'projects' | 'profile'
  const [activeView, setActiveView] = useState(initialView);
  useEffect(() => {
    setActiveView(initialView);
  }, [initialView]);
  const [intSearch, setIntSearch] = useState('');
  const [intType, setIntType] = useState('All');
  const [intDiff, setIntDiff] = useState('All');
  const [intComp, setIntComp] = useState('All');
  const [intTab, setIntTab] = useState(0);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [revealedFlashcards, setRevealedFlashcards] = useState([]);

  // Mock interview simulator states
  const [mockActive, setMockActive] = useState(false);
  const [mockQuestion, setMockQuestion] = useState(null);
  const [mockTimer, setMockTimer] = useState(0);
  const [mockUserAnswer, setMockUserAnswer] = useState('');
  const [mockFeedback, setMockFeedback] = useState(null);
  const [mockDiff, setMockDiff] = useState('Medium');
  const [mockScore, setMockScore] = useState(0);
  const [mockStep, setMockStep] = useState(0);

  const handleMockSubmit = () => {
    if (!mockQuestion) return;
    setMockActive(false);
    
    const userLower = mockUserAnswer.toLowerCase();
    const keywords = mockQuestion.relatedConcepts || [];
    let matchedCount = 0;
    
    keywords.forEach((word) => {
      if (userLower.includes(word.toLowerCase())) {
        matchedCount++;
      }
    });

    const scorePct = keywords.length > 0 ? (matchedCount / keywords.length) * 100 : 80;
    let computedScore = 5;
    if (scorePct >= 80) computedScore = 10;
    else if (scorePct >= 50) computedScore = 8;
    else if (scorePct >= 20) computedScore = 6;
    
    let feedback = "";
    if (computedScore >= 9) {
      feedback = "Outstanding response! You effectively covered core architectural trade-offs, scope constraints, and cited key terms. Your explanation shows deep technical maturity.";
    } else if (computedScore >= 7) {
      feedback = "Good response. You highlighted the main concepts, but you could expand more on the low-level memory implications or performance trade-offs.";
    } else {
      feedback = "Your answer was a bit brief. In actual interviews, try to structure your answer using the STAR method: describe a specific scenario, name the exact technical challenges, and detail your actions.";
    }

    setMockScore(computedScore);
    setMockFeedback(feedback);
    setMockStep(2);
  };

  const handleStartMock = () => {
    const pool = INTERVIEW_HUB_QUESTIONS.filter(q => q.difficulty === mockDiff);
    const selected = pool[Math.floor(Math.random() * pool.length)] || INTERVIEW_HUB_QUESTIONS[0];
    
    setMockQuestion(selected);
    setMockTimer(120);
    setMockUserAnswer('');
    setMockFeedback(null);
    setMockActive(true);
    setMockStep(1);
  };

  useEffect(() => {
    let interval = null;
    if (mockActive && mockTimer > 0) {
      interval = setInterval(() => {
        setMockTimer((prev) => prev - 1);
      }, 1000);
    } else if (mockActive && mockTimer === 0) {
      handleMockSubmit();
    }
    return () => clearInterval(interval);
  }, [mockActive, mockTimer, mockQuestion, mockUserAnswer]);

  const handleProfileOpen = (e) => setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);
  const handleLeaderboardOpen = (e) => setLeaderboardAnchor(e.currentTarget);
  const handleLeaderboardClose = () => setLeaderboardAnchor(null);

  // Compute Streak
  const getStreak = () => {
    if (!curriculumData) return 0;
    let streak = 0;
    for (let d = 1; d <= 30; d++) {
      if (curriculumData[d]?.completed) streak++;
      else break;
    }
    return streak;
  };
  const streakCount = getStreak();

  // Scan for the next uncompleted day
  const getNextUncompletedDay = () => {
    if (!curriculumData) return null;
    for (let d = 1; d <= 30; d++) {
      if (curriculumData[d] && !curriculumData[d].completed) {
        return { dayNum: d, ...curriculumData[d] };
      }
    }
    return null;
  };
  const nextDay = getNextUncompletedDay();

  // Fetch status on mount
  useEffect(() => {
    if (searchParams.get('scroll') === 'modules') {
      setTimeout(() => {
        modulesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  }, [searchParams]);

  // Compute total and completed counts
  const totalCount = Object.keys(curriculumData).filter(day => day !== '0' && day !== 0).length;
  const completedCount = Object.entries(curriculumData).filter(([day, item]) => day !== '0' && day !== 0 && item.completed).length;
  const remainingDays = totalCount - completedCount;

  // Custom levels based on completedCount
  const getLevel = () => {
    if (completedCount >= 30) return { num: 5, title: "SaaS Graduate Engineer" };
    if (completedCount >= 20) return { num: 4, title: "System Architect" };
    if (completedCount >= 10) return { num: 3, title: "DSA Expert Scholar" };
    if (completedCount >= 2) return { num: 2, title: "Syntax Explorer" };
    return { num: 1, title: "CS Initiate" };
  };
  const userLevel = getLevel();

  // Saved XP
  const xpPoints = completedCount * 100 + (completedCount >= 30 ? 500 : 0);

  const handleToggleProgress = (dayNum, isCompleted) => {
    authFetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day: dayNum, completed: isCompleted })
    })
      .then((res) => {
        if (!res.ok) throw new Error('API failed to toggle progress');
        return res.json();
      })
      .then(() => {
        fetchStatus();
      })
      .catch((err) => {
        console.error('Error toggling progress:', err);
      });
  };

  const handleCardClick = (day) => {
    navigate(`/playground/${day}`);
  };

  const handleHomeClick = () => {
    setActiveView('dashboard');
    onFilterChange('all');
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeClick = () => {
    let targetDay = 1;
    for (let d = 1; d <= 30; d++) {
      if (curriculumData[d] && !curriculumData[d].completed) {
        targetDay = d;
        break;
      }
    }
    navigate(`/playground/${targetDay}`);
  };

  const avatarLetter = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  // ---------------------------------------------------------
  // 🗺️ VIEW 2: INTERACTIVE ROADMAP COMPONENT
  // ---------------------------------------------------------
  const renderRoadmapView = () => {
    return (
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 3.5, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Box sx={{ borderBottom: '1px solid rgba(15,23,42,0.06)', pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 1 }}>
            🗺️ Interactive CS Curriculum Roadmap
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Click any path node to filter content and jump directly to active study cards.
          </Typography>
        </Box>

        {/* Node Graph Map */}
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, backgroundColor: 'rgba(15,23,42,0.01)', borderRadius: 4, border: '1px dashed rgba(15,23,42,0.1)' }}>
          {LEARNING_PATHS.map((path, idx) => {
            const isCompleted = Object.entries(curriculumData)
              .filter(([day]) => day !== '0' && day !== 0 && getDayLearningPath(day) === path.id)
              .every(([_, item]) => item.completed);
              
            return (
              <React.Fragment key={path.id}>
                <Paper
                  onClick={() => {
                    onFilterChange(path.id);
                    setActiveView('dashboard');
                  }}
                  sx={{
                    p: 2.5,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: isCompleted ? 'success.main' : 'rgba(15, 23, 42, 0.08)',
                    background: isCompleted ? 'rgba(16, 185, 129, 0.03)' : '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.05)'
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                    {idx + 1}. {path.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1 }}>
                    {path.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Chip label={path.difficulty} size="small" variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
                    <Chip label={isCompleted ? "Completed ✓" : "In Progress"} size="small" color={isCompleted ? "success" : "default"} sx={{ fontSize: '0.62rem', height: 18 }} />
                  </Box>
                </Paper>
                {idx < LEARNING_PATHS.length - 1 && (
                  <Box sx={{ width: 2, height: 24, backgroundColor: 'rgba(15,23,42,0.1)' }} />
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    );
  };

  // ---------------------------------------------------------
  // 🎙️ VIEW 3: INTERVIEW HUB COMPONENT
  // ---------------------------------------------------------
  const renderInterviewHubView = () => {
    // Filter questions based on active path (activeFilter), search query, difficulty, type, and company
    const filteredQuestions = INTERVIEW_HUB_QUESTIONS.filter((item) => {
      // 1. Path check (Disabled to show all questions by default in the interview hub)
      // if (activeFilter !== "all" && item.path !== activeFilter) return false;

      // 2. Search check
      if (intSearch.trim()) {
        const query = intSearch.toLowerCase();
        const matchQ = item.q.toLowerCase().includes(query);
        const matchAns = item.answer.toLowerCase().includes(query);
        const matchConcepts = item.relatedConcepts.some(c => c.toLowerCase().includes(query));
        if (!matchQ && !matchAns && !matchConcepts) return false;
      }

      // 3. Difficulty check
      if (intDiff !== "All" && item.difficulty !== intDiff) return false;

      // 4. Type check
      if (intType !== "All" && item.type !== intType && item.topic !== intType) return false;

      // 5. Company check
      if (intComp !== "All" && !item.companyTags.includes(intComp)) return false;

      return true;
    });

    const categories = [
      "All", "Programming Fundamentals", "Arrays", "Strings", "Recursion",
      "Searching", "Sorting", "Hashing", "Stack", "Queue", "Linked List",
      "Trees", "Graphs", "Heap", "Greedy", "Dynamic Programming", "Backtracking",
      "Trie", "Bit Manipulation", "OOP", "DBMS", "Operating Systems",
      "Computer Networks", "System Design", "SQL", "HR Interview", "Behavioral Interview"
    ];

    const companiesList = [
      "All", "Google", "Amazon", "Meta", "Microsoft", "Netflix", 
      "Uber", "Apple", "Adobe", "Oracle", "Goldman Sachs", "Salesforce", "ServiceNow"
    ];

    const handleToggleFlashcard = (id) => {
      if (revealedFlashcards.includes(id)) {
        setRevealedFlashcards(revealedFlashcards.filter(fid => fid !== id));
      } else {
        setRevealedFlashcards([...revealedFlashcards, id]);
      }
    };

    return (
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 3.5, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Box sx={{ borderBottom: '1px solid rgba(15,23,42,0.06)', pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
            🎙️ FAANG Placement & Interview Hub
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Core theory revision notes, flash cards, mock questions, behavioral frameworks, and company preparation guidelines.
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Tabs 
          value={intTab} 
          onChange={(e, newVal) => setIntTab(newVal)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)', mb: 1 }}
        >
          <Tab label="Algorithmic Q&A Bank" sx={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'none' }} />
          <Tab label="Core Revision & Tips" sx={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'none' }} />
          <Tab label="Company-wise Prep" sx={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'none' }} />
          <Tab label="HR & Behavioral Prep" sx={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'none' }} />
          <Tab label="Mock Simulator" sx={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'none' }} />
        </Tabs>

        {/* TAB 0: Q&A BANK */}
        {intTab === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Search & Difficulty Filter controls */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField 
                  fullWidth
                  size="small"
                  placeholder="Search by keywords, answers, or concepts..."
                  value={intSearch}
                  onChange={(e) => setIntSearch(e.target.value)}
                  sx={{ '& input': { fontSize: '0.82rem' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Difficulty"
                  value={intDiff}
                  onChange={(e) => setIntDiff(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ '& select': { fontSize: '0.82rem', py: 1 } }}
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </TextField>
              </Grid>
            </Grid>

            {/* Category Filters */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                Filter by Topic Category
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <Chip 
                    key={cat}
                    label={cat} 
                    size="small" 
                    onClick={() => setIntType(cat)}
                    color={intType === cat ? "primary" : "default"}
                    variant={intType === cat ? "filled" : "outlined"}
                    sx={{ fontSize: '0.66rem', height: 22, cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>

            {/* Company Filters */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                Target Company
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                {companiesList.map((comp) => (
                  <Chip 
                    key={comp}
                    label={comp} 
                    size="small" 
                    onClick={() => setIntComp(comp)}
                    color={intComp === comp ? "secondary" : "default"}
                    variant={intComp === comp ? "filled" : "outlined"}
                    sx={{ fontSize: '0.66rem', height: 22, cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>

            {/* Matching Count */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                Showing {filteredQuestions.length} matched interview questions
              </Typography>
              {(intSearch || intType !== "All" || intDiff !== "All" || intComp !== "All") && (
                <Button 
                  size="small" 
                  onClick={() => {
                    setIntSearch("");
                    setIntType("All");
                    setIntDiff("All");
                    setIntComp("All");
                  }}
                  sx={{ textTransform: 'none', fontSize: '0.72rem', py: 0.2 }}
                >
                  Reset Filters
                </Button>
              )}
            </Box>

            {/* Questions Accordions List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item) => (
                  <Accordion 
                    key={item.id} 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: 3, 
                      overflow: 'hidden',
                      '&:before': { display: 'none' },
                      border: '1px solid rgba(15, 23, 42, 0.08)'
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1, pr: 2 }}>
                          {item.q}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center', flexShrink: 0 }}>
                          <Chip 
                            label={item.difficulty} 
                            size="small" 
                            color={item.difficulty === "Easy" ? "success" : (item.difficulty === "Medium" ? "warning" : "error")} 
                            variant="outlined" 
                            sx={{ fontSize: '0.62rem', height: 18 }} 
                          />
                          <Chip label={item.type} size="small" variant="outlined" color="primary" sx={{ fontSize: '0.62rem', height: 18 }} />
                        </Box>
                      </Box>
                    </AccordionSummary>
                     <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, borderTop: '1px solid rgba(15,23,42,0.06)', p: 3 }}>
                        {(() => {
                          const details = getEnrichedAnswerDetails(item.q, item.answer || item.a);
                          return (
                            <>
                              {/* Expected Answer */}
                              <Box sx={{ p: 2.5, backgroundColor: 'rgba(25, 118, 210, 0.02)', borderLeft: '4px solid #1976d2', borderRadius: 2 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                                  🎯 Expected Answer (Definition & Explanation):
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.82rem', color: 'text.primary', lineHeight: 1.6, fontWeight: 700, mb: 0.5 }}>
                                  {details.definition}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.6 }}>
                                  {details.explanation}
                                </Typography>
                              </Box>

                              {/* Real-world & Strategy */}
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

                              {/* Keywords & Tip */}
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

                              {/* Complexity & Code */}
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

                        {/* Why Interviewers Ask */}
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                            💡 Why Interviewers Ask It:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {item.whyAsk}
                          </Typography>
                        </Box>

                        {/* Common Mistakes */}
                        <Box sx={{ p: 2, backgroundColor: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'error.main', display: 'block', mb: 0.5 }}>
                            ⚠️ Common Pitfalls & Mistakes to Avoid:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'error.main', lineHeight: 1.5 }}>
                            {item.commonMistakes}
                          </Typography>
                        </Box>

                        {/* Follow-up Questions */}
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                            🔄 Follow-up Discussion points:
                          </Typography>
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            {item.followUps.map((fu, idx) => (
                              <Box component="li" key={idx} sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>
                                {fu}
                              </Box>
                            ))}
                          </Box>
                        </Box>

                      {/* Company Tags & Related Concepts */}
                      <Box sx={{ borderTop: '1px solid rgba(15,23,42,0.06)', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, mr: 0.5 }}>Asked by:</Typography>
                          {item.companyTags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, mr: 0.5 }}>Concepts:</Typography>
                          {item.relatedConcepts.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
                          ))}
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.disabled', textAlign: 'center', py: 4 }}>
                  No interview questions match the active search and filters. Try refining your parameters.
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* TAB 1: CORE REVISION & PLACEMENT GUIDES */}
        {intTab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Quick Revision notes */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
                📖 Quick Revision Cheat Sheets
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {REVISION_NOTES.map((note, idx) => (
                  <Accordion key={idx} variant="outlined" sx={{ borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {note.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', whiteSpace: 'pre-line', fontSize: '0.8rem', color: 'text.secondary', p: 3, lineHeight: 1.6 }}>
                      {note.content}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>

            {/* Flash Cards */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
                ⚡ Core Concept Flashcards (Click to Flip)
              </Typography>
              <Grid container spacing={2}>
                {FLASH_CARDS.map((card) => {
                  const isFlipped = revealedFlashcards.includes(card.id);
                  return (
                    <Grid item xs={12} sm={6} key={card.id}>
                      <Paper 
                        variant="outlined"
                        onClick={() => handleToggleFlashcard(card.id)}
                        sx={{ 
                          p: 3, 
                          height: 160, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          backgroundColor: isFlipped ? 'rgba(16, 185, 129, 0.02)' : 'background.paper',
                          borderColor: isFlipped ? 'success.light' : 'rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }
                        }}
                      >
                        <Box>
                          <Chip label={card.category} size="small" color="primary" sx={{ fontSize: '0.6rem', height: 18, mb: 1 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.8rem', lineHeight: 1.4 }}>
                            {isFlipped ? card.answer : card.question}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, textAlign: 'right', display: 'block', mt: 1 }}>
                          {isFlipped ? "Show Question" : "Reveal Answer"}
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* STAR Method Behavioral Guide */}
            <Box sx={{ p: 3.5, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 3, backgroundColor: 'rgba(245,158,11,0.01)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1, color: '#f59e0b', mb: 1 }}>
                🎯 Behavioral Interviewing: The STAR Method
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', mb: 2.5, lineHeight: 1.6 }}>
                {STAR_GUIDE.description}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {STAR_GUIDE.steps.map((step, idx) => (
                  <Grid item xs={12} sm={3} key={idx}>
                    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
                        {step.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.74rem', lineHeight: 1.4, display: 'block' }}>
                        {step.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ p: 2.5, border: '1px dashed rgba(245,158,11,0.3)', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
                  {STAR_GUIDE.example.question}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1, lineHeight: 1.5 }}>
                  <strong>Situation:</strong> {STAR_GUIDE.example.situation}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1, lineHeight: 1.5 }}>
                  <strong>Task:</strong> {STAR_GUIDE.example.task}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1, lineHeight: 1.5 }}>
                  <strong>Action:</strong> {STAR_GUIDE.example.action}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', m: 0, lineHeight: 1.5 }}>
                  <strong>Result:</strong> {STAR_GUIDE.example.result}
                </Typography>
              </Box>
            </Box>

            {/* General Placement Advice */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
                🚀 Structured Placement Tips & Rules
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Accordion variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Coding Round Guidelines</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {TIPS_DATA.coding.map((t, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.8 }}>{t}</Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Machine Coding Tips</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {TIPS_DATA.machine.map((t, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.8 }}>{t}</Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>System Design Framework</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {TIPS_DATA.design.map((t, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.8 }}>{t}</Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Resume Optimization Formulas</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {TIPS_DATA.resume.map((t, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.8 }}>{t}</Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Communication & Collaboration Tips</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {TIPS_DATA.comm.map((t, idx) => (
                        <Box component="li" key={idx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.8 }}>{t}</Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        )}

        {/* TAB 2: COMPANY-WISE PREP PROFILES */}
        {intTab === 2 && (
          <Box>
            {!selectedCompanyId ? (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                  🏢 Select a Target Company Profile
                </Typography>
                <Grid container spacing={2.5}>
                  {COMPANY_PREP_DATA.map((company) => (
                    <Grid item xs={12} sm={6} md={4} key={company.id}>
                      <Paper 
                        variant="outlined"
                        sx={{ 
                          p: 3, 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'space-between',
                          gap: 1.5,
                          borderRadius: 3,
                          transition: 'all 0.2s ease',
                          '&:hover': { transform: 'scale(1.02)', borderColor: 'primary.main' }
                        }}
                      >
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                              {company.name}
                            </Typography>
                            <Chip 
                              label={company.difficulty} 
                              size="small" 
                              color={company.difficulty.includes("Hard") ? "error" : "warning"}
                              sx={{ fontSize: '0.62rem', height: 18 }}
                            />
                          </Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, lineHeight: 1.4 }}>
                            <strong>Key Topics:</strong> {company.topics}
                          </Typography>
                        </Box>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          size="small"
                          onClick={() => setSelectedCompanyId(company.id)}
                          sx={{ textTransform: 'none', fontSize: '0.72rem', fontWeight: 700 }}
                        >
                          View Prep Profile
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (() => {
              const comp = COMPANY_PREP_DATA.find(c => c.id === selectedCompanyId);
              if (!comp) return null;
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Button 
                    onClick={() => setSelectedCompanyId(null)}
                    sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700 }}
                  >
                    ← Back to Companies List
                  </Button>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', pb: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {comp.name} Prep Guide
                    </Typography>
                    <Chip label={`Difficulty: ${comp.difficulty}`} color={comp.difficulty.includes("Hard") ? "error" : "warning"} />
                  </Box>

                  {/* Interview Process */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                      📋 Step-by-Step Interview Process:
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2.5, whiteSpace: 'pre-line', fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.6 }}>
                      {comp.process}
                    </Paper>
                  </Box>

                  {/* Topics Asked */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                      🏷️ Core Topics Highlighted:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.82rem', lineHeight: 1.5 }}>
                      {comp.topics}
                    </Typography>
                  </Box>

                  {/* Preparation Strategy */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                      💡 Preparation Strategy:
                    </Typography>
                    <Paper sx={{ p: 2.5, borderLeft: '4px solid #10b981', backgroundColor: 'rgba(16,185,129,0.01)', fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.6 }}>
                      {comp.strategy}
                    </Paper>
                  </Box>

                  {/* FAQs Accordions */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1.5 }}>
                      ❓ Frequently Asked Questions:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {comp.faqs.map((faq, idx) => (
                        <Accordion key={idx} variant="outlined">
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{faq.q}</Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', p: 3, fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {faq.a}
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  </Box>
                </Box>
              );
            })()}
          </Box>
        )}

        {/* TAB 3: HR & BEHAVIORAL PREP */}
        {intTab === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                👔 HR, Behavioral & Resume Preparation
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Equip yourself with the essential non-technical skills required to clear leadership rounds, negotiate competitive offers, and build a resume that passes recruiter screens.
              </Typography>
            </Box>

            {/* Behavioral STAR Method */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, backgroundColor: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                🌟 The STAR Method Template
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6, mb: 2 }}>
                Use this structure for all behavioral questions. Do not just talk about what happened; detail your exact technical actions and quantify the final results.
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: "S - Situation", desc: "Set the context. What project were you working on? What was the timeline?" },
                  { label: "T - Task", desc: "What was the technical challenge or conflict? What needed to be resolved?" },
                  { label: "A - Action", desc: "Specify YOUR actions. Did you debug logs? Did you write a script? Did you align the team?" },
                  { label: "R - Result", desc: "Quantify the outcome. E.g., 'reduced latency by 40%', 'delivered 2 days early'." }
                ].map((step, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ p: 1.5, backgroundColor: 'background.paper', borderRadius: 2, border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', display: 'block', mb: 0.5 }}>{step.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>{step.desc}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* General Prep Modules Accordions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                {
                  title: "👥 HR & Cultural Fit Questions",
                  content: `• "Tell me about yourself": Keep it to 90 seconds. Focus on your trajectory, recent wins, and why you are excited about this role. Avoid reciting your resume.
• "Why do you want to join us?": Align your response with their engineering values. Mention their recent technical blogs, open-source projects, or scale challenges.
• "What are your strengths and weaknesses?": Choose a real weakness (e.g., "perfectionism leading to over-engineering") and show how you actively mitigate it (e.g., "setting strict timeboxes and consulting senior colleagues early").`
                },
                {
                  title: "📄 Software Engineering Resume Blueprints",
                  content: `• Use the standard single-page LaTeX Jakes Template or similar clean layouts.
• Quantify achievements: Don't write "fixed bugs". Write "Optimized SQL query performance, reducing server response times by 35% and query execution costs by $2,000/month."
• List projects with technical stacks: E.g., "Distributed Rate Limiter Gateway (Go, Redis, Docker) — Handled 10k RPS with slide window tokens."
• Place technical skills at the top: Languages, Frameworks, Developer Tools, Databases.`
                },
                {
                  title: "💰 Salary & Total Compensation Negotiation",
                  content: `• Never give the first number. Ask: "What range has been budgeted for this position?"
• Focus on Total Compensation (TC): Base Salary + Annual Performance Bonus + Stock/Equity grants + Sign-on Bonus.
• Leverage competing offers: Always represent your value calmly. E.g., "I am excited about this team, but I have a competing offer of $X base. If you can match the TC, I am ready to sign today."`
                },
                {
                  title: "💻 Coding Round & OA (Online Assessment) Playbook",
                  content: `• During coding rounds, speak your thoughts out loud: "I will first declare a seen map to solve this in linear time..."
• Clarify bounds first: Ask about input sizes, duplicate values, negative numbers, and memory limits before writing a single line of code.
• Write clean, modular code with descriptive variable names (use 'seen' instead of 's', 'currentIndex' instead of 'ci').`
                },
                {
                  title: "📐 System Design Round Fundamentals",
                  content: `• Step 1: Clarify functional requirements (e.g., write post, view feed) and non-functional requirements (e.g., high availability, low latency, 10k RPS).
• Step 2: Establish API endpoints (e.g., POST /api/v1/posts).
• Step 3: Outline High-Level Design (Client -> API Gateway -> Load Balancer -> Microservices -> Cache -> DB).
• Step 4: Deep dive into bottlenecks (database replication, caching strategies, rate limiting, consistent hashing).`
                }
              ].map((section, idx) => (
                <Accordion key={idx} variant="outlined" sx={{ borderRadius: 2.5, overflow: 'hidden' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      {section.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', p: 3, fontSize: '0.82rem', color: 'text.secondary', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {section.content}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        )}

        {/* TAB 4: MOCK SIMULATOR */}
        {intTab === 4 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                ⏱️ Interactive Mock Interview Simulator
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Test your placement readiness under time pressure. The simulator will select a random question from our curriculum database, track your response, and evaluate your answer against technical keywords.
              </Typography>
            </Box>

            {mockStep === 0 && (
              <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                    Ready to start your session?
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
                    Select your preferred difficulty. You will have 2 minutes to type a detailed technical answer.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {["Easy", "Medium", "Hard"].map((diff) => (
                    <Chip
                      key={diff}
                      label={diff}
                      clickable
                      onClick={() => setMockDiff(diff)}
                      color={mockDiff === diff ? (diff === 'Easy' ? 'success' : (diff === 'Medium' ? 'primary' : 'error')) : 'default'}
                      variant={mockDiff === diff ? 'filled' : 'outlined'}
                      sx={{ px: 2, fontWeight: 700 }}
                    />
                  ))}
                </Box>

                <Button variant="contained" color="primary" onClick={handleStartMock} sx={{ px: 4, py: 1, borderRadius: 2.5, fontWeight: 700, textTransform: 'none' }}>
                  Begin Mock Interview
                </Button>
              </Paper>
            )}

            {mockStep === 1 && mockQuestion && (
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Header with timer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Chip label={`Difficulty: ${mockQuestion.difficulty}`} color={mockQuestion.difficulty === 'Easy' ? 'success' : (mockQuestion.difficulty === 'Medium' ? 'primary' : 'error')} size="small" sx={{ fontWeight: 800, mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                      {mockQuestion.q}
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2.5, py: 1, borderRadius: 2.5, backgroundColor: mockTimer < 20 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.05)', border: mockTimer < 20 ? '1px solid #ef4444' : 'none' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: mockTimer < 20 ? 'error.main' : 'text.primary', fontFamily: 'monospace' }}>
                      ⏱️ {Math.floor(mockTimer / 60)}:{(mockTimer % 60).toString().padStart(2, '0')}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                {/* Answer box */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 1 }}>
                    Type your explanation below (try to be detailed, explain complexity and edge cases):
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    fullWidth
                    value={mockUserAnswer}
                    onChange={(e) => setMockUserAnswer(e.target.value)}
                    placeholder="E.g., We can solve this problem by leveraging a Hash Map to store elements we have seen so far..."
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontFamily: 'monospace',
                        fontSize: '0.82rem'
                      }
                    }}
                  />
                </Box>

                {/* Submitting buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => alert(`Hint: Focus on concepts like: ${mockQuestion.relatedConcepts ? mockQuestion.relatedConcepts.join(', ') : 'algorithms'}`)}
                    sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 700 }}
                  >
                    💡 Get Hint
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleMockSubmit}
                    disabled={mockUserAnswer.trim().length === 0}
                    sx={{ px: 3, py: 0.8, borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                  >
                    Submit Answer
                  </Button>
                </Box>
              </Paper>
            )}

            {mockStep === 2 && mockQuestion && (
              <Paper variant="outlined" sx={{ p: 3.5, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                {/* Result header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>
                      Evaluation Report
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Question: {mockQuestion.q}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', px: 3, py: 1.5, borderRadius: 3, backgroundColor: mockScore >= 8 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)', border: mockScore >= 8 ? '1px solid #10b981' : '1px solid #f59e0b' }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: mockScore >= 8 ? 'success.main' : 'warning.main', fontFamily: 'monospace' }}>
                      {mockScore} / 10
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>READINESS SCORE</Typography>
                  </Box>
                </Box>

                <Divider />

                {/* Feedback */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                    📝 Evaluator Feedback:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.84rem', lineHeight: 1.5, p: 2, backgroundColor: 'rgba(0,0,0,0.015)', borderRadius: 2 }}>
                    {mockFeedback}
                  </Typography>
                </Box>

                {/* Compare answers */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 1 }}>
                      Your Answer:
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, height: 180, overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.01)', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {mockUserAnswer || "[No answer provided]"}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.main', display: 'block', mb: 1 }}>
                      Expected Answer:
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, height: 180, overflowY: 'auto', backgroundColor: 'rgba(16, 185, 129, 0.01)', border: '1px solid rgba(16, 185, 129, 0.08)' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {mockQuestion.answer || mockQuestion.a}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Follow Ups */}
                {mockQuestion.followUps && mockQuestion.followUps.length > 0 && (
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 1 }}>
                      Prepare for these next follow-up questions:
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {mockQuestion.followUps.map((fu, idx) => (
                        <Typography key={idx} variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 0.5 }}>
                          • {fu}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setMockStep(0)}
                    sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 700 }}
                  >
                    Finish Session
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartMock}
                    sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 700 }}
                  >
                    Try Another Question
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    );
  };

  // ---------------------------------------------------------
  // 📁 VIEW 4: PROJECT HUB COMPONENT
  // ---------------------------------------------------------
  const renderProjectHubView = () => {
    const difficulties = ["Beginner", "Intermediate", "Advanced"];

    return (
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 3.5, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Box sx={{ borderBottom: '1px solid rgba(15,23,42,0.06)', pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
            📁 Practical Project Hub
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Consolidate your computer science skills by reviewing architectural blueprints and checklists for 9 production-grade application modules.
          </Typography>
        </Box>

        {difficulties.map((diff) => {
          const projects = PROJECT_HUB_DATABASE.filter(p => p.difficulty === diff);
          return (
            <Box key={diff} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 2, color: diff === "Beginner" ? "success.main" : (diff === "Intermediate" ? "primary.main" : "error.main"), textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {diff} Projects
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {projects.map((proj) => (
                  <Accordion key={proj.projectId} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                          {proj.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip label={proj.difficulty} size="small" color={proj.difficulty === 'Beginner' ? 'success' : (proj.difficulty === 'Intermediate' ? 'primary' : 'error')} sx={{ fontSize: '0.62rem', height: 18 }} />
                          <Chip label={proj.estimatedTime} size="small" variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderTop: '1px solid rgba(15,23,42,0.06)', p: 3 }}>
                      
                      {/* Description & Objectives */}
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.84rem', lineHeight: 1.5, mb: 1.5 }}>
                          {proj.description}
                        </Typography>
                        <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 2, borderLeft: '4px solid #10b981' }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.main', display: 'block', mb: 0.5 }}>
                            🎯 Learning Objectives:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                            {proj.learningObjectives}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Design specs */}
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            ⚙️ System Architecture:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.architecture}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🗄️ Database Design:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.databaseDesign}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🔌 API Design:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: 'monospace', whiteSpace: 'pre-wrap', backgroundColor: 'rgba(0,0,0,0.02)', p: 1.5, borderRadius: 1.5 }}>
                            {proj.apiDesign}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🖥️ Frontend Design:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.4 }}>
                            {proj.frontendDesign}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            💻 Backend Design:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.4 }}>
                            {proj.backendDesign}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* Folder blueprint structures */}
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            📂 Folder Structure:
                          </Typography>
                          <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', color: '#38bdf8', borderRadius: 2.5, fontSize: '0.72rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                            {proj.folderStructure}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🐙 GitHub Structure:
                          </Typography>
                          <Box component="pre" sx={{ p: 2, backgroundColor: '#020617', color: '#a78bfa', borderRadius: 2.5, fontSize: '0.72rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                            {proj.githubStructure}
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Roadmap, Milestones & Extensions */}
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🗺️ Implementation Roadmap:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.roadmap}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🏁 Project Milestones:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.milestones}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* Checklist */}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 1 }}>
                          ☑️ Project Checklist Tasks:
                        </Typography>
                        <Grid container spacing={1}>
                          {proj.checklist.map((task, cidx) => (
                            <Grid item xs={12} sm={6} key={cidx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Checkbox disabled checked={false} size="small" />
                              <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>
                                {task}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      {/* Testing & Deployment */}
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🧪 Testing Strategy:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.testing}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            🚀 Deployment Guidelines:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.deployment}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* Extension Ideas & Resume description */}
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            💡 Extension & Scale Ideas:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {proj.extensionIdeas}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                            📄 Professional Resume Description:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'success.main', fontWeight: 600, lineHeight: 1.5 }}>
                            {proj.resumeDesc}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* Workbench Link */}
                      <Box sx={{ borderTop: '1px solid rgba(15,23,42,0.06)', pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        {/* We link standard buildables to day 1, intermediate to day 13, advanced to day 30 so they redirect cleanly to a sandbox */}
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => {
                            const getProjectRedirectDay = (projectId) => {
                              switch (projectId) {
                                case "hub_beg_1": return 3; // Strings
                                case "hub_beg_2": return 7; // OOP
                                case "hub_beg_3": return 13; // File I/O
                                case "hub_int_1": return 21; // HTTP Server
                                case "hub_int_2": return 25; // SQL Basics
                                case "hub_int_3": return 11; // BST/Trie
                                case "hub_adv_1": return 30; // Rate Limiter
                                case "hub_adv_2": return 14; // CPU Scheduling
                                case "hub_adv_3": return 28; // Key-Value Disk Store
                                default: return 1;
                              }
                            };
                            const redirectDay = getProjectRedirectDay(proj.projectId);
                            navigate(`/playground/${redirectDay}?project=${proj.projectId}`);
                          }}
                          sx={{ textTransform: 'none', fontWeight: 700, px: 3, borderRadius: 2 }}
                        >
                          Build in Playground Sandbox
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderSyllabusProjectsView = () => {
    const categories = ["Strings", "OOP", "DBMS"];
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%' }}>
        <Box sx={{ borderBottom: '1px solid rgba(15,23,42,0.06)', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            💡 Syllabus Mini-Projects & Assignments
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Apply the concepts you have learned by implementing these structured programming assignments.
          </Typography>
        </Box>

        {categories.map((cat) => {
          const projs = MINI_PROJECTS.filter(p => p.category === cat);
          return (
            <Box key={cat} sx={{ mb: 2.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1.5, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {cat} Projects
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {projs.map((proj) => (
                  <Accordion key={proj.id} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {proj.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, borderTop: '1px solid rgba(15,23,42,0.06)', p: 3 }}>
                      
                      {/* Problem Statement */}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                          ❓ Problem Statement:
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', lineHeight: 1.5 }}>
                          {proj.problemStatement}
                        </Typography>
                      </Box>

                      {/* Requirements */}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                          📋 Requirements:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {proj.requirements.map((req, rIdx) => (
                            <Box component="li" key={rIdx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.5 }}>
                              {req}
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Expected Output */}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                          💻 Expected Output:
                        </Typography>
                        <Box component="pre" sx={{ p: 2, backgroundColor: '#0f172a', color: '#10b981', borderRadius: 2.5, fontSize: '0.74rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                          {proj.expectedOutput}
                        </Box>
                      </Box>

                      {/* Folder Structure */}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                          📂 Folder Structure:
                        </Typography>
                        <Box component="pre" sx={{ p: 2, backgroundColor: '#1e293b', color: '#38bdf8', borderRadius: 2.5, fontSize: '0.74rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                          {proj.folderStructure}
                        </Box>
                      </Box>

                      {/* Steps */}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                          🏁 Implementation Steps:
                        </Typography>
                        <Box component="ol" sx={{ pl: 2, m: 0 }}>
                          {proj.steps.map((step, sIdx) => (
                            <Box component="li" key={sIdx} sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.5 }}>
                              {step}
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Workbench Link */}
                      <Box sx={{ borderTop: '1px solid rgba(15,23,42,0.06)', pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => {
                            const redirectDay = proj.category === "Strings" ? 3 : (proj.category === "OOP" ? 7 : 25);
                            navigate(`/playground/${redirectDay}?project=${proj.id}`);
                          }}
                          sx={{ textTransform: 'none', fontWeight: 700, px: 3, borderRadius: 2 }}
                        >
                          Build in Playground Sandbox
                        </Button>
                      </Box>

                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  // ---------------------------------------------------------
  // 👤 VIEW 5: USER PROFILE VIEW COMPONENT
  // ---------------------------------------------------------
  const renderProfileView = () => {
    return (
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 3.5, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Box sx={{ borderBottom: '1px solid rgba(15,23,42,0.06)', pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
            👤 Profile & Study Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Manage certificates, dynamic revision notes, and analyze study completion stats.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Stats Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Avatar sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'primary.main', fontSize: '1.5rem', fontWeight: 800 }}>
                {avatarLetter}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  {user?.email || "Student Account"}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                  Level {userLevel.num}: {userLevel.title}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main' }}>{completedCount}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>Completed</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>{xpPoints}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>XP Earned</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Badges & Achievements Grid */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {(() => {
                // Calculate dynamic statistics
                let projectsCount = 0;
                let quizCount = 0;
                try {
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('project_tasks_')) {
                      const tasks = JSON.parse(localStorage.getItem(key) || '{}');
                      if (Object.values(tasks).some(Boolean)) projectsCount++;
                    }
                    if (key && key.startsWith('quiz_score_')) {
                      quizCount++;
                    }
                  }
                } catch(e) {}
                
                const finalProjects = projectsCount || (completedCount > 0 ? Math.min(completedCount, 8) : 0);
                const finalQuizzes = quizCount || (completedCount > 0 ? completedCount * 2 : 0);
                const finalXp = xpPoints || 0;

                const stats = {
                  score: completedCount,
                  xp: finalXp,
                  quizzesDone: finalQuizzes,
                  projectsBuilt: finalProjects,
                  aiMessages: completedCount * 2
                };

                const unlockedSet = checkUnlockedAchievements(stats);

                return (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        🏆 Badges & Achievements ({unlockedSet.size} / {ACHIEVEMENTS.length} Unlocked)
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                        Unlock more by completing days, quizzes, and projects!
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
                        gap: 2, 
                        maxHeight: 320, 
                        overflowY: 'auto',
                        p: 1,
                        backgroundColor: 'rgba(15, 23, 42, 0.01)',
                        borderRadius: 3,
                        border: '1px solid rgba(15, 23, 42, 0.04)'
                      }}
                    >
                      {ACHIEVEMENTS.map((ach) => {
                        const unlocked = unlockedSet.has(ach.id);
                        
                        // Select nice vibrant color schemes based on points
                        let badgeBg = 'rgba(15, 23, 42, 0.03)';
                        let badgeBorder = '1px solid rgba(15, 23, 42, 0.08)';
                        let shadow = 'none';
                        let fontColor = 'text.disabled';

                        if (unlocked) {
                          fontColor = 'text.primary';
                          shadow = '0 4px 12px rgba(16, 185, 129, 0.12)';
                          if (ach.points >= 500) {
                            badgeBg = 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)';
                            badgeBorder = '2px solid #ef4444';
                            shadow = '0 6px 16px rgba(239, 68, 68, 0.2)';
                          } else if (ach.points >= 300) {
                            badgeBg = 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)';
                            badgeBorder = '2px solid #6366f1';
                          } else {
                            badgeBg = 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)';
                            badgeBorder = '2px solid #10b981';
                          }
                        }

                        return (
                          <Tooltip 
                            key={ach.id}
                            title={
                              <Box sx={{ p: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.8rem' }}>
                                  {ach.title}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', my: 0.5 }}>
                                  {ach.desc}
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: unlocked ? '#10b981' : '#ef4444' }}>
                                  {unlocked ? `✓ Unlocked (+${ach.points} XP)` : `🔒 Locked (Requires: ${ach.desc})`}
                                </Typography>
                              </Box>
                            }
                            arrow
                          >
                            <Box
                              sx={{
                                p: 1.5,
                                borderRadius: 3,
                                border: badgeBorder,
                                background: badgeBg,
                                boxShadow: shadow,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                '&:hover': {
                                  transform: unlocked ? 'scale(1.12)' : 'none',
                                  boxShadow: unlocked ? '0 8px 24px rgba(0, 0, 0, 0.12)' : shadow
                                }
                              }}
                            >
                              <Box 
                                sx={{ 
                                  fontSize: '1.6rem', 
                                  filter: unlocked ? 'none' : 'grayscale(1)',
                                  opacity: unlocked ? 1 : 0.45,
                                  mb: 0.5
                                }}
                              >
                                {ach.icon}
                              </Box>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  fontSize: '0.58rem', 
                                  fontWeight: 800, 
                                  color: fontColor,
                                  lineHeight: 1.2,
                                  height: 24,
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical'
                                }}
                              >
                                {ach.title}
                              </Typography>
                              {!unlocked && (
                                <Box 
                                  sx={{ 
                                    position: 'absolute', 
                                    top: 4, 
                                    right: 4, 
                                    backgroundColor: 'rgba(15, 23, 42, 0.65)', 
                                    borderRadius: '50%', 
                                    width: 14, 
                                    height: 14, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                  }}
                                >
                                  <LockIcon sx={{ fontSize: '0.55rem', color: '#ffffff' }} />
                                </Box>
                              )}
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </>
                );
              })()}
            </Paper>
          </Grid>
          {/* Analytical Progress Heatmap & Placement Readiness */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    📊 Placement Readiness & Study heatmap
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                    Real-time monitoring of your curriculum completion, algorithmic strengths, and weak areas.
                  </Typography>
                </Box>
                <Box sx={{ px: 3, py: 1.5, borderRadius: 3, backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: 'success.main', fontFamily: 'monospace' }}>
                    {Math.min(100, Math.round((completedCount / 30) * 100))}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800 }}>INTERVIEW READINESS</Typography>
                </Box>
              </Box>

              <Divider />

              {/* Heatmap Grid */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 1.5 }}>
                  📅 30-Day Curriculum Analytics Grid:
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 1.2, maxWidth: 500, mx: 'auto' }}>
                  {Array.from({ length: 30 }, (_, i) => {
                    const dayNum = i + 1;
                    const task = curriculumData[dayNum];
                    const isCompleted = task && task.completed;
                    return (
                      <Tooltip key={dayNum} title={`Day ${dayNum}: ${task ? task.title : 'Loading...'} (${isCompleted ? 'Completed' : 'Not Completed'})`} arrow>
                        <Box
                          onClick={() => {
                            if (task) handleCardClick(dayNum);
                          }}
                          sx={{
                            aspectRatio: '1/1',
                            borderRadius: 1.8,
                            backgroundColor: isCompleted ? 'success.main' : 'rgba(15, 23, 42, 0.04)',
                            border: isCompleted ? 'none' : '1px solid rgba(0,0,0,0.06)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.15)',
                              boxShadow: isCompleted ? '0 0 10px rgba(16,185,129,0.5)' : '0 0 10px rgba(0,0,0,0.1)'
                            }
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: 0.5, backgroundColor: 'rgba(15, 23, 42, 0.04)', border: '1px solid rgba(0,0,0,0.06)' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Not Started</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: 0.5, backgroundColor: 'success.main' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Completed</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* Topic Completion Breakdown */}
              <Grid container spacing={3}>
                {[
                  {
                    title: "🧠 Data Structures & Algorithms",
                    desc: "Days 1 to 12. Covers Arrays, Lists, Trees, Graphs, Sorting.",
                    progress: Math.min(100, Math.round((Object.entries(curriculumData).filter(([d, t]) => parseInt(d) >= 1 && parseInt(d) <= 12 && t.completed).length / 12) * 100)),
                    color: "primary.main"
                  },
                  {
                    title: "⚙️ Operating Systems & Low-level",
                    desc: "Days 13 to 18. Covers CPU Scheduling, Threading, Cache, Files.",
                    progress: Math.min(100, Math.round((Object.entries(curriculumData).filter(([d, t]) => parseInt(d) >= 13 && parseInt(d) <= 18 && t.completed).length / 6) * 100)),
                    color: "success.main"
                  },
                  {
                    title: "🌐 Networking & Socket Programming",
                    desc: "Days 19 to 24. Covers TCP/UDP, DNS, Web Servers, TLS.",
                    progress: Math.min(100, Math.round((Object.entries(curriculumData).filter(([d, t]) => parseInt(d) >= 19 && parseInt(d) <= 24 && t.completed).length / 6) * 100)),
                    color: "warning.main"
                  },
                  {
                    title: "🗄️ Relational Databases & System Design",
                    desc: "Days 25 to 30. Covers SQL, Joins, LSM Store, Rate limiting.",
                    progress: Math.min(100, Math.round((Object.entries(curriculumData).filter(([d, t]) => parseInt(d) >= 25 && parseInt(d) <= 30 && t.completed).length / 6) * 100)),
                    color: "error.main"
                  }
                ].map((topic, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: 3, border: '1px solid rgba(0,0,0,0.04)' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>{topic.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>{topic.desc}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                          <Box sx={{ width: `${topic.progress}%`, height: '100%', backgroundColor: topic.color }} />
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>{topic.progress}%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Recommended Next Actions */}
              <Box sx={{ p: 2.5, backgroundColor: 'rgba(59, 130, 246, 0.03)', borderRadius: 3, border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: 'primary.main', mb: 1 }}>
                  💡 Study Path Recommendations
                </Typography>
                {completedCount === 30 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                    Congratulations! You have completed the entire 30-day curriculum! Try using the <strong>Mock Interview Simulator</strong> to prepare for coding screens or start building the Advanced system blueprints.
                  </Typography>
                ) : (
                  (() => {
                    const nextIncomplete = Array.from({ length: 30 }, (_, i) => i + 1).find(dayNum => {
                      const task = curriculumData[dayNum];
                      return !task || !task.completed;
                    });
                    const nextTaskName = curriculumData[nextIncomplete] ? curriculumData[nextIncomplete].title : `Day ${nextIncomplete}`;
                    return (
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 1.5 }}>
                          Based on your current progress, your next recommended lesson is <strong>Day {nextIncomplete}: {nextTaskName}</strong>. Focus on understanding the theory chapter first, then perform the local playground code execution.
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleCardClick(nextIncomplete)}
                          sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                        >
                          Jump to Day {nextIncomplete}
                        </Button>
                      </Box>
                    );
                  })()
                )}
              </Box>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#ffffff' }}>
      
      {/* ==========================================
         TOP PREMIUM NAVIGATION BAR
         ========================================== */}
      <Box
        component="header"
        sx={{
          height: 72,
          width: '100%',
          backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.01)',
          '@media print': { display: 'none' }
        }}
      >
        {/* Left Side: Brand Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer' }} onClick={handleHomeClick}>
          <LogoIcon sx={{ fontSize: '1.6rem', color: '#10b981' }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '0.92rem' }}>
              CSForge
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, fontSize: '0.62rem', letterSpacing: 0.5 }}>
              FORGE YOUR CS CAREER
            </Typography>
          </Box>
        </Box>

        {/* Center Nav Options */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1, justifyContent: 'center' }}>
          <Button
            onClick={() => { setActiveView('dashboard'); navigate('/'); }}
            startIcon={<HomeIcon sx={{ fontSize: '1.05rem !important' }} />}
            sx={{
              px: 2, py: 0.8, borderRadius: 2,
              color: activeView === 'dashboard' ? 'success.main' : 'text.secondary',
              backgroundColor: activeView === 'dashboard' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
              fontSize: '0.8rem', fontWeight: activeView === 'dashboard' ? 800 : 600, textTransform: 'none'
            }}
          >
            Dashboard
          </Button>

          <Button
            onClick={() => { setActiveView('roadmap'); navigate('/roadmap'); }}
            startIcon={<ModulesIcon sx={{ fontSize: '1.05rem !important' }} />}
            sx={{
              px: 2, py: 0.8, borderRadius: 2,
              color: activeView === 'roadmap' ? 'success.main' : 'text.secondary',
              backgroundColor: activeView === 'roadmap' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
              fontSize: '0.8rem', fontWeight: activeView === 'roadmap' ? 800 : 600, textTransform: 'none'
            }}
          >
            Roadmap
          </Button>

          <Button
            onClick={() => { setActiveView('interview'); navigate('/interview'); }}
            startIcon={<TrophyIcon sx={{ fontSize: '1.05rem !important' }} />}
            sx={{
              px: 2, py: 0.8, borderRadius: 2,
              color: activeView === 'interview' ? 'success.main' : 'text.secondary',
              backgroundColor: activeView === 'interview' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
              fontSize: '0.8rem', fontWeight: activeView === 'interview' ? 800 : 600, textTransform: 'none'
            }}
          >
            Interview Hub
          </Button>

          <Button
            onClick={() => { setActiveView('projects'); navigate('/projects'); }}
            startIcon={<CodeIcon sx={{ fontSize: '1.05rem !important' }} />}
            sx={{
              px: 2, py: 0.8, borderRadius: 2,
              color: activeView === 'projects' ? 'success.main' : 'text.secondary',
              backgroundColor: activeView === 'projects' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
              fontSize: '0.8rem', fontWeight: activeView === 'projects' ? 800 : 600, textTransform: 'none'
            }}
          >
            Project Hub
          </Button>

          <Button
            onClick={() => { setActiveView('profile'); navigate('/profile'); }}
            startIcon={<PersonIcon sx={{ fontSize: '1.05rem !important' }} />}
            sx={{
              px: 2, py: 0.8, borderRadius: 2,
              color: activeView === 'profile' ? 'success.main' : 'text.secondary',
              backgroundColor: activeView === 'profile' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
              fontSize: '0.8rem', fontWeight: activeView === 'profile' ? 800 : 600, textTransform: 'none'
            }}
          >
            Profile
          </Button>
        </Box>

        {/* Right Session Utilities */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notifications / Leaderboard triggers */}
          <IconButton onClick={handleLeaderboardOpen} sx={{ border: '1px solid rgba(15,23,42,0.06)', p: 1, borderRadius: 2 }}>
            <LeaderboardIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>

          <Tooltip title="Spaced Repetition Tasks" arrow>
            <IconButton onClick={() => setTasksOpen(true)} sx={{ border: '1px solid rgba(15,23,42,0.06)', p: 1, borderRadius: 2 }}>
              <Badge badgeContent={remainingDays} color="error" max={30}>
                <BellIcon sx={{ fontSize: '1.1rem' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Theme switcher */}
          <Tooltip title={`Switch Theme`} arrow>
            <IconButton onClick={toggleColorMode} sx={{ border: '1px solid rgba(15,23,42,0.06)', p: 1, borderRadius: 2 }}>
              {mode === 'light' ? <DarkModeIcon sx={{ fontSize: '1.1rem' }} /> : <LightModeIcon sx={{ fontSize: '1.1rem' }} />}
            </IconButton>
          </Tooltip>

          {user && (
            <Avatar onClick={handleProfileOpen} sx={{ width: 38, height: 38, cursor: 'pointer', bgcolor: 'primary.main', fontSize: '0.9rem', fontWeight: 800 }}>
              {avatarLetter}
            </Avatar>
          )}
        </Box>
      </Box>

      {/* Popovers */}
      <Popover open={Boolean(leaderboardAnchor)} anchorEl={leaderboardAnchor} onClose={handleLeaderboardClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Box sx={{ p: 2.5, width: 260 }}>
          <Typography variant="body2" sx={{ fontWeight: 800, mb: 1.5 }}>
            🏆 Leaderboard
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[
              { name: 'Rajesh Kumar', completed: 28, rank: 1, avatar: 'R' },
              { name: 'Anita Sharma', completed: 22, rank: 2, avatar: 'A' },
              { name: 'You', completed: completedCount, rank: 3, avatar: avatarLetter, isUser: true }
            ].map((peer, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0.8, borderRadius: 2, backgroundColor: peer.isUser ? 'rgba(16, 185, 129, 0.05)' : 'transparent' }}>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>#{peer.rank} {peer.name}</Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{peer.completed}/30</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Popover>

      {/* User profile dropdown menu */}
      <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
        <MenuItem onClick={() => { handleProfileClose(); setActiveView('profile'); }}>My Profile</MenuItem>
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </Menu>

      {/* ==========================================
         SUB-HEADER SIDEBAR & MAIN BODY SECTION
         ========================================== */}
      <Box sx={{ display: 'flex', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* Left Drawer Filtering Sidebar */}
        <Sidebar
          completedCount={completedCount}
          totalCount={totalCount}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          curriculumData={curriculumData}
        />

        {/* Right Main Scrollable Curriculum Container */}
        <Box
          component="main"
          ref={mainContentRef}
          sx={{
            flexGrow: 1,
            height: '100%',
            padding: { xs: 2.5, sm: 3, md: 4 },
            overflowY: 'auto',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            '&::-webkit-scrollbar': { width: 8 },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(0, 0, 0, 0.06)', borderRadius: 4 }
          }}
        >
          <Box sx={{ maxWidth: 900, width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5, pb: 8 }}>
            
            {activeView === 'dashboard' && (
              <>
                {/* Hero Banner */}
                <Paper sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', color: '#ffffff' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.03em' }}>
                    Welcome to CSForge! 🚀
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 600, lineHeight: 1.6, fontSize: '0.88rem' }}>
                    Access coding visualizers, placement cheat sheets, dynamic quizzes, and structured interview hub resources. Track your streak and claim completion badges!
                  </Typography>
                </Paper>


                {/* Continue Learning card */}
                {nextDay && (
                  <Paper sx={{ p: 3, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Chip label="🎯 Next Pending Goal" size="small" color="primary" sx={{ mb: 1, fontWeight: 700 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        Day {nextDay.dayNum}: {nextDay.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        {nextDay.desc}
                      </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => handleCardClick(nextDay.dayNum)} sx={{ textTransform: 'none', fontWeight: 700 }}>
                      Start
                    </Button>
                  </Paper>
                )}

                <Box ref={modulesGridRef}>
                  {activeFilter === 'path_11' ? (
                    renderSyllabusProjectsView()
                  ) : (
                    <DashboardGrid
                      curriculumData={curriculumData}
                      activeFilter={activeFilter}
                      onCardClick={handleCardClick}
                      onToggleProgress={handleToggleProgress}
                      searchQuery={searchQuery}
                    />
                  )}
                </Box>
              </>
            )}

            {activeView === 'roadmap' && renderRoadmapView()}
            {activeView === 'interview' && renderInterviewHubView()}
            {activeView === 'projects' && renderProjectHubView()}
            {activeView === 'profile' && renderProfileView()}
          </Box>
        </Box>
      </Box>

      {/* Spaced Repetition Checklist Tasks Drawer */}
      <Drawer anchor="right" open={tasksOpen} onClose={() => setTasksOpen(false)} PaperProps={{ sx: { width: 380, p: 4, display: 'flex', flexDirection: 'column', gap: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Checklist Tasks</Typography>
        <Divider />
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <List>
            {Object.entries(curriculumData)
              .filter(([day]) => day !== '0' && day !== 0)
              .map(([day, task]) => {
                const dayNumItem = parseInt(day);
                return (
                  <ListItem key={day} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton onClick={() => { setTasksOpen(false); handleCardClick(dayNumItem); }} sx={{ borderRadius: 2 }}>
                      <Checkbox checked={task.completed} onClick={(e) => { e.stopPropagation(); handleToggleProgress(dayNumItem, !task.completed); }} />
                      <ListItemText primary={`Day ${day}: ${task.title}`} primaryTypographyProps={{ sx: { fontSize: '0.8rem', fontWeight: 700 } }} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
