import Footer from "./Footer";
import Topbar from "./Topbar";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Topbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
