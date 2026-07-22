// ==========================================================================
// 🗺️ 11 COMPREHENSIVE COMPUTER SCIENCE LEARNING PATHS (ROADMAP.SH + LEETCODE STYLE)
// ==========================================================================

export const getDayLearningPath = (day) => {
  const dayNum = parseInt(day);
  // Path 1: Programming Foundations
  if (dayNum === 0 || dayNum === 1 || dayNum === 3 || dayNum === 4) return 'path_1';
  // Path 2: Object Oriented Programming
  if (dayNum === 7) return 'path_2';
  // Path 3: Data Structures
  if (dayNum === 2 || dayNum === 5 || dayNum === 8 || dayNum === 9 || dayNum === 10 || dayNum === 11) return 'path_3';
  // Path 4: Algorithms
  if (dayNum === 6 || dayNum === 12 || dayNum === 18) return 'path_4';
  // Path 5: Operating Systems
  if (dayNum === 13 || dayNum === 14 || dayNum === 15 || dayNum === 16 || dayNum === 17) return 'path_5';
  // Path 6: Computer Networks
  if (dayNum === 19 || dayNum === 20 || dayNum === 23 || dayNum === 24) return 'path_6';
  // Path 7: Databases
  if (dayNum === 25 || dayNum === 26 || dayNum === 27 || dayNum === 28) return 'path_7';
  // Path 8: Backend Engineering
  if (dayNum === 21 || dayNum === 22) return 'path_8';
  // Path 9: System Design Basics
  if (dayNum === 30) return 'path_9';
  // Path 11: Projects
  if (dayNum === 29) return 'path_11';
  
  return 'path_10'; // Path 10: Interview Prep (default fallback)
};

export const LEARNING_PATHS = [
  {
    id: 'path_1',
    title: 'Programming Foundations',
    description: 'Master variables, call stacks, LEGB scopes, and basic math recursion.',
    time: '4 Lessons • 6 Hours',
    xp: 400,
    difficulty: 'Beginner',
    companies: ['Google', 'Amazon'],
    skills: ['Execution Flow', 'Call Stack Frames', 'LEGB Scopes'],
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
    iconName: 'code'
  },
  {
    id: 'path_2',
    title: 'Object Oriented Programming',
    description: 'Learn encapsulation, inheritance, interfaces, and protected variable states.',
    time: '1 Lesson • 2 Hours',
    xp: 200,
    difficulty: 'Beginner',
    companies: ['Microsoft', 'Adobe'],
    skills: ['Encapsulation', 'Inheritance', 'Abstraction'],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    iconName: 'book'
  },
  {
    id: 'path_3',
    title: 'Data Structures',
    description: 'Dive into dynamic arrays, linked lists, stacks, queues, hash tables, and BSTs.',
    time: '6 Lessons • 9 Hours',
    xp: 600,
    difficulty: 'Intermediate',
    companies: ['Meta', 'Uber', 'Netflix'],
    skills: ['Dynamic Array Resizing', 'Linked Lists', 'BST Node ordered traversal'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    iconName: 'storage'
  },
  {
    id: 'path_4',
    title: 'Algorithms',
    description: 'Learn bubble and selection sorting, recursive binary search, and graph traversal BFS.',
    time: '3 Lessons • 5 Hours',
    xp: 400,
    difficulty: 'Intermediate',
    companies: ['Google', 'Meta'],
    skills: ['Bubble Sort', 'Selection Sort', 'BFS Traversals'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    iconName: 'code'
  },
  {
    id: 'path_5',
    title: 'Operating Systems',
    description: 'Explore file descriptors, scheduling algorithms (FCFS/RR), multi-threading, locks, and page eviction caches.',
    time: '5 Lessons • 8 Hours',
    xp: 500,
    difficulty: 'Advanced',
    companies: ['Apple', 'Microsoft'],
    skills: ['Process Scheduling', 'Mutual Exclusion Locks', 'FIFO cache evictions'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    iconName: 'terminal'
  },
  {
    id: 'path_6',
    title: 'Computer Networks',
    description: 'Understand TCP client-server sockets, HTTP request anatomy, DNS resolving, and secure salting SHA-256 password storage.',
    time: '4 Lessons • 6 Hours',
    xp: 400,
    difficulty: 'Intermediate',
    companies: ['Cisco', 'Cloudflare'],
    skills: ['TCP Sockets', 'DNS Hostname mappings', 'Secure Salting Cryptography'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    iconName: 'dns'
  },
  {
    id: 'path_7',
    title: 'Databases',
    description: 'Build SQLite tables, join tables, group results, simulate B-tree index lookups, and design key-value disk storage engines.',
    time: '4 Lessons • 6 Hours',
    xp: 400,
    difficulty: 'Intermediate',
    companies: ['Oracle', 'Amazon'],
    skills: ['SQL Joins', 'HashMap Indexing speeds', 'Flat-file persistence'],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    iconName: 'storage'
  },
  {
    id: 'path_8',
    title: 'Backend Engineering',
    description: 'Write HTTP web servers, build JSON APIs, and implement request parsing logic.',
    time: '2 Lessons • 3 Hours',
    xp: 300,
    difficulty: 'Intermediate',
    companies: ['Atlassian', 'Stripe'],
    skills: ['Raw HTTP parsing', 'REST APIs', 'JSON serialization'],
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    iconName: 'dns'
  },
  {
    id: 'path_9',
    title: 'System Design Basics',
    description: 'Examine Token Bucket rate limiters, load balancing, API request scaling, and defenses.',
    time: '1 Lesson • 2 Hours',
    xp: 200,
    difficulty: 'Advanced',
    companies: ['Google', 'Netflix'],
    skills: ['Rate Limiters', 'Scaling Architecture', 'Request Protection'],
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    iconName: 'terminal'
  },
  {
    id: 'path_10',
    title: 'Interview Preparation',
    description: 'Review typical FAANG questions, mock MCQ interview quizzes, coding questions, and resume behavioral tips.',
    time: '10+ Questions',
    xp: 500,
    difficulty: 'Advanced',
    companies: ['FAANG List', 'Top SaaS'],
    skills: ['SaaS Technical rounds', 'Behavioral metrics', 'Cheat Sheets'],
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    iconName: 'book'
  },
  {
    id: 'path_11',
    title: 'Projects',
    description: 'Implement structural projects like the MVC Task Organizer, Calculator, Bank system, or URL Shortener with blueprints.',
    time: '4 Project Blueprints',
    xp: 800,
    difficulty: 'Advanced',
    companies: ['Portfolio builders'],
    skills: ['MVC Architectures', 'System Folder structuring', 'API Design'],
    gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    iconName: 'code'
  }
];
