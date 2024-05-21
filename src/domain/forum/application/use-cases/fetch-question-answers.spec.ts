import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswerMockFactory } from '@/test/factories/make-answer-mock.factory';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';

import { FetchQuestionAnswersUseCase } from './fetch-question-answers';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswerMockFactory.create({
        questionId: new UniqueEntityId('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswerMockFactory.create({
        questionId: new UniqueEntityId('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswerMockFactory.create({
        questionId: new UniqueEntityId('question-1'),
      }),
    );

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result?.answers).toHaveLength(3);
  });

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswerMockFactory.create({
          questionId: new UniqueEntityId('question-1'),
        }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.answers).toHaveLength(2);
  });
});
