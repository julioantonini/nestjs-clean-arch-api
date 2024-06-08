import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswerMockFactory } from '@/test/factories/make-answer-mock.factory';
import { makeQuestionMockFactory } from '@/test/factories/make-question-mock.factory';
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository';
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { NotAllowedError } from './errors/not-allowed-error';

describe('choose question best answer use case', () => {
  let sut: ChooseQuestionBestAnswerUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
  });

  it('should choose question best answer', async () => {
    const questionMock = makeQuestionMockFactory.create();
    const answerMock = makeAnswerMockFactory.create({ questionId: questionMock.id });

    await inMemoryQuestionsRepository.create(questionMock);
    await inMemoryAnswersRepository.create(answerMock);

    await sut.execute({
      answerId: answerMock.id.toString(),
      authorId: questionMock.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answerMock.id);
  });

  it('should not choose another user question best answer', async () => {
    const questionMock = makeQuestionMockFactory.create({ authorId: new UniqueEntityId('author-1') });
    const answerMock = makeAnswerMockFactory.create({ questionId: questionMock.id });

    await inMemoryQuestionsRepository.create(questionMock);
    await inMemoryAnswersRepository.create(answerMock);

    const result = await sut.execute({
      answerId: answerMock.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
