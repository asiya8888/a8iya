const questions = [
  "What's your name?",
  'How old are you?',
  'Where did you come from?',
  'What happened to you?',
  "What's outside?",
  'Are you alone?',
];

export function randomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}
