import { Either, right } from '@/core/either';

import { Answer } from '../../enterprise/entities/answer';
import { IAnswersRepository } from '../repositories/answers-repository';

interface IFetchQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type IFetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionAnswersUseCaseRequest): Promise<IFetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByTopicId(questionId, { page });

    return right({ answers });
  }
}
