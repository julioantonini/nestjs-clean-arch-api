import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Answer } from '../../enterprise/entities/answer';
import { IAnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IEditAnswerUseCaseRequest {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
  content: string;
}

type IEditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>;

export class EditAnswerUseCase {
  constructor(private readonly answerRepository: IAnswersRepository) {}

  public async execute({
    answerId,
    authorId,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId.toString() !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answerRepository.update(answer);

    return right({ answer });
  }
}
