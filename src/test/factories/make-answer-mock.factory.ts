import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Answer, IAnswerProps } from '@/domain/forum/enterprise/entities/answer';
import { faker } from '@faker-js/faker';

export class makeAnswerMockFactory {
  public static create(override: Partial<IAnswerProps> = {}, id?: UniqueEntityId): Answer {
    const answer = Answer.create(
      {
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override,
      },
      id,
    );
    return answer;
  }
}
