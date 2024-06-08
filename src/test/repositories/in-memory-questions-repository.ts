import { IPaginationParams } from '@/core/repositories/pagination-params';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  items: Question[] = [];

  async findById(id: string): Promise<Question | undefined> {
    return this.items.find(item => item.id.toString() === id);
  }

  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.items.find(item => item.slug.value === slug);
  }

  async findManyRecent({ page }: IPaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async update(question: Question): Promise<void> {
    const currentIdx = this.items.findIndex(item => item.id.toString() === question.id.toString());
    this.items[currentIdx] = question;
  }

  async deleteById(id: string): Promise<void> {
    const currentIdx = this.items.findIndex(item => item.id.toString() === id);
    this.items.splice(currentIdx, 1);
  }
}
