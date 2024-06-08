import { makeQuestionMockFactory } from '@/test/factories/make-question-mock.factory';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';

describe('fetch recent questions use case', () => {
  let sut: FetchRecentQuestionsUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestionMockFactory.create({ createdAt: new Date(2024, 0, 20) }));
    await inMemoryQuestionsRepository.create(makeQuestionMockFactory.create({ createdAt: new Date(2024, 0, 18) }));
    await inMemoryQuestionsRepository.create(makeQuestionMockFactory.create({ createdAt: new Date(2024, 0, 23) }));

    const questions = await sut.execute({ page: 1 });

    expect(questions.value?.questions[0]).toMatchObject({ createdAt: new Date(2024, 0, 23) });
    expect(questions.value?.questions[1]).toMatchObject({ createdAt: new Date(2024, 0, 20) });
    expect(questions.value?.questions[2]).toMatchObject({ createdAt: new Date(2024, 0, 18) });
  });

  it('should fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestionMockFactory.create());
    }

    const questions = await sut.execute({ page: 2 });

    expect(questions.value?.questions.length).toEqual(2);
  });
});
