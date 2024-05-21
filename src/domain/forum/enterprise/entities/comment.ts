import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface ICommentProps {
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class Comment<Props extends ICommentProps> extends BaseEntity<Props> {
  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get content(): string {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
}
