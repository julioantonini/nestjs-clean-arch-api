import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestionMockFactory } from '@/test/factories/make-question-mock.factory';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

import { DeleteQuestionUseCase } from './delete-question';
import { NotAllowedError } from './errors/not-allowed-error';

describe('delete question use case', () => {
  let sut: DeleteQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should delete a question', async () => {
    const questionId = new UniqueEntityId('1');
    const newQuestion = makeQuestionMockFactory.create({}, questionId);
    inMemoryQuestionsRepository.create(newQuestion);

    const repositorySPy = jest.spyOn(inMemoryQuestionsRepository, 'deleteById');

    await sut.execute({ questionId, authorId: newQuestion.authorId });

    expect(repositorySPy).toHaveBeenCalledWith('1');
  });

  it('should not delete a question from another user', async () => {
    const questionId = new UniqueEntityId('1');
    const newQuestion = makeQuestionMockFactory.create({ authorId: new UniqueEntityId('author-1') }, questionId);
    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({ questionId, authorId: new UniqueEntityId('author-2') });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
