import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LinkModule } from './modules/link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LinkModule
  ],
})
export class AppModule {}
