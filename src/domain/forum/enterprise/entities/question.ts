import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import dayjs from 'dayjs';

import { QuestionAttachment } from './question-attachment';
import { Slug } from './value-objects/slug';

export interface IQuestionProps {
  authorId: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  bestAnswerId?: UniqueEntityId;
  attachments: QuestionAttachment[];
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<IQuestionProps> {
  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get slug(): Slug {
    return this.props.slug;
  }

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.props.bestAnswerId;
  }

  get attachments(): QuestionAttachment[] {
    return this.props.attachments;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3;
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trim().concat('...');
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<IQuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityId): Question {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props?.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return question;
  }
}
