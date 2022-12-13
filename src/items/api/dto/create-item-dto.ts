import { ApiProperty } from "@nestjs/swagger";


export class CreateItemDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category: string;
}