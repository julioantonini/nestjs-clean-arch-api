import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswerMockFactory } from '@/test/factories/make-answer-mock.factory';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';

import { DeleteAnswerUseCase } from './delete-answer';

describe('delete answer use case', () => {
  let sut: DeleteAnswerUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should delete a answer', async () => {
    const authorId = new UniqueEntityId('1');
    const answerId = new UniqueEntityId('2');
    const newAnswer = makeAnswerMockFactory.create({ authorId }, answerId);
    await inMemoryAnswersRepository.create(newAnswer);

    const repositorySPy = jest.spyOn(inMemoryAnswersRepository, 'deleteById');

    await sut.execute({ answerId, authorId });

    expect(repositorySPy).toHaveBeenCalledWith('2');
  });

  it('should not delete a answer from another user', async () => {
    const answerId = new UniqueEntityId('1');
    const newAnswer = makeAnswerMockFactory.create({ authorId: new UniqueEntityId('author-1') }, answerId);
    await inMemoryAnswersRepository.create(newAnswer);

    const promise = sut.execute({ answerId, authorId: new UniqueEntityId('author-2') });
    await expect(promise).rejects.toThrow(Error);
  });
});
