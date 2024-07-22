import CartProvider from "@/contexts/CartContext";
import Footer from "./Footer";
import Topbar from "./Topbar";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <CartProvider>
        <Topbar />
        {children}
        <Footer />
      </CartProvider>
    </div>
  );
}

export default Layout;
