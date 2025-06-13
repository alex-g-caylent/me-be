import { Body, Controller, Post } from '@nestjs/common';
import { TestsService } from './tests.service';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  test(@Body() body: UpdateTestDto) {
    return this.testsService.test(body);
  }
}
