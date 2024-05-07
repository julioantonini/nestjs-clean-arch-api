import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Answer } from '../entities/answer';
import { IAnswersRepository } from '../repositories/answers-repository';

interface IAnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: IAnswersRepository) {}

  public async execute({ authorId, questionId, content }: IAnswerQuestionUseCaseRequest): Promise<Answer> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepository.create(answer);
    return answer;
  }
}
