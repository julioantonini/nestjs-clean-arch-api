import { Answer } from '../../enterprise/entities/answer';

export interface IAnswersRepository {
  findById(id: string): Promise<Answer | undefined>;
  create(answer: Answer): Promise<void>;
  deleteById(id: string): Promise<void>;
}
