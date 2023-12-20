import { BaseEntity } from '../../core/entities/base.entity';

interface IAnswerProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer extends BaseEntity<IAnswerProps> {
  get contet() {
    return this.props.content;
  }
}
