import { IPaginationParams } from '@/core/repositories/pagination-params';

import { Question } from '../../enterprise/entities/question';

export interface IQuestionsRepository {
  findById(id: string): Promise<Question | undefined>;
  findBySlug(slug: string): Promise<Question | undefined>;
  findManyRecent(params: IPaginationParams): Promise<Question[]>;
  create(question: Question): Promise<void>;
  update(question: Question): Promise<void>;
  deleteById(id: string): Promise<void>;
}
