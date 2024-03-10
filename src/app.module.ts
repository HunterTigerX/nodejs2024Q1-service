import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { FavModule } from './api/favorites/favorites.module';
import { TrackModule } from './api/track/track.module';
import { UserModule } from './api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import databaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    TypeOrmModule.forRoot(databaseConfig()),
    AlbumModule,
    UserModule,
    ArtistModule,
    FavModule,
    TrackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
