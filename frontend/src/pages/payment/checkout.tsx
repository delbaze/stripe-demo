/**-----------------------
 * *   Page de paiement (Payment Page)
 *  L'idée ici est de simuler une situation de panier à payer.
 * Gardez à l'esprit que vous ne devrez JAMAIS vous fier au calcul du front pour demander à stripe une instance
 * de paiement.
 * Dans l'ordre, vous calculerez ici le montant total pour que le client ait un visuel dessus.
 * Puis, vous enverrez à votre back la quantité et la référence (l'id par exemple) à votre back.
 * Et votre back RECALCULERA le montant total à partir de là.
 * Puis, votre back demandera à Stripe de générer une instance de paiement via son API.
 * Il faut installer cette fois ces modules sur le front :
 * npm install --save @stripe/react-stripe-js @stripe/stripe-js
 * Il nous faut utiliser la clé publique que stripe vous fourni.
 * Je mets ça dans notre fichier d'environnement.
 *
 * Pour illustrer l'exemple, j'ai prévu un faux panier json que je partagerai avec le back et le front.
 *
 * Il faut installer le module de stripe côté BACKEND (attention) => npm i stripe
 * La clé secrète de stripe obtenue depuis le dashboard stripe doit également être côté backend
 *
 *------------------------**/
import PaymentModule from "@/components/layout-elements/PaymentModule";
import useCart from "@/contexts/useCart";
import { useCreateSessionLazyQuery } from "@/types/graphql";
import { formatMoney } from "@/utilities";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Prices {
  subtotal: number;
  totalTax: number;
  shipping: number;
  total: number;
}

function Checkout() {
  const { addToCart, cart, deleteFromCart, removeFromCart } = useCart();
  const calculatePrices = (): Prices => {
    const taxRate = 0.2; // 20% taxe par défaut
    const shippingCost = 0.0; // frais d'envoi par défaut

    const subtotal = cart.reduce((sum, item) => {
      return sum + item.prix_hors_taxe * item.quantity;
    }, 0);

    const totalTax = subtotal * taxRate;
    const total = subtotal + totalTax + shippingCost;

    return {
      subtotal,
      totalTax,
      shipping: shippingCost,
      total,
    };
  };
  const prices = calculatePrices();

  const [getStripeSession, { data }] = useCreateSessionLazyQuery();
  const handleGetStripeSession = () => {
    getStripeSession({
      variables: {
        data: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
      },
      onError(error) {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    handleGetStripeSession();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gray-100 h-screen w-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Panier</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((d) => (
                      <tr key={d.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            {/* <img className="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Product image"> */}
                            <span className="font-semibold">{d.reference}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          {formatMoney(d.prix_hors_taxe)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              disabled={d.quantity === 1}
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => removeFromCart(d.reference)}
                            >
                              -
                            </button>
                            <span className="text-center w-8">
                              {d.quantity}
                            </span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() => addToCart(d.reference)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          {formatMoney(d.prix_hors_taxe * d.quantity)}
                        </td>
                        <td className="py-4">
                          <button
                            className="flex items-center"
                            onClick={() => deleteFromCart(d.reference)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Résumé</h2>
                <div className="flex justify-between mb-2">
                  <span>Sous-total</span>
                  <span>{formatMoney(prices.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>{formatMoney(prices.totalTax)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Frais de livraison</span>
                  <span>{formatMoney(prices.shipping)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {formatMoney(prices.total)}
                  </span>
                </div>
                {cart.length > 0 && (
                  <PaymentModule
                    clientSecret={data?.createSession?.client_secret}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
