import { Question } from '../../entities/question';

export interface IQuestionsRepository {
  findBySlug(slug: string): Promise<Question | undefined>;
  create(question: Question): Promise<void>;
}
