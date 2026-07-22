// Achievements definition dataset with 52 entries
export const ACHIEVEMENTS = [
  { id: 'day0', title: 'First Lesson Completed', desc: 'Completed the Day 0 CS Roadmap warmup.', category: 'Lessons', xp: 50, icon: '🚀' },
  { id: 'day1', title: 'Variables Master', desc: 'Completed Day 1: Scope rules and memory models.', category: 'Lessons', xp: 100, icon: '📦' },
  { id: 'day2', title: 'Array Master', desc: 'Completed Day 2: Dynamic arrays resizing internals.', category: 'Lessons', xp: 100, icon: '📊' },
  { id: 'day3', title: 'String Carver', desc: 'Completed Day 3: Custom substring searches.', category: 'Lessons', xp: 100, icon: '🧵' },
  { id: 'day4', title: 'Recursion Master', desc: 'Completed Day 4: Call stack trace and recursion.', category: 'Lessons', xp: 100, icon: '🌀' },
  { id: 'day5', title: 'Node Linker', desc: 'Completed Day 5: Singly Linked List pointer operations.', category: 'Lessons', xp: 100, icon: '🔗' },
  { id: 'day6', title: 'Binary Searcher', desc: 'Completed Day 6: Sorting and Binary Search.', category: 'Lessons', xp: 100, icon: '🔍' },
  { id: 'day7', title: 'OOP Champion', desc: 'Completed Day 7: Encapsulated banking objects.', category: 'Lessons', xp: 100, icon: '🛡️' },
  { id: 'day8', title: 'Stack & Queue Master', desc: 'Completed Day 8: Bracket validator and FIFO buffers.', category: 'Lessons', xp: 100, icon: '🥞' },
  { id: 'day9', title: 'Hash Mapper', desc: 'Completed Day 9: Custom polynomial hash mapping.', category: 'Lessons', xp: 100, icon: '🔑' },
  { id: 'day10', title: 'Tree Explorer', desc: 'Completed Day 10: Depth-First recursive traversals.', category: 'Lessons', xp: 100, icon: '🌳' },
  { id: 'day11', title: 'BST Warden', desc: 'Completed Day 11: Ordered Binary Search Trees.', category: 'Lessons', xp: 100, icon: '🪴' },
  { id: 'day12', title: 'Graph Expert', desc: 'Completed Day 12: Graph adjacency BFS traversal.', category: 'Lessons', xp: 100, icon: '🕸️' },
  { id: 'day13', title: 'File Explorer', desc: 'Completed Day 13: Robust file streams log parser.', category: 'Lessons', xp: 100, icon: '📁' },
  { id: 'day14', title: 'CPU Scheduler', desc: 'Completed Day 14: FCFS and Round Robin simulator.', category: 'Lessons', xp: 100, icon: '⏱️' },
  { id: 'day15', title: 'Thread Spawner', desc: 'Completed Day 15: Concurrency and basics threads.', category: 'Lessons', xp: 100, icon: '🧵' },
  { id: 'day16', title: 'Mutex Guardian', desc: 'Completed Day 16: Thread synchronization locks.', category: 'Lessons', xp: 100, icon: '🔒' },
  { id: 'day17', title: 'Cache Specialist', desc: 'Completed Day 17: FIFO Cache replacement logic.', category: 'Lessons', xp: 100, icon: '⚡' },
  { id: 'day18', title: 'RLE Compressor', desc: 'Completed Day 18: Lossless Run-Length Encoding.', category: 'Lessons', xp: 100, icon: '🗜️' },
  { id: 'day19', title: 'Socket Binder', desc: 'Completed Day 19: Low-level client-server sockets.', category: 'Lessons', xp: 100, icon: '🔌' },
  { id: 'day20', title: 'Server Multiplexor', desc: 'Completed Day 20: Handling sequential clients loop.', category: 'Lessons', xp: 100, icon: '⚙️' },
  { id: 'day21', title: 'HTTP Builder', desc: 'Completed Day 21: Serving raw HTTP response pages.', category: 'Lessons', xp: 100, icon: '🌐' },
  { id: 'day22', title: 'Backend Builder', desc: 'Completed Day 22: REST APIs and JSON endpoints.', category: 'Lessons', xp: 100, icon: '📡' },
  { id: 'day23', title: 'DNS Resolver', desc: 'Completed Day 23: Hostname IP address lookup.', category: 'Lessons', xp: 100, icon: '🗺️' },
  { id: 'day24', title: 'Cipher Guardian', desc: 'Completed Day 24: SHA-256 password salting.', category: 'Lessons', xp: 100, icon: '🔐' },
  { id: 'day25', title: 'Database Architect', desc: 'Completed Day 25: SQL tables schemas.', category: 'Lessons', xp: 100, icon: '🗄️' },
  { id: 'day26', title: 'Relational Joineer', desc: 'Completed Day 26: SQL multi-table joins.', category: 'Lessons', xp: 100, icon: '🤝' },
  { id: 'day27', title: 'B-Tree Indexer', desc: 'Completed Day 27: Optimized index lookups.', category: 'Lessons', xp: 100, icon: '📇' },
  { id: 'day28', title: 'KV Storekeeper', desc: 'Completed Day 28: Flat disk key-value database.', category: 'Lessons', xp: 100, icon: '💾' },
  { id: 'day29', title: 'MVC Architect', desc: 'Completed Day 29: Decoupled model-view controller.', category: 'Lessons', xp: 100, icon: '🏛️' },
  { id: 'day30', title: 'System Design Expert', desc: 'Completed Day 30: Rate limiting algorithms.', category: 'Lessons', xp: 100, icon: '🛡️' },

  // Streaks
  { id: 'streak_7', title: '7-Day Streak', desc: 'Completed 7 days of lessons.', category: 'Streaks', xp: 200, icon: '🔥' },
  { id: 'streak_14', title: '14-Day Streak', desc: 'Completed 14 days of lessons.', category: 'Streaks', xp: 400, icon: '🌋' },
  { id: 'streak_30', title: '30-Day Streak', desc: 'Completed all 30 days of lessons.', category: 'Streaks', xp: 1000, icon: '👑' },

  // Quizzes
  { id: 'quiz_master', title: 'Quiz Master', desc: 'Answered 5 quiz questions correctly.', category: 'Quizzes', xp: 100, icon: '🎓' },
  { id: 'quiz_deity', title: 'Quiz Deity', desc: 'Answered 20 quiz questions correctly.', category: 'Quizzes', xp: 300, icon: '🔮' },
  { id: 'perfect_quiz', title: 'Perfect Quiz Score', desc: 'Achieved a perfect score in any active quiz module.', category: 'Quizzes', xp: 150, icon: '🎯' },

  // Projects
  { id: 'project_builder', title: 'Project Builder', desc: 'Saved progress or coded on any recommended project.', category: 'Projects', xp: 200, icon: '🔨' },
  { id: 'project_champion', title: 'Project Champion', desc: 'Completed 3 buildable projects from scratch.', category: 'Projects', xp: 500, icon: '🏅' },
  { id: 'project_legend', title: 'Project Legend', desc: 'Completed 7 buildable projects from scratch.', category: 'Projects', xp: 1000, icon: '🎖️' },

  // Practice Problems
  { id: 'easy_solver', title: 'Algorithm Solver', desc: 'Solved an easy related practice problem.', category: 'Practice', xp: 100, icon: '🧩' },
  { id: 'medium_solver', title: 'Intermediate Solver', desc: 'Solved 3 medium practice problems.', category: 'Practice', xp: 250, icon: '🧠' },
  { id: 'hard_solver', title: 'Advanced Architect', desc: 'Solved 1 hard practice problem.', category: 'Practice', xp: 500, icon: '🦾' },

  // Study Habits & Extra Goals
  { id: 'night_owl', title: 'Night Owl', desc: 'Completed a study task late at night (between 10 PM and 4 AM).', category: 'Habits', xp: 100, icon: '🦉' },
  { id: 'weekend_warrior', title: 'Weekend Learner', desc: 'Completed a study task on a Saturday or Sunday.', category: 'Habits', xp: 100, icon: '⛺' },
  { id: 'fast_learner', title: 'Fast Learner', desc: 'Run sandbox code successfully within 5 minutes of loading a lesson.', category: 'Habits', xp: 150, icon: '⚡' },
  { id: 'persistent_coder', title: 'Persistent Learner', desc: 'Ran code that returned an error, fixed it, and compiled successfully.', category: 'Habits', xp: 200, icon: '🛡️' },
  { id: 'note_taker', title: 'Active Note Taker', desc: 'Wrote and saved custom notes for at least 5 lessons.', category: 'Habits', xp: 150, icon: '📝' },
  { id: 'interview_ready', title: 'Interview Ready', desc: 'Reviewed placement prep questions across 5 core topics.', category: 'Habits', xp: 300, icon: '💼' },
  { id: 'xp_lvl1', title: 'CS Initiate', desc: 'Earned 500 total Experience Points.', category: 'XP Levels', xp: 100, icon: '🌟' },
  { id: 'xp_lvl2', title: 'Knowledge Explorer', desc: 'Earned 1500 total Experience Points.', category: 'XP Levels', xp: 250, icon: '✨' },
  { id: 'xp_lvl3', title: 'Full Stack Scholar', desc: 'Earned 3000 total Experience Points.', category: 'XP Levels', xp: 500, icon: '💫' }
];

