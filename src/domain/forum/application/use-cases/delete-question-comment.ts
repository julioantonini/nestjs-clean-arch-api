import { IQuestionCommentsRepository } from '../repositories/question-comments-repository';

interface IDeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface IDeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: IQuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseRequest): Promise<IDeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error('Question not found');
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
