import { Question } from '../../enterprise/entities/question';

export interface IQuestionsRepository {
  findById(id: string): Promise<Question | undefined>;
  findBySlug(slug: string): Promise<Question | undefined>;
  create(question: Question): Promise<void>;
  update(question: Question): Promise<void>;
  deleteById(id: string): Promise<void>;
}
