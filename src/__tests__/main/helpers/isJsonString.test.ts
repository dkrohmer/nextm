import { validate } from 'class-validator';
import { IsJsonString } from '../../../main/helpers/isJsonString';

class TestDto {
  @IsJsonString()
  payload!: string;
}

describe('IsJsonString', () => {
  it('should validate a valid stringified JSON', async () => {
    const dto = new TestDto();
    dto.payload = JSON.stringify({ key: 'value' }); // Valid JSON

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Expect no validation errors
  });
});
