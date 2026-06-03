export type Operator = '+' | '-' | '*' | '/';

export interface ScrollParams {
  operators: Operator[];
  minNumber: number;
  maxNumber: number;
  questionCount: number;
}

export interface Rune {
  id: string;
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
}

export interface SpellRecord {
  id: string;
  date: string;
  mathemagicianId: string;
  params: ScrollParams;
  timeTakenSeconds: number;
  score: number;
  totalQuestions: number;
}

export interface Mathemagician {
  id: string;
  name: string;
}
