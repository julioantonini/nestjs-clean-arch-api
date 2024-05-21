import { IPaginationParams } from '@/core/repositories/pagination-params';
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements IAnswersRepository {
  private items: Answer[] = [];

  async findById(id: string): Promise<Answer | undefined> {
    return this.items.find(item => item.id.toString() === id);
  }

  public async findManyByTopicId(questionId: string, { page }: IPaginationParams): Promise<Answer[]> {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async update(answer: Answer): Promise<void> {
    const currentIdx = this.items.findIndex(item => item.id.toString() === answer.id.toString());
    this.items[currentIdx] = answer;
  }

  async deleteById(id: string): Promise<void> {
    const currentIdx = this.items.findIndex(item => item.id.toString() === id);
    this.items.splice(currentIdx, 1);
  }
}
