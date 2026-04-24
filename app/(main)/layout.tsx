import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Providers from "../Components/Providers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Navbar />
      {children}
      <Footer />
    </Providers>
  )
}
