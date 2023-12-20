import { AnswerQuestionUseCase } from './answer-question';

describe('Answer Question Use Case', () => {
  let sut: AnswerQuestionUseCase;
  beforeEach(() => {
    sut = new AnswerQuestionUseCase();
  });

  it('should create an answer', () => {
    const answer = sut.execute({
      questionId: '1',
      authorId: '2',
      content: 'Nova resposta',
    });

    expect(answer.content).toBe('Nova resposta');
  });
});
