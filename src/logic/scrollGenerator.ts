import type { ScrollParams, Rune } from '../types';

export const generateScroll = (params: ScrollParams): Rune[] => {
  const runes: Rune[] = [];
  const { operators, minNumber, maxNumber, questionCount } = params;

  for (let i = 0; i < questionCount; i++) {
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1: number;
    let num2: number;
    let answer: number;

    switch (operator) {
      case '+':
        num1 = getRandomInt(minNumber, maxNumber);
        num2 = getRandomInt(minNumber, maxNumber);
        answer = num1 + num2;
        break;
      case '-':
        num1 = getRandomInt(minNumber, maxNumber);
        num2 = getRandomInt(minNumber, maxNumber);
        answer = num1 - num2;
        break;
      case '*':
        num1 = getRandomInt(minNumber, maxNumber);
        num2 = getRandomInt(minNumber, maxNumber);
        answer = num1 * num2;
        break;
      case '/':
        // Ensure integer result and no division by zero
        // num2 * answer = num1
        num2 = getRandomInt(minNumber, maxNumber);
        if (num2 === 0) num2 = 1; // Basic safeguard
        answer = getRandomInt(minNumber, maxNumber);
        num1 = num2 * answer;
        break;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }

    runes.push({
      id: crypto.randomUUID(),
      num1,
      num2,
      operator,
      answer,
    });
  }

  return runes;
};

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
