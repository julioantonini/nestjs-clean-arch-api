import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { IQuestionProps, Question } from '@/domain/forum/entities/question';

export class makeQuestionMockFactory {
  public static create(override: Partial<IQuestionProps> = {}): Question {
    const question = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Test question',
      content: 'Test question content',
      ...override,
    });
    return question;
  }
}
