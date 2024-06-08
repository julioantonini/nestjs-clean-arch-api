import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface IFetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = {
  answerComments: AnswerComment[];
};

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({ answerId, page }: IFetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, {
      page,
    });

    return { answerComments };
  }
}
