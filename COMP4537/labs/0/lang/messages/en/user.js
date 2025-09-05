//Messages used in the game, depending on the status of game
const MESSAGES = {
  idle: "How many buttons to create?",
  showing: "Memorize the order…",
  scrambling: (k, n) => `Scrambling ${k}/${n}…`,
  answering: "Now click the buttons in order!",
  error: "Please enter a whole number between 3 and 7.",
  starting: (n) => `Starting game with ${n} button(s)…`,
  success: "Excellent memory!",
  failure: "Wrong order!"
};
