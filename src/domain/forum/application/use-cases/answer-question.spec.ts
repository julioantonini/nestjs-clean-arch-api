import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';

import { AnswerQuestionUseCase } from './answer-question';

describe('Answer Question Use Case', () => {
  let sut: AnswerQuestionUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      authorId: '2',
      content: 'New answer',
    });

    expect(answer.id).toBeTruthy();
  });
});
