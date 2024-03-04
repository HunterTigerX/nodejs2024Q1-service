import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { FavModule } from './api/favorites/favorites.module';
import { TrackModule } from './api/track/track.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [AlbumModule, UserModule, ArtistModule, FavModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
