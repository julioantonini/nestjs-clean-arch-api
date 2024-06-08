import { Either, left, right } from '@/core/either';

import { IQuestionCommentsRepository } from '../repositories/question-comments-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IDeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type IDeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, object>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: IQuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseRequest): Promise<IDeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
