import { Question } from '../../entities/question';

export interface IQuestionsRepository {
  create(question: Question): Promise<void>;
}
