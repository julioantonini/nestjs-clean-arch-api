import { IPaginationParams } from '@/core/repositories/pagination-params';

import { Answer } from '../../enterprise/entities/answer';

export interface IAnswersRepository {
  findById(id: string): Promise<Answer | undefined>;
  findManyByTopicId(questionId: string, params: IPaginationParams): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  update(answer: Answer): Promise<void>;
  deleteById(id: string): Promise<void>;
}
