import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { CreateLinkDto } from '../../application/dto/create-link.dto';
import { LinkService } from '../../application/services/link.service';

@Controller('')
export class LinkController {

  constructor(private linkService: LinkService) { }

  @Post('create')
  createLink(@Body() dto: CreateLinkDto) {
    return this.linkService.createLink(dto);
  }

  @Get('l/:hashId/stats')
  async getStats(@Param('hashId') hashId: string) {
    return await this.linkService.getStats(hashId);
  }

  @Put('l/:hashId')
  async invalidateLink(@Param('hashId') hashId: string) {
    return await this.linkService.invalidateLink(hashId);
  }
}
