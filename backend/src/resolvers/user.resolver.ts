import { Query, Resolver } from "type-graphql";
import UserService from "../services/user.service";
import User from "../entities/user.entity";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return await new UserService().listUsers();
  }
 
}
