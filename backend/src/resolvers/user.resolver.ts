import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserService from "../services/user.service";
import User, {
  InputChangePassword,
  InputLogin,
  InputRegister,
  Message,
  UserWithoutPassword,
} from "../entities/user.entity";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { MyContext } from "..";
import Cookies from "cookies";
import Mailer from "../lib/mailer";
import Reset from "../entities/reset.entity";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return await new UserService().listUsers();
  }
  @Query(() => Message)
  async login(@Arg("infos") infos: InputLogin, @Ctx() ctx: MyContext) {
    const user = await new UserService().findUserByEmail(infos.email);
    if (!user) {
      throw new Error("Vérifiez vos informations");
    }
    const isPasswordValid = await argon2.verify(user.password, infos.password);
    const m = new Message();
    if (isPasswordValid) {
      const token = await new SignJWT({ email: user.email, role: user.role })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      m.message = "Bienvenue!";
      m.success = true;
    } else {
      m.message = "Vérifiez vos informations";
      m.success = false;
    }
    return m;
  }

  @Query(() => Message)
  async logout(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token"); //sans valeur, le cookie token sera supprimé
    }
    const m = new Message();
    m.message = "Vous avez été déconnecté";
    m.success = true;

    return m;
  }

  @Query(() => Message)
  async checkResetToken(@Arg("token") token: string) {
    const success = await new UserService().checkResetTokenValidity(token);
    console.log(success);

    const m = new Message();
    m.message = "Check du token";
    m.success = success;

    return m;
  }

  @Mutation(() => UserWithoutPassword)
  async register(@Arg("infos") infos: InputRegister) {
    const user = await new UserService().findUserByEmail(infos.email);
    if (user) {
      throw new Error("Cet email est déjà pris!");
    }
    const newUser = await new UserService().createUser(infos);
    return newUser;
  }

  @Mutation(() => Reset)
  async resetPassword(@Arg("email") email: string) {
    //générer un token
    const resetToken = await new UserService().createResetToken(email);
    return resetToken;
  }

  @Mutation(() => Message)
  async changePassword(@Arg("data") data: InputChangePassword) {
    const m = new Message();

    const resetToken = await new UserService().checkResetTokenValidity(
      data.token
    );
    if (!resetToken) {
      m.message = "Votre token n'est plus bon";
      m.success = false;
    } else {
      const tokenInfos = await new UserService().findResetToken(data.token);
      if (tokenInfos) {
        const { user } = tokenInfos;
        const userModified = await new UserService().changePassword(
          data.password,
          user
        );
          console.log("userModified", userModified);
        m.message = "Votre mot de passe a été changé, reconnectez vous";
        m.success = true;
      }
    }
    return m;
  }
}
