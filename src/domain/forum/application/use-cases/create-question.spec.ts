import { IQuestionsRepository } from '../repositories/questions-repository';
import { CreateQuestionUseCase } from './create-question';

describe('Create Question Use Case', () => {
  let sut: CreateQuestionUseCase;
  beforeEach(() => {
    const fakeQuestionsRepository: IQuestionsRepository = {
      create: jest.fn(),
    };
    sut = new CreateQuestionUseCase(fakeQuestionsRepository);
  });

  it('should create a question', async () => {
    const { question } = await sut.execute({
      authorId: '2',
      title: 'Question title',
      content: 'question content',
    });

    expect(question.id).toBeTruthy();
  });
});
