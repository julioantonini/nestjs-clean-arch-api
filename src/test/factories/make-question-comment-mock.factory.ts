import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { IQuestionCommentProps, QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { faker } from '@faker-js/faker';

export class MakeQuestionCommentMockFactory {
  public static create(override: Partial<IQuestionCommentProps> = {}, id?: UniqueEntityId): QuestionComment {
    const question = QuestionComment.create(
      {
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override,
      },
      id,
    );

    return question;
  }
}
