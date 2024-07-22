import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import * as argon2 from "argon2";

@ObjectType()
@Entity()
export default class User {
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;
}
@ObjectType()
export class UserWithoutPassword implements Omit<User, "password"> {
  @Field()
  id: string;

  @Field()
  email: string;
}

/**----------------------
 **      Input Types
 *------------------------**/
@InputType()
export class InputRegister {
  @Field()
  email: string;

  @Field()
  password: string;
}
