import { Devvit, useState } from '@devvit/public-api';

type WebViewMessage =
  | {
      type: 'initialData';
      data: { username: string; currentScore: number };
    }
  | {
      type: 'setScore';
      data: { newScore: number };
    }
  | {
      type: 'updateScore';
      data: { currentScore: number };
    };

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: 'Stranger Things Quiz',
  height: 'tall',
  render: (context) => {
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? 'anon';
    });

    const [score, setScore] = useState(async () => {
      const redisScore = await context.redis.get(`score_${context.postId}`);
      return Number(redisScore ?? 0);
    });

    const [questionIndex, setQuestionIndex] = useState(0);
    const questions = [
      {
        question: "Who is the main character in Stranger Things?",
        options: ["Mike Wheeler", "Eleven", "Dustin Henderson", "Lucas Sinclair"],
        answer: "Eleven",
      },
      {
        question: "What is the name of the parallel world in Stranger Things?",
        options: ["The Abyss", "The Underworld", "The Upside Down", "The Dark Zone"],
        answer: "The Upside Down",
      },
      // Add more questions here
    ];

    const onAnswer = (selectedAnswer: string) => {
      if (selectedAnswer === questions[questionIndex].answer) {
        setScore((prevScore) => prevScore + 1);
        context.ui.webView.postMessage('myWebView', {
          type: 'updateScore',
          data: { currentScore: score + 1 },
        });
      }
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        // Quiz ends, you can display a result or a restart option
        context.ui.webView.postMessage('myWebView', {
          type: 'updateScore',
          data: { currentScore: score },
        });
      }
    };

    const onShowWebviewClick = () => {
      context.ui.webView.postMessage('myWebView', {
        type: 'initialData',
        data: {
          username: username,
          currentScore: score,
        },
      });
    };

    return (
      <vstack grow padding="small">
        <vstack
          grow
          alignment="middle center"
        >
          <text size="xlarge" weight="bold">
            Stranger Things Quiz
          </text>
          <spacer />
          <vstack alignment="start middle">
            <hstack>
              <text size="medium">Username: {username}</text>
            </hstack>
            <hstack>
              <text size="medium">Score: {score}</text>
            </hstack>
            <hstack>
              <text size="medium">{questions[questionIndex].question}</text>
            </hstack>
            <hstack>
              {questions[questionIndex].options.map((option, index) => (
                <button key={index} onPress={() => onAnswer(option)}>
                  {option}
                </button>
              ))}
            </hstack>
          </vstack>
          <spacer />
          <button onPress={onShowWebviewClick}>Launch Quiz</button>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
