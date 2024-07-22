import { Query, Resolver } from "type-graphql";
import BookService from "../services/book.service";
import Book from "../entities/book.entity";

@Resolver()
export default class BookResolver {
  @Query(() => [Book])
  async books() {
    return await new BookService().listBooks();
  }
}
