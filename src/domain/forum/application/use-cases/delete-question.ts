import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { IQuestionsRepository } from '../repositories/questions-repository';

interface IDeleteQuestionUseCaseRequest {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionsRepository) {}

  public async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId.toString());

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId.toString() !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    await this.questionRepository.deleteById(question.id.toString());

    return {};
  }
}
