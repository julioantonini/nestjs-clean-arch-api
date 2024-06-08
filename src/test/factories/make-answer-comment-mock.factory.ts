import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerComment, IAnswerCommentProps } from '@/domain/forum/enterprise/entities/answer-comment';
import { faker } from '@faker-js/faker';

export class MakeAnswerCommentMockFactory {
  public static create(override: Partial<IAnswerCommentProps> = {}, id?: UniqueEntityId): AnswerComment {
    const answer = AnswerComment.create(
      {
        authorId: new UniqueEntityId(),
        answerId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override,
      },
      id,
    );

    return answer;
  }
}
