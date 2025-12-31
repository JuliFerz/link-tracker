import { Injectable } from "@nestjs/common";

import { Link } from '../domain/link.entity';
import { LinkRepository } from "../domain/link.repository.interface";
import { PrismaService } from "src/common/database/prisma.service";

@Injectable()
export class LinkPrismaRepository implements LinkRepository {

  constructor(private prisma: PrismaService) { }

  async create(link: Link): Promise<Link> {
    const created = await this.prisma.link.create({
      data: {
        targetUrl: link.targetUrl,
        hashId: link.hashId,
        isValid: link.isValid,
        visits: link.visits,
        password: link.password ?? null,
        expiresAt: link.expiresAt ?? null,
      }
    });

    return new Link(
      created.id,
      created.targetUrl,
      created.hashId,
      created.isValid,
      created.visits,
      created.createdAt,
      created.password ?? undefined,
      created.expiresAt ?? undefined,
    );
  }

  update(link: Link): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findByShortId(shortId: string): Promise<Link | null> {
    throw new Error("Method not implemented.");
  }

  existsByShortId(shortId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}
