import type { Question } from './types'

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What does the following JavaScript code print? console.log(typeof NaN)',
    options: ['number', 'NaN', 'undefined', 'object'],
    correctIndex: 0,
    explanation: 'NaN is a special numeric value; typeof NaN === "number".'
  },
  {
    id: 2,
    text: 'In HTTP, what does the status code 201 mean?',
    options: ['Successful request', 'Created', 'Unauthorized', 'No content'],
    correctIndex: 1,
    explanation: '201 Created indicates that a new resource was created as a result of the request.'
  },
  {
    id: 3,
    text: 'In Git, what command creates a new branch and switches to it?',
    options: ['git switch -c name', 'git branch name', 'git checkout', 'git init -b name'],
    correctIndex: 0,
    explanation: 'Since Git 2.23, git switch -c <name> creates and switches in one step.'
  },
  {
    id: 4,
    text: 'Which of these is NOT a primitive type in TypeScript?',
    options: ['string', 'tuple', 'boolean', 'symbol'],
    correctIndex: 1,
    explanation: 'tuple is a composite type (structure), not a primitive one.'
  },
  {
    id: 5,
    text: 'In CSS, what does flex: 1 do?',
    options: [
      'flex-grow: 1; flex-shrink: 0; flex-basis: 100%',
      'flex-grow: 1; flex-shrink: 1; flex-basis: 0%',
      'flex-grow: 0; flex-shrink: 1; flex-basis: auto',
      'flex-grow: 1; flex-shrink: 1; flex-basis: auto'
    ],
    correctIndex: 1,
    explanation: 'The shorthand flex: 1 is equivalent to 1 1 0% in most browsers.'
  },
  {
    id: 6,
    text: 'In SQL, what clause is used to filter results after a GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
    correctIndex: 1,
    explanation: 'HAVING filters aggregates; WHERE filters rows before grouping.'
  },
  {
    id: 7,
    text: 'Which data structure has average complexity O(1) for search?',
    options: ['Balanced binary search tree', 'Hash table', 'linked list', 'Heap'],
    correctIndex: 1,
    explanation: 'Hash tables offer average O(1) access with good hash function.'
  },
  {
    id: 8,
    text: 'In Node.js, which module is used to work with file paths?',
    options: ['fs', 'path', 'url', 'os'],
    correctIndex: 1,
    explanation: 'The "path" module handles paths; fs is for the file system.'
  },
  {
    id: 9,
    text: 'Which keyword in Java prevents a class from being inherited?',
    options: ['final', 'static', 'sealed', 'const'],
    correctIndex: 0,
    explanation: 'In Java, final prevents class inheritance and method overrides.'
  },
  {
    id: 10,
    text: 'In networking, what protocol resolves IP addresses to MAC addresses on a LAN?',
    options: ['DNS', 'ARP', 'ICMP', 'DHCP'],
    correctIndex: 1,
    explanation: 'ARP (Address Resolution Protocol) resolves IP -> MAC on the local network.'
  }
]
