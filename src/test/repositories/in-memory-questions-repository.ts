import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  private items: Question[] = [];

  async findById(id: string): Promise<Question | undefined> {
    return this.items.find(item => item.id.toString() === id);
  }

  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.items.find(item => item.slug.value === slug);
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async deleteById(id: string): Promise<void> {
    const currentIdx = this.items.findIndex(item => item.id.toString() === id);
    this.items.splice(currentIdx, 1);
  }
}
