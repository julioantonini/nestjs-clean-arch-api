import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { IAnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface ICommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answerComment: AnswerComment }>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: ICommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}
