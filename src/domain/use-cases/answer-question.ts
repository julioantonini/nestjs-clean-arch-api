import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswersRepository) {}

  public async execute({ authorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepository.create(answer);
    return answer;
  }
}
