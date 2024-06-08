import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

import { CreateQuestionUseCase } from './create-question';

describe('Create Question Use Case', () => {
  let sut: CreateQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  describe('Create Question', () => {
    it('should create a question', async () => {
      const question = await sut.execute({
        authorId: '2',
        title: 'Question title',
        content: 'question content',
      });

      expect(question.value?.question.id).toBeTruthy();
    });
  });
});
