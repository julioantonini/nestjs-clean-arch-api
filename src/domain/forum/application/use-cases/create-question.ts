import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Question } from '../../enterprise/entities/question';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { IQuestionsRepository } from '../repositories/questions-repository';

interface ICreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type ICreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionsRepository) {}

  public async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({ authorId: new UniqueEntityId(authorId), title, content });

    const questionId = question.id;
    const questionAttachments = attachmentsIds.map(attachmentId =>
      QuestionAttachment.create({ attachmentId: new UniqueEntityId(attachmentId), questionId }),
    );

    question.attachments = questionAttachments;

    await this.questionRepository.create(question);

    return right({ question });
  }
}
