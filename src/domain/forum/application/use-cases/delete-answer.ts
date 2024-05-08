import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { IAnswersRepository } from '../repositories/answers-repository';

interface IDeleteAnswerUseCaseRequest {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private readonly answerRepository: IAnswersRepository) {}

  public async execute({ answerId, authorId }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId.toString() !== answer.authorId.toString()) {
      throw new Error('Not allowed');
    }

    await this.answerRepository.deleteById(answer.id.toString());

    return {};
  }
}
