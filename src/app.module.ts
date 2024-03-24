import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { FavModule } from './api/favorites/favorites.module';
import { TrackModule } from './api/track/track.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data.source';
import { SignupModule } from './api/auth/auth.module';
import { LoggerModule } from './api/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AlbumModule,
    UserModule,
    ArtistModule,
    FavModule,
    TrackModule,
    SignupModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
