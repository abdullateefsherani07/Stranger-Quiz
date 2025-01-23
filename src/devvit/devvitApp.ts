import { Devvit } from '@devvit/public-api';
import { quizData } from '../utils/quizData';

const devvit = new Devvit();

devvit.addCustomPostType({
  name: 'stranger-things-quiz',
  render: (context) => {
    const quizMessage = `
      Let's play the Stranger Things quiz! 
      Question: ${quizData.question}
      Options:
      1. ${quizData.options[0]}
      2. ${quizData.options[1]}
      3. ${quizData.options[2]}
      4. ${quizData.options[3]}
      Type your answer as 'answer <option_number>'.
    `;

    devvit.respond(context, quizMessage);
  },
});

devvit.on('message', async (messageData) => {
  const { body, author } = messageData;
  const userAnswer = body.split(' ')[1];

  if (userAnswer) {
    const correctAnswer = quizData.correctAnswer;

    if (quizData.options[parseInt(userAnswer) - 1] === correctAnswer) {
      devvit.respond(messageData, `Correct, ${author}!`);
    } else {
      devvit.respond(messageData, `Wrong answer, ${author}! Try again.`);
    }
  }
});
