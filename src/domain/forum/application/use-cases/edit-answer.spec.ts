import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswerMockFactory } from '@/test/factories/make-answer-mock.factory';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';

import { EditAnswerUseCase } from './edit-answer';

describe('edit answer use case', () => {
  let sut: EditAnswerUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should edit a answer', async () => {
    const answerId = new UniqueEntityId('1');
    const newAnswer = makeAnswerMockFactory.create({}, answerId);

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({ answerId, authorId: newAnswer.authorId, content: 'new content' });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({ content: 'new content' });
  });

  it('should not edit a answer from another user', async () => {
    const answerId = new UniqueEntityId('1');
    const newAnswer = makeAnswerMockFactory.create({ authorId: new UniqueEntityId('author-1') }, answerId);
    inMemoryAnswersRepository.create(newAnswer);

    const promise = sut.execute({
      answerId,
      authorId: new UniqueEntityId('author-2'),
      content: 'new content',
    });
    await expect(promise).rejects.toThrow(Error);
  });
});
