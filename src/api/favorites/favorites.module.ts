import { Module } from '@nestjs/common';
import { FavController } from './favorites.controller';
import { FavService } from './favorites.service';

@Module({
  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {}
