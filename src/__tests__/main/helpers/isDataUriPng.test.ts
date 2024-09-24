import { validate } from 'class-validator';
import { IsDataUriPng } from '../../../main/helpers/isDataUriPng'; // Adjust the path accordingly

class TestDto {
  @IsDataUriPng()
  thumbnail!: string;
}

describe('IsDataUriPng', () => {
  it('should validate a valid PNG Data URI', async () => {
    const dto = new TestDto();
    dto.thumbnail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'; // Valid PNG Data URI

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Expect no validation errors
  });
});