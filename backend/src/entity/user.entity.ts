import { Entity, Property, PrimaryKey, Unique, ScalarRef } from "@mikro-orm/core";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    first_name!: string;

    @Property()
    last_name!: string;

    @Property()
    @Unique()
    email!: string;

    @Property()
    password!: string;

    @Property({ nullable: true })
    refreshToken!: string | null;

    @Property()
    created_at = new Date();

    @Property({onUpdate: () => new Date()})
    updated_at = new Date();
}