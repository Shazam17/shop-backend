import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetItemsDto {
  @ApiPropertyOptional()
  category: string;

  @ApiPropertyOptional()
  nameFilter: string;

  @ApiPropertyOptional()
  userId: string;
}
