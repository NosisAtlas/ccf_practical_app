const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// Create an array 'events'
const events = [...new Set(gameEvents.values())];
console.log(events);

// remove the yellow card event from the game events log
console.log(gameEvents);
gameEvents.delete(64);
console.log(gameEvents);

// Print the following string to the console: "An event happened, on average, every 9 minutes"
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// Loop over the events and log them to the console
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min}: ${event}`);
}
