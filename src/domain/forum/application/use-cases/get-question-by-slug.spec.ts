import { makeQuestionMockFactory } from '@/test/factories/make-question-mock.factory';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

import { GetQuestionBySlugUseCase } from './get-question-by-slug';

describe('get question by slut use case', () => {
  let sut: GetQuestionBySlugUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should get a question by slug', async () => {
    const newQuestion = makeQuestionMockFactory.create({ title: 'Test Question' });

    inMemoryQuestionsRepository.create(newQuestion);
    const { question } = await sut.execute({ slug: 'test-question' });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
