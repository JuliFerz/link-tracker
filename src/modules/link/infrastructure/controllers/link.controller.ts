import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateLinkDto } from '../../application/dto/create-link.dto';
import { LinkService } from '../../application/services/link.service';

@Controller('')
export class LinkController {

  constructor(private linkService: LinkService) { }

  @Post('create')
  createLink(@Body() dto: CreateLinkDto, @Query('password') password?: string) {
    return this.linkService.createLink({ ...dto, password });
  }

  @Get('l/:hashId/stats')
  async getStats(@Param('hashId') hashId: string, @Query('password') password?: string) {
    return await this.linkService.getStats(hashId, password);
  }

  @Put('l/:hashId')
  async invalidateLink(@Param('hashId') hashId: string, @Query('password') password?: string) {
    return await this.linkService.invalidateLink(hashId, password);
  }
}
