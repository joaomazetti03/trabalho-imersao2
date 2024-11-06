import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsNotEmpty, Length } from "class-validator";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(3, 100) 
    name: string;

    @Column({ type: 'text' })
    @IsNotEmpty()
    description: string;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;
}
