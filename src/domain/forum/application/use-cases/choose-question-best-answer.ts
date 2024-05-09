import { Question } from '../../enterprise/entities/question';
import { IAnswersRepository } from '../repositories/answers-repository';
import { IQuestionsRepository } from '../repositories/questions-repository';

interface IChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

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
      throw new Error('Answer not found');
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('not allowed');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return { question };
  }
}
