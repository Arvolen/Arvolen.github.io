// Featured projects get a full case-study row with an interactive demo; the rest are cards.
// `accent` picks one of the accent colours defined in index.css.
// `cover` draws the card artwork: an emoji over a two-colour gradient.

export const featured = [
  {
    id: 'fitness',
    year: '2025',
    subtitle: 'AI personal trainer in your pocket',
    cover: { emoji: '🏋️', from: '#ff7a45', to: '#ffb547' },
    code: '01',
    title: 'Virtual Fitness Coach',
    kind: 'AI / ML · Mobile',
    accent: 'signal',
    tagline: 'A Flutter app with a personal trainer inside it — it watches your form, recognises your food and your gym equipment, and talks back.',
    problem:
      'Beginners training alone have nobody to check their form, count their calories or explain the machine in front of them. I wanted one app that does all three with models I trained myself.',
    highlights: [
      'Pose correction: MoveNet extracts 17 body keypoints per frame, then Dynamic Time Warping compares your rep against reference recordings for push-ups, squats, hammer curls and shoulder presses.',
      'Food and gym-equipment recognition with ResNet-50 networks implemented and trained from scratch in PyTorch — about 85% average accuracy across the models.',
      'VitCoach, a Gemini-powered chat coach that reads your profile (age, weight, goal, activity level) and politely refuses to drift off-topic.',
      'Gamification layer with XP, levels and daily goals, plus workout and food logs charted over time.',
    ],
    pipeline: ['Flutter app', 'Django REST API', 'MoveNet + DTW · ResNet-50', 'Gemini', 'SQLite'],
    stack: ['Flutter', 'Dart', 'Python', 'Django REST', 'PyTorch', 'TensorFlow Hub', 'Gemini API', 'SQLite'],
    stats: [
      { value: '~85%', label: 'avg. model accuracy' },
      { value: '4', label: 'exercises with form feedback' },
      { value: '3', label: 'custom-trained models' },
    ],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/Arvolen/Virtual-Fitness-Coach' }],
  },
  {
    id: 'saveplate',
    year: '2025',
    subtitle: 'Surplus food → people who need it',
    cover: { emoji: '🍱', from: '#2f8f5b', to: '#9ad17a' },
    code: '02',
    title: 'SavePlate',
    kind: 'Cloud · Full-stack',
    accent: 'leaf',
    tagline: 'A cloud platform that moves surplus food from restaurants to NGOs and people who need it, before it becomes waste.',
    problem:
      'Restaurants throw away edible food every night while food banks run short. SavePlate gives vendors a two-minute way to list surplus and lets NGOs and consumers claim it.',
    highlights: [
      'Three roles — vendors list food, NGOs and consumers claim it, admins approve new accounts — each with its own dashboard and permissions.',
      'React + Vite frontend hosted on Amazon S3; Django REST backend on Amazon EC2 behind an Nginx reverse proxy with Gunicorn as the WSGI server.',
      'DynamoDB for a scalable data layer and Amazon SNS to email subscribers the moment new food is listed.',
      'Also maintained as a fully local edition (SQLite, no cloud account needed) so anyone can run it on a laptop.',
    ],
    pipeline: ['React on S3', 'Nginx', 'Gunicorn + Django on EC2', 'DynamoDB', 'SNS alerts'],
    stack: ['React', 'Vite', 'Material UI', 'Django REST', 'AWS S3', 'AWS EC2', 'DynamoDB', 'SNS', 'Nginx', 'Gunicorn'],
    stats: [
      { value: '4', label: 'user roles' },
      { value: '4', label: 'AWS services' },
      { value: '2', label: 'editions: cloud + local' },
    ],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/Arvolen/AWS-SavePlate' }],
  },
  {
    id: 'chinesecard',
    year: '2026',
    subtitle: 'Mandarin flashcards that check your tones',
    cover: { emoji: '汉', from: '#b8322a', to: '#e0a43a' },
    code: '03',
    title: 'ChineseCard',
    kind: 'Mobile · Learning',
    accent: 'cinnabar',
    tagline: 'An Android flashcard app for Mandarin that makes you type the answer — and is kind about your tones.',
    problem:
      'Flip-card apps let you fool yourself into thinking you know a word. I built one for my own HSK study that checks what you actually type and schedules each card with spaced repetition.',
    highlights: [
      'SM-2 spaced repetition, tracked separately for recognition (汉字 → pinyin + meaning) and production (meaning → 汉字 + pinyin).',
      'A pinyin normaliser that accepts any input style — ni3, nǐ, nv3 or plain ni — and returns a distinct "right letters, wrong tones" verdict instead of a flat fail.',
      'Mandarin text-to-speech, fill-in-the-blank sentence drills, study streaks, daily reminders, card details with character breakdowns, and export/import backups.',
      'Fully offline on SQLite with an "Ink & Cinnabar" dark theme and a light "Paper" theme; 99 Jest tests over the pure logic; shipped as an APK via EAS Build.',
    ],
    pipeline: ['Typed answer', 'Pinyin normaliser', 'Compare: correct / tones-off / wrong', 'SM-2 scheduler', 'SQLite'],
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Zustand', 'Jest', 'EAS Build'],
    stats: [
      { value: '99', label: 'unit tests' },
      { value: '2', label: 'study directions per card' },
      { value: 'HSK 1–5', label: 'deck structure' },
    ],
    links: [],
  },
]

