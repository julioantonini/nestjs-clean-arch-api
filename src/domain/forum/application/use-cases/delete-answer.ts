import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { IAnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IDeleteAnswerUseCaseRequest {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
}

type IDeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, object>;

export class DeleteAnswerUseCase {
  constructor(private readonly answerRepository: IAnswersRepository) {}

  public async execute({ answerId, authorId }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId.toString() !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.deleteById(answer.id.toString());

    return right({});
  }
}
