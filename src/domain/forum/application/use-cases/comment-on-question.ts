import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { QuestionComment } from '../../enterprise/entities/question-comment';
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository';
import { IQuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface ICommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { questionComment: QuestionComment }>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: ICommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
