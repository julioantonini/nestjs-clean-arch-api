import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { IQuestionProps, Question } from '@/domain/forum/entities/question';
import { faker } from '@faker-js/faker';

export class makeQuestionMockFactory {
  public static create(override: Partial<IQuestionProps> = {}, id?: UniqueEntityId): Question {
    const question = Question.create(
      {
        authorId: new UniqueEntityId(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        ...override,
      },
      id,
    );
    return question;
  }
}
