import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import * as argon2 from "argon2";

type ROLE = "ADMIN" | "USER"

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

  @Field()
  @Column({
    type: "text",
    enum: ["ADMIN", "USER"],
    nullable: true, 
    default: "USER"
  })
  role: ROLE
}
@ObjectType()
export class UserWithoutPassword implements Omit<User, "password"> {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => String)
  role: ROLE;
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
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

@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}
