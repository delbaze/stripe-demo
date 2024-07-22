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

  createLineItems(data: ProductForSessionInput[]): LineItemI[] {
    return data.map((item) => {
      const itemInMemory = fakedData.find((i) => i.id === item.id);
      if (!itemInMemory) {
        throw new Error("Ce produit n'existe pas");
      }
      const prix_hors_taxe = itemInMemory?.prix_hors_taxe;
      const taxes = prix_hors_taxe * 0.2;
      const prixTTC = prix_hors_taxe + taxes;
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: itemInMemory.reference,
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },

          unit_amount: +(prixTTC * 100).toFixed(0), //le montant dans le domaine bancaire est toujours exprimé en centimes, d'où le * 100
          //je n'ai pas mis ici le calcul des frais de livraison, mais vous pouvez le rajouter ;)
        },

        quantity: item.quantity,
      };
    });
  }
  async createSession(data: ProductForSessionInput[]) {
    const line_items = this.createLineItems(data);
    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONT_LINK}/payment/success`,
      cancel_url: `${process.env.FRONT_LINK}/payment/canceled`,
    });
    //la session contient la propriété "url" qu'il faut renvoyer au front pour permettre à l'utilisateur d'être redirigé vers la page de paiement
    return session;
  }
}
