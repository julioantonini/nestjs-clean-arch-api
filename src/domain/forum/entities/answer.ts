import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface IAnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends BaseEntity<IAnswerProps> {
  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get questionId(): UniqueEntityId {
    return this.props.questionId;
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

  get excerpt(): string {
    return this.content.substring(0, 120).trim().concat('...');
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<IAnswerProps, 'createdAt'>, id?: UniqueEntityId): Answer {
    const answer = new Answer({ ...props, createdAt: new Date() }, id);
    return answer;
  }
}
