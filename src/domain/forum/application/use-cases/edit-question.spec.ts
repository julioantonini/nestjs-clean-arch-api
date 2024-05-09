import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestionMockFactory } from '@/test/factories/make-question-mock.factory';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

import { EditQuestionUseCase } from './edit-question';

describe('edit question use case', () => {
  let sut: EditQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should edit a question', async () => {
    const questionId = new UniqueEntityId('1');
    const newQuestion = makeQuestionMockFactory.create({}, questionId);

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({ questionId, authorId: newQuestion.authorId, title: 'new title', content: 'new content' });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({ title: 'new title', content: 'new content' });
  });

  it('should not edit a question from another user', async () => {
    const questionId = new UniqueEntityId('1');
    const newQuestion = makeQuestionMockFactory.create({ authorId: new UniqueEntityId('author-1') }, questionId);
    inMemoryQuestionsRepository.create(newQuestion);

    const promise = sut.execute({
      questionId,
      authorId: new UniqueEntityId('author-2'),
      title: 'new title',
      content: 'new content',
    });
    await expect(promise).rejects.toThrow(Error);
  });
});
