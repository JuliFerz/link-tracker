import { Module } from '@nestjs/common';

import { LinkController } from './infrastructure/controllers/link.controller';
import { LinkPrismaRepository } from './infrastructure/link.prisma.repository';
import { LinkRepository } from './domain/link.repository.interface';
import { LinkService } from './application/services/link.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { RedirectController } from './infrastructure/controllers/redirect.controller';

@Module({
  controllers: [LinkController, RedirectController],
  providers: [
    LinkService,
    PrismaService,
    LinkPrismaRepository,
    {
      provide: LinkRepository,
      useClass: LinkPrismaRepository,
    },
  ],
  exports: [LinkService],
})
export class LinkModule { }