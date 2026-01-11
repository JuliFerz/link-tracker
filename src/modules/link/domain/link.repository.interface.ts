import { Link } from './link.entity';

export abstract class LinkRepository {
  abstract create(link: Link): Promise<Link>;
  abstract update(link: Link): Promise<void>;
  abstract findByHashId(hashId: string): Promise<Link | null>;
  abstract existsByHashId(hashId: string): Promise<boolean>;
}
