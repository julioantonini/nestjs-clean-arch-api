import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Question } from '../../enterprise/entities/question';
import { IQuestionsRepository } from '../repositories/questions-repository';

interface IEditQuestionUseCaseRequest {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  title: string;
  content: string;
}

interface IEditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionsRepository) {}

  public async execute({
    questionId,
    authorId,
    title,
    content,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId.toString());

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId.toString() !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.update(question);

    return { question };
  }
}
