import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { MakeAnswerCommentMockFactory } from '@/test/factories/make-answer-comment-mock.factory';
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository';

import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete a answer comment', async () => {
    const answerComment = MakeAnswerCommentMockFactory.create();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = MakeAnswerCommentMockFactory.create({
      authorId: new UniqueEntityId('author-1'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
