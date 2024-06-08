import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IAttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends BaseEntity<IAttachmentProps> {
  get title(): string {
    return this.props.title;
  }

  get link(): string {
    return this.props.link;
  }

  static create(props: IAttachmentProps, id?: UniqueEntityId): Attachment {
    const attachment = new Attachment(props, id);
    return attachment;
  }
}
