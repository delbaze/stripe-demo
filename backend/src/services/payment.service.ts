import fakedData from "../fakeData.json";
import type { Stripe } from "stripe";
import { ProductForSessionInput } from "../resolvers/payment.resolver";

interface LineItemI {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
    };
    unit_amount: number;
  };
  quantity: number;
}

export default class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = require("stripe")(process.env.STRIPE_PRIVATE_API_KEY!);
  }

  calculateTotalAmount(data: ProductForSessionInput[]): number {
    return +data
      .reduce((prev, curr) => {
        const itemInMemory = fakedData.find((i) => i.id === curr.id);
        if (!itemInMemory) {
          throw new Error("Ce produit n'existe pas");
        }
        const prix_hors_taxe = itemInMemory?.prix_hors_taxe;
        const taxes = prix_hors_taxe * 0.2;
        const prixTTC = prix_hors_taxe + taxes;
        return prev + prixTTC;
      }, 0)
      .toFixed(2);
  }
  /**-----------------------
   * *  L'idée ici ce n'est pas de créer une session de checkout, mais de créer une
   * *  intention de paiement, on a donc beaucoup moins d'infos nécessaires
   * *  => on va donc surtout calculer le montant attendu pour le paiement.
   *
   *
   *------------------------**/
  async createSession(data: ProductForSessionInput[]) {
    const totalAmount = this.calculateTotalAmount(data) * 100;
    const session = await this.stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "eur",
    });
    return session;
  }
}
