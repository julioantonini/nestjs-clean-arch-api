import { Slug } from './slug';

describe('Slug value object', () => {
  it('should create a slug', () => {
    const slug = Slug.createFromText('Question title without special chars ç_â_ò');
    expect(slug.value).toBe('question-title-without-special-chars-c-a-o');
  });
});
