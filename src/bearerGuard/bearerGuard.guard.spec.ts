import { BearerGuard } from './bearerGuard.guard';

describe('bearerGuard', () => {
  it('should be defined', () => {
    expect(new BearerGuard()).toBeDefined();
  });
});
