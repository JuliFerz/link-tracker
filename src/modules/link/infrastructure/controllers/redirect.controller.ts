import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { LinkService } from '../../application/services/link.service';

@Controller('')
export class RedirectController {
  constructor(private linkService: LinkService) { }

  @Get('l/:hashId')
  async redirect(
    @Param('hashId') hashId: string,
    @Res() res: Response,
    @Query('password') password?: string
  ) {
    const url: string = await this.linkService.redirectLink(hashId, password);
    return res.redirect(302, url);
  }
}
