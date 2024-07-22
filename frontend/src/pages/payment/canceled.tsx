import Link from "next/link";
import React from "react";

function Success() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <div className="flex items-center flex-col">
        <h1 className="mb-1 text-4xl font-extrabold leading-none tracking-tight text-red-600 md:text-5xl lg:text-6xl">
          Aie, il y a eu un problème avec votre paiement!
        </h1>
        <Link href="/payment/checkout" className="font-extrabold ">
          Revenir au panier
        </Link>
      </div>
    </main>
  );
}

export default Success;
