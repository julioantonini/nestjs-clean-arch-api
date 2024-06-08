import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { IQuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IDeleteQuestionUseCaseRequest {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
}

type IDeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, object>;

export class DeleteQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionsRepository) {}

  public async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId.toString());

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId.toString() !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionRepository.deleteById(question.id.toString());

    return right({});
  }
}
