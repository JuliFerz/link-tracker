import { IsOptional, IsString, IsUrl, IsDateString } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
