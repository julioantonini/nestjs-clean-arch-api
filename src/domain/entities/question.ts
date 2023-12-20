import { BaseEntity } from '../../core/entities/base.entity';
import { Slug } from './value-objects/slug';

interface IQuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question extends BaseEntity<IQuestionProps> {}
