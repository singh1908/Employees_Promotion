const metrics = [
  "employeeID", 
  "employeeName",
  "developmentFrequency",
  "leadTime",
  "cycleTime",
  "leadTimeChanges",
  "velocity",
  "workInProgress",
  "failureRate",
  "restoreTime",
  "csat",
  "peerRating"
];

const names = [
  "John Smith", "Jane Doe", "Michael Johnson", "Emily Davis", "Chris Brown", "Sarah Wilson", "David Martinez", "Jessica Garcia", "Daniel Lee", "Laura Anderson",
  "James White", "Olivia Harris", "Robert Clark", "Sophia Lewis", "William Walker", "Isabella Hall", "Joseph Young", "Mia Allen", "Charles King", "Emma Wright",
  "Henry Scott", "Ava Green", "Samuel Adams", "Grace Baker", "Alexander Nelson", "Madison Carter", "Daniel Perez", "Chloe Roberts", "Ethan Campbell", "Natalie Stewart",
  "Andrew Flores", "Victoria Sanchez", "Benjamin Mitchell", "Hannah Morris", "Christopher Rogers", "Lily Reed", "Joshua Cook", "Zoe Bell", "Ryan Morgan", "Lucy Murphy",
  "Jacob Cooper", "Amelia Rivera", "Nathan Peterson", "Ella Bailey", "Jonathan Reed", "Scarlett Cox", "Christian Howard", "Layla Richardson", "Nicholas Watson", "Samantha Price",
  "Dylan Brooks", "Leah Wood", "Caleb Bennett", "Penelope Gray", "Owen Hughes", "Lillian Sanders", "Gabriel Bryant", "Aubrey Ross", "Isaac Jenkins", "Aria Foster",
  "Luke Powell", "Eleanor Long", "Hunter Patterson", "Stella Coleman", "Cameron Perry", "Hazel James", "Jordan Russell", "Addison Griffin", "Brayden Ward", "Zoey Watson",
  "Adam Torres", "Nora Butler", "Adrian Simmons", "Brooklyn Barnes", "Colton Fisher", "Ellie Powell", "Julian Myers", "Violet Evans", "Aaron Stewart", "Peyton Sullivan",
  "Connor Bryant", "Maya Morris", "Jeremiah Hughes", "Savannah Scott", "Evan Green", "Skylar Cooper", "Angel Campbell", "Genesis Clark", "Miles Collins", "Paisley Rogers",
  "Carson Murphy", "Brielle Reed", "Easton Watson", "Nevaeh Gray", "Xavier Jenkins", "Anna Long", "Jose Flores", "Sadie Hughes", "Dominic Turner", "Alexa Perry"
];

const employees = Array.from({ length: 100 }, (_, index) => ({
  employeeID: `EMP${index + 1}`,
  employeeName: names[index % names.length],
  developmentFrequency: Math.floor(Math.random() * 50) + 1, // Number of commits per month
  leadTime: Math.floor(Math.random() * 30) + 1, // Days to complete a task
  cycleTime: Math.floor(Math.random() * 15) + 1, // Days from start to delivery
  leadTimeChanges: Math.floor(Math.random() * 10) + 1, // Frequency of lead time variations
  velocity: Math.floor(Math.random() * 20) + 1, // Features delivered per sprint
  workInProgress: Math.floor(Math.random() * 5) + 1, // Tasks in progress
  failureRate: parseFloat((Math.random() * 10).toFixed(2)), // Converted to number
  restoreTime: Math.floor(Math.random() * 24) + 1, // Hours to fix a failure
  csat: parseFloat((Math.random() * 5).toFixed(2)), // Converted to number
  peerRating: parseFloat((Math.random() * 5).toFixed(2)) // Converted to number
}));

console.log(JSON.stringify(employees, null, 2));
