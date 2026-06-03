export type Operator = '+' | '-' | '*' | '/';

export interface DrillParams {
  operators: Operator[];
  minNumber: number;
  maxNumber: number;
  questionCount: number;
}

export interface Problem {
  id: string;
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
}

export interface CampaignRecord {
  id: string;
  date: string;
  mathemagicianId: string;
  params: DrillParams;
  timeTakenSeconds: number;
  score: number;
  totalQuestions: number;
}

export interface Mathemagician {
  id: string;
  name: string;
}
