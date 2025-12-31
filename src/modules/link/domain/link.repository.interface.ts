import { Link } from './link.entity';

export abstract class LinkRepository {
  abstract create(link: Link): Promise<Link>;
  abstract update(link: Link): Promise<void>;
  abstract findByShortId(shortId: string): Promise<Link | null>;
  abstract existsByShortId(shortId: string): Promise<boolean>;
}
