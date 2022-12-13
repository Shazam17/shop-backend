import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "typeorm";

export class AddToCartDto {
    @ApiProperty()
    itemId: number;

    @ApiProperty()   
    userId: number;
}