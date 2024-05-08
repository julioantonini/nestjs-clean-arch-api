import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Question } from '../../enterprise/entities/question';
import { IQuestionsRepository } from '../repositories/questions-repository';

interface ICreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface ICreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionsRepository) {}

  public async execute({
    authorId,
    title,
    content,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({ authorId: new UniqueEntityId(authorId), title, content });

    await this.questionRepository.create(question);

    return { question };
  }
}
