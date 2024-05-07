import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

describe('Answer Question Use Case', () => {
  let sut: AnswerQuestionUseCase;
  beforeEach(() => {
    const fakeAnswersRepository: AnswersRepository = {
      create: jest.fn(),
    };
    sut = new AnswerQuestionUseCase(fakeAnswersRepository);
  });

  it('should create an answer', async () => {
    const answer = await sut.execute({
      questionId: '1',
      authorId: '2',
      content: 'New answer',
    });

    expect(answer.content).toBe('New answer');
  });
});
