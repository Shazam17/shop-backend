import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiProperty()
  userId: string;
}
