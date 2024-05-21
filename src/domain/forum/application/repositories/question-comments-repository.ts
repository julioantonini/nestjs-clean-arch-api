import { IPaginationParams } from '@/core/repositories/pagination-params';

import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface IQuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | undefined>;
  findManyByQuestionId(questionId: string, params: IPaginationParams): Promise<QuestionComment[]>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
