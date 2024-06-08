import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IAnswerAttachmentProps {
  answerId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends BaseEntity<IAnswerAttachmentProps> {
  get answerId(): UniqueEntityId {
    return this.props.answerId;
  }

  get attachmentId(): UniqueEntityId {
    return this.props.attachmentId;
  }

  static create(props: IAnswerAttachmentProps, id?: UniqueEntityId): AnswerAttachment {
    const answerAttachment = new AnswerAttachment(props, id);

    return answerAttachment;
  }
}
