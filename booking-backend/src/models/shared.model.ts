import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class SimpleParamsDto {
  @IsUUID('4')
  id: string;
}

export class PaginationAndSortParams {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  @IsOptional()
  page = 1;

  @Max(100)
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  perPage = 10;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  field = 'createdAt';

  @Matches(/^ASC$|^DESC$/)
  @IsString()
  @IsOptional()
  order: 'ASC' | 'DESC' = 'DESC';
}

export interface ISortOptions {
  field: string;
  order: string;
}
