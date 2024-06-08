import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IQuestionAttachmentProps {
  questionId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class QuestionAttachment extends BaseEntity<IQuestionAttachmentProps> {
  get questionId(): UniqueEntityId {
    return this.props.questionId;
  }

  get attachmentId(): UniqueEntityId {
    return this.props.attachmentId;
  }

  static create(props: IQuestionAttachmentProps, id?: UniqueEntityId): QuestionAttachment {
    const questionAttachment = new QuestionAttachment(props, id);

    return questionAttachment;
  }
}
