import { AfterInsert, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import * as argon2 from "argon2";
import Mailer from "../lib/mailer";

type ROLE = "ADMIN" | "USER"

@ObjectType()
@Entity()
export default class User {
  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (!this.password.startsWith("$argon2")){
      this.password = await argon2.hash(this.password);
    }
  } 

  @AfterInsert()
  protected async afterRegister(){
    const mailer = new Mailer(
      undefined,
      this.email,
      "Coucou",
      process.env.SENDGRID_TEMPLATE_REGISTER!,
      {
        email: this.email,
      }
    );
    await mailer.send();
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

@InputType()
export class InputChangePassword {
  @Field()
  token: string;

  @Field()
  password: string;
}