export const more = [
  {
    id: 'leads',
    year: '2026',
    cover: { emoji: '🧲', from: '#5b6cff', to: '#9fb2ff' },
    title: 'AI Lead Manager',
    kind: 'LLM · Full-stack',
    blurb:
      'Lead-tracking app that pulls the real source out of messy sales notes: keyword rules first, Gemini 2.5 Flash only as a fallback to save quota. Seeds 2,000+ leads in parallel with bulk inserts, and finds duplicates with fuzzy matching, blocking by phone and company domain to avoid O(N²) comparisons.',
    stack: ['Django REST', 'React', 'Gemini', 'rapidfuzz'],
    href: 'https://github.com/Arvolen/AI_Leads_THA_-ARLEN',
  },
  {
    id: 'crypto',
    year: '2024',
    cover: { emoji: '📈', from: '#141a2e', to: '#3d5afe' },
    title: 'Crypto Data Analytics Website',
    kind: 'Full-stack · Internship',
    blurb:
      'Real-time cryptocurrency monitoring site built from scratch with its own UI, backend and database. Live prices over WebSockets, candlestick charts, scheduled cron jobs and a reverse proxy for security and traffic management.',
    stack: ['React', 'Next.js', 'Express', 'WebSockets', 'D3'],
    href: null,
  },
  {
    id: 'novelscrap',
    year: '2026',
    cover: { emoji: '📚', from: '#6b3fa0', to: '#d08bd6' },
    title: 'NovelScrap',
    kind: 'Full-stack · Mobile',
    blurb:
      'Personal web-novel reader: a Spring Boot scraper behind a pluggable source interface with polite rate limiting and fixture-based tests, a Next.js reading UI, and an Expo app that downloads novels over Wi-Fi to read fully offline.',
    stack: ['Spring Boot', 'Java 21', 'Jsoup', 'Next.js', 'Expo'],
    href: null,
  },
  {
    id: 'cardgame',
    year: 'Uni',
    cover: { emoji: '🃏', from: '#0f766e', to: '#5eead4' },
    title: 'Card Games for Learning to Code',
    kind: 'Game · Team project',
    blurb:
      'A card game teachers can use to explain programming theory in a playful way. Designed and built in C++ with a team of students, coordinated through GitHub.',
    stack: ['C++', 'Git'],
    href: null,
  },
]
