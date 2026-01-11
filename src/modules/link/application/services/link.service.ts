import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateLinkDto } from '../dto/create-link.dto';
import { Link } from '../../domain/link.entity';
import { LinkPrismaRepository } from '../../infrastructure/link.prisma.repository';

@Injectable()
export class LinkService {

  constructor(private linkRepository: LinkPrismaRepository) { }

  async createLink(dto: CreateLinkDto): Promise<{
    target: string,
    link: string,
    valid: boolean,
  }> {
    try {
      const isValidUrl = this.validateUrl(dto.url);
      if (!isValidUrl) {
        throw new BadRequestException('Invalid URL');
      }

      const hashId = this.generateHashId();

      const link = new Link(
        null,
        dto.url,
        hashId,
        true,
      );

      const saved: Link = await this.linkRepository.create(link);

      const targetUrl: string = `${process.env.BASE_URL}/l/${saved.hashId}`;

      return {
        target: saved.targetUrl,
        link: targetUrl,
        valid: saved.isValid,
      };
    }
    catch (error) {
      throw error;
    }
  }

  async getLink(hashId: string): Promise<string> {
    if (!hashId) {
      throw new BadRequestException('HashId is required');
    }

    const link = await this.linkRepository.findByHashId(hashId)

    if (!link) {
      throw new NotFoundException('HashId not found');
    }
    if (!link.isValid) {
      throw new BadRequestException('Link is invalid');
    }
    // ! WIP consultar si expiró

    link.incrementVisit();
    await this.linkRepository.update(link);

    return link.targetUrl;
  }

  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  generateHashId(): string {
    return Math.random().toString(36).substring(2, 7);
  }
}
