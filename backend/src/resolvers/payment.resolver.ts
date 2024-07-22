import { Arg, Field, InputType, Int, Query, Resolver } from "type-graphql";
import PaymentService from "../services/payment.service";
import { GraphQLJSON } from "graphql-scalars";

@InputType()
export class ProductForSessionInput {
  @Field()
  id: string;

  @Field(() => Int)
  quantity: number;
}
@Resolver()
export default class PaymentResolver {
  /**----------------------
   *? le type ici est volontairement large puisque la session de Stripe
   *?  retourne énormément d'informations, impossible de tout couvrir
   *? facilement avec un type custom à nous
   *------------------------**/
  @Query(() => GraphQLJSON)
  async createSession(
    @Arg("data", () => [ProductForSessionInput]) data: ProductForSessionInput[]
  ) {
    return await new PaymentService().createSession(data);
  }
}
