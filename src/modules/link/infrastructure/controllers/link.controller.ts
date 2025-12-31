import { Body, Controller, Post } from '@nestjs/common';

import { CreateLinkDto } from '../../application/dto/create-link.dto';
import { LinkService } from '../../application/services/link.service';

@Controller('')
export class LinkController {

  constructor(private linkService: LinkService) { }

  @Post('create')
  createLink(@Body() dto: CreateLinkDto) {
    return this.linkService.createLink(dto);
  }
}