// Helper to check which achievements are unlocked
export const checkUnlockedAchievements = (stats) => {
  // stats: { completedDays: Array of ints, streak: int, totalXp: int, quizzesSolved: int, projectsCompleted: int, notesCount: int, codeRunsCount: int }
  const unlocked = new Set();
  const cDays = stats.completedDays || [];
  
  // Day by day completions
  cDays.forEach(day => {
    unlocked.add(`day${day}`);
  });
  
  // Day 0 check
  if (cDays.includes(0)) unlocked.add('day0');
  
  // Streaks
  const numCompleted = cDays.filter(d => d !== 0).length;
  if (numCompleted >= 7) unlocked.add('streak_7');
  if (numCompleted >= 14) unlocked.add('streak_14');
  if (numCompleted >= 30) unlocked.add('streak_30');
  
  // Quiz
  const qSolved = stats.quizzesSolved || 0;
  if (qSolved >= 1) unlocked.add('perfect_quiz');
  if (qSolved >= 5) unlocked.add('quiz_master');
  if (qSolved >= 20) unlocked.add('quiz_deity');
  
  // Projects
  const pComp = stats.projectsCompleted || 0;
  if (pComp >= 1) unlocked.add('project_builder');
  if (pComp >= 3) unlocked.add('project_champion');
  if (pComp >= 7) unlocked.add('project_legend');
  
  // Habits/Notes/Runs
  if (stats.codeRunsCount >= 1) unlocked.add('easy_solver');
  if (stats.codeRunsCount >= 5) unlocked.add('medium_solver');
  if (stats.codeRunsCount >= 10) unlocked.add('hard_solver');
  
  if (stats.studyAtNight) unlocked.add('night_owl');
  if (stats.studyOnWeekend) unlocked.add('weekend_warrior');
  if (stats.quickCompile) unlocked.add('fast_learner');
  if (stats.fixedError) unlocked.add('persistent_coder');
  if ((stats.notesCount || 0) >= 5) unlocked.add('note_taker');
  if (stats.reviewedPrepCount >= 5) unlocked.add('interview_ready');
  
  // XP Levels
  const currentXp = stats.totalXp || 0;
  if (currentXp >= 500) unlocked.add('xp_lvl1');
  if (currentXp >= 1500) unlocked.add('xp_lvl2');
  if (currentXp >= 3000) unlocked.add('xp_lvl3');
  
  return unlocked;
};
