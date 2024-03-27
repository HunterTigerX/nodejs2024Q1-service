import { Module } from '@nestjs/common';
import { CustomExceptionFilter } from './exception-filter.service';

@Module({
  providers: [CustomExceptionFilter],
  exports: [CustomExceptionFilter],
})
export class CustomExceptionFilterModule {}
