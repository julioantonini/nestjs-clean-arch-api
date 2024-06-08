import { Either, left, right } from '@/core/either';

import { Question } from '../../enterprise/entities/question';
import { IAnswersRepository } from '../repositories/answers-repository';
import { IQuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type IChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionsRepository: IQuestionsRepository,
    private readonly answerRepository: IAnswersRepository,
  ) {}

  public async execute({
    authorId,
    answerId,
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return right({ question });
  }
}
