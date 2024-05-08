import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/entities/question';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  private items: Question[] = [];

  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.items.find(item => item.slug.value === slug);
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }
}
