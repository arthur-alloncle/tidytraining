import { Entity, Property, PrimaryKey, DynamicPassword } from "@mikro-orm/core";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    first_name!: string;

    @Property()
    last_name!: string;

    @Property()
    email!: string;

    @Property()
    password!: string;

    @Property()
    created_at = new Date();

    @Property({onUpdate: () => new Date()})
    updated_at = new Date();
}