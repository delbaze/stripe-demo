import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import User, { InputRegister } from "../entities/user.entity";
import Reset from "../entities/reset.entity";
import { uuid } from "uuidv4";

export default class UserService {
  db: Repository<User>;
  dbReset: Repository<Reset>;
  constructor() {
    this.db = datasource.getRepository(User);
    this.dbReset = datasource.getRepository(Reset);
  }

  async listUsers() {
    return this.db.find();
  }

  async findUserByEmail(email: string) {
    return await this.db.findOneBy({ email });
  }

  async createUser({ email, password }: InputRegister) {
    const newUser = this.db.create({ email, password });
    return await this.db.save(newUser);
  }

  async createResetToken(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("Ce user n'existe pas");
    }
    let resetToken = await this.dbReset.findOne({
      where: { user },
      relations: { user: true },
    });
    if (!resetToken) {
      resetToken = this.dbReset.create({ user });
    }
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    resetToken.expirationDate = new Date(date.getTime());
    resetToken.resetToken = uuid();
    const newResetToken = this.dbReset.create(resetToken);
    return await this.dbReset.save(newResetToken);
  }

  async findResetToken(token: string) {
    const resetToken = await this.dbReset.findOne({
      where: { resetToken: token },
      relations: { user: true },
    });

    return resetToken;
  }
  async checkResetTokenValidity(token: string) {
    let result = false;
    const resetToken = await this.findResetToken(token);
    if (resetToken) {
      const dateToken = resetToken.expirationDate;
      const date = Date.now();
      result = dateToken.getTime() > date;
    }

    return result;
  }

  async changePassword(password: string, user: User){
    const editedUser = this.db.create({...user});
    editedUser.password = password;

    return await this.db.save(editedUser);

  }
}
