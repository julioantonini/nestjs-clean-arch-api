import { Either, left, right } from '@/core/either';

import { Question } from '../../enterprise/entities/question';
import { IQuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IGetQuestionBySlugUseCaseRequest {
  slug: string;
}

type IGetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>;

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: IQuestionsRepository) {}

  public async execute({ slug }: IGetQuestionBySlugUseCaseRequest): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({ question });
  }
}
