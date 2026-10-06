// Edit this file to update your personal details.
// Set a link to null to hide it from the site.

export const profile = {
  name: 'Arlen',
  initials: 'AR',
  role: 'AI & Full-stack Engineer',
  location: 'Indonesia',
  status: 'Open to full-time roles',
  photo: './arlen.jpg',
  // Words wrapped in **double asterisks** are drawn in bold.
  headline: 'Computer Science graduate building **AI-powered apps** and the **full-stack systems** that ship them.',
  intro:
    'I build things where the AI is the useful part: a coach that checks your squat, a flashcard app that knows what you are about to forget, and a platform that gets surplus food to people who need it.',
  about: [
    'I recently graduated in Computer Science (Intelligent Systems) from Asia Pacific University of Technology & Innovation. Along the way I trained image models from scratch, deployed a Django app on AWS, and interned as a full-stack & blockchain developer.',
    'I am comfortable across the stack — Python and Django on the back, React, React Native and Flutter on the front, and AWS or a plain Linux box with Nginx to put it all online.',
    'Right now I am building side projects, studying Mandarin with an app I wrote myself, and looking for my first full-time engineering role.',
  ],
  stats: [
    { value: '3.4', label: 'GPA · B.Sc. Computer Science' },
    { value: '7', label: 'projects shipped' },
    { value: '3', label: 'AI models trained from scratch' },
    { value: '1', label: 'internship' },
  ],
  links: {
    email: 'arlenlie123@gmail.com',
    github: 'https://github.com/Arvolen',
    linkedin: 'https://www.linkedin.com/in/arlen-lie',
    resume: null, // e.g. './Arlen-Resume.pdf' after placing the file in /public
  },
  spokenLanguages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Bahasa Indonesia', level: 'Fluent' },
    { name: 'Bahasa Melayu', level: 'Conversational' },
    { name: 'Mandarin Chinese', level: 'Learning' },
  ],
}

export const education = {
  school: 'Asia Pacific University of Technology & Innovation',
  degree: 'B.Sc. (Hons) Computer Science — Intelligent Systems',
  period: '2022 – 2025',
  detail: 'GPA 3.4',
}

// Shown as a vertical timeline, newest first.
export const journey = [
  {
    period: '2026 — now',
    title: 'Building & job hunting',
    org: 'Independent',
    points: [
      'Shipped ChineseCard, an offline Mandarin flashcard app with spaced repetition and 99 unit tests.',
      'Built an LLM-assisted lead manager and a Spring Boot + Expo reader app.',
    ],
    tags: ['React Native', 'TypeScript', 'Django', 'Gemini'],
  },
  {
    period: '2022 — 2025',
    title: 'B.Sc. Computer Science (Intelligent Systems)',
    org: 'Asia Pacific University of Technology & Innovation',
    points: [
      'Graduated with a GPA of 3.4.',
      'Built Virtual Fitness Coach — pose correction, food and gym-equipment recognition with models trained from scratch.',
      'Deployed SavePlate on AWS (S3, EC2, DynamoDB, SNS) behind Nginx and Gunicorn.',
    ],
    tags: ['PyTorch', 'TensorFlow', 'Flutter', 'AWS'],
  },
  {
    period: '2024',
    title: 'Full-stack & Blockchain Developer Intern',
    org: 'Blackswan Dapp Solution SDN BHD',
    points: [
      'Built and maintained web apps from scratch with React, Next.js, Express and Node.js in a GitHub team workflow.',
      'Developed real-time crypto market views — candlestick charts (D3, Lightweight Charts) fed over WebSockets.',
      'Worked on e-wallet, P2P trading and scheduled-job services, and blockchain tooling on Linux.',
    ],
    tags: ['React', 'Next.js', 'Express', 'WebSockets'],
  },
]

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const icon = (path) => `${DEV}/${path}.svg`

// `dark: true` marks black logos that need inverting in dark mode.
export const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', icon: icon('python/python-original') },
      { name: 'JavaScript', icon: icon('javascript/javascript-original') },
      { name: 'TypeScript', icon: icon('typescript/typescript-original') },
      { name: 'Java', icon: icon('java/java-original') },
      { name: 'Dart', icon: icon('dart/dart-original') },
      { name: 'C++', icon: icon('cplusplus/cplusplus-original') },
      { name: 'C#', icon: icon('csharp/csharp-original') },
      { name: 'SQL', icon: icon('azuresqldatabase/azuresqldatabase-original') },
    ],
  },
  {
    group: 'Frontend & Mobile',
    items: [
      { name: 'React', icon: icon('react/react-original') },
      { name: 'Next.js', icon: icon('nextjs/nextjs-original'), dark: true },
      { name: 'React Native', icon: icon('react/react-original') },
      { name: 'Expo', icon: icon('expo/expo-original'), dark: true },
      { name: 'Flutter', icon: icon('flutter/flutter-original') },
      { name: 'Vite', icon: icon('vitejs/vitejs-original') },
      { name: 'Material UI', icon: icon('materialui/materialui-original') },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Django', icon: icon('django/django-plain'), dark: true },
      { name: 'DRF', icon: icon('djangorest/djangorest-original'), dark: true },
      { name: 'Node.js', icon: icon('nodejs/nodejs-original') },
      { name: 'Express', icon: icon('express/express-original'), dark: true },
      { name: 'Spring Boot', icon: icon('spring/spring-original') },
      { name: 'WebSockets', icon: icon('socketio/socketio-original'), dark: true },
    ],
  },
  {
    group: 'AI / ML',
    items: [
      { name: 'PyTorch', icon: icon('pytorch/pytorch-original') },
      { name: 'TensorFlow', icon: icon('tensorflow/tensorflow-original') },
      { name: 'scikit-learn', icon: icon('scikitlearn/scikitlearn-original') },
      { name: 'NumPy', icon: icon('numpy/numpy-original') },
      { name: 'pandas', icon: icon('pandas/pandas-original'), dark: true },
      { name: 'Gemini API', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13/icons/googlegemini.svg', dark: true },
    ],
  },
  {
    group: 'Cloud & Data',
    items: [
      { name: 'AWS', icon: icon('amazonwebservices/amazonwebservices-plain-wordmark'), dark: true },
      { name: 'DynamoDB', icon: icon('dynamodb/dynamodb-original') },
      { name: 'Nginx', icon: icon('nginx/nginx-original') },
      { name: 'Gunicorn', icon: null },
      { name: 'SQLite', icon: icon('sqlite/sqlite-original') },
      { name: 'Linux', icon: icon('linux/linux-original') },
    ],
  },
  {
    group: 'Tools & Testing',
    items: [
      { name: 'Git', icon: icon('git/git-original') },
      { name: 'GitHub', icon: icon('github/github-original'), dark: true },
      { name: 'Jest', icon: icon('jest/jest-plain') },
    ],
  },
]
