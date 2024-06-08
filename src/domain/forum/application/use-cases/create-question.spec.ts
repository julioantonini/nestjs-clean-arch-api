import { UniqueEntityId } from '@/core/entities/unique-entity-id';
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
        attachmentsIds: ['1', '2'],
      });

      expect(question.isRight).toBeTruthy();

      expect(inMemoryQuestionsRepository.items[0]).toEqual(question.value?.question);
      expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2);
      expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ]);
    });
  });
});
