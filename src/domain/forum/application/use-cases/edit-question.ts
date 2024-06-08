import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Question } from '../../enterprise/entities/question';
import { IQuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IEditQuestionUseCaseRequest {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  title: string;
  content: string;
}

type IEditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class EditQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionsRepository) {}

  public async execute({
    questionId,
    authorId,
    title,
    content,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId.toString());

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId.toString() !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.update(question);

    return right({ question });
  }
}
