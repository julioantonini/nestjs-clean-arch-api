import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface IDeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface IDeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<IDeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error('Answer not found');
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
