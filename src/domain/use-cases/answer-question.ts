import { Answer } from '../entities/answer';

interface AnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  public execute({ authorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ authorId, questionId, content });
    return answer;
  }
}
