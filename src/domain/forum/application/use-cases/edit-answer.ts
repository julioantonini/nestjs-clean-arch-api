import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { IAnswersRepository } from '../repositories/answers-repository';

interface IEditAnswerUseCaseRequest {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
  content: string;
}

interface IEditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private readonly answerRepository: IAnswersRepository) {}

  public async execute({
    answerId,
    authorId,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId.toString() !== answer.authorId.toString()) {
      throw new Error('Not allowed');
    }

    answer.content = content;

    await this.answerRepository.update(answer);

    return {};
  }
}
