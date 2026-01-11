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
        0,
        new Date(),
        dto.password
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

  async redirectLink(hashId: string, password?: string): Promise<string> {
    const link = await this.linkRepository.findByHashId(hashId)

    this.checkLink(link, password);
    // ! WIP consultar si expiró

    link.incrementVisit();
    await this.linkRepository.update(link);

    return link.targetUrl;
  }

  async getStats(hashId: string, password?: string): Promise<{ visits: number }> {
    const link = await this.linkRepository.findByHashId(hashId)

    this.checkLink(link, password);

    // ! WIP consultar si expiró

    return {
      visits: link!.visits,
    };
  }

  async invalidateLink(hashId: string, password?: string): Promise<{ message: string }> {
    const link = await this.linkRepository.findByHashId(hashId)

    this.checkLink(link, password);
    // ! WIP consultar si expiró

    link.invalidate();
    await this.linkRepository.update(link);

    return { message: `Link '${link.hashId}' invalidated successfully` };
  }

  checkLink(link: Link | null, password: string = ""): asserts link is Link {
    if (!link || !link.isValid) {
      throw new NotFoundException('Link not found');
    }
    if (link.password) {
      if (!password) throw new BadRequestException(`Password is required for ${link.hashId}`);
      if (!link.checkPassword(password)) throw new BadRequestException(`Incorrect password for ${link.hashId}`);
    }
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
