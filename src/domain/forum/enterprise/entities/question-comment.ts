import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

import { Comment, ICommentProps } from './comment';

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get questionId(): UniqueEntityId {
    return this.props.questionId;
  }

  static create(props: Optional<IQuestionCommentProps, 'createdAt'>, id?: UniqueEntityId): QuestionComment {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return questionComment;
  }
}
