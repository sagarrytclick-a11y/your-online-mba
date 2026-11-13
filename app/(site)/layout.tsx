import { PopupFormProvider } from "../context/PopupFormContext";
import { CompareProvider } from "../context/CompareContext";
import { ProgramShortlistProvider } from "../context/ProgramShortlistContext";
import PopupForm from "../Components/PopupForm";
import PromoBar from "../Components/PromoBar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CompareBar from "../Components/CompareBar";
import ShortlistBar from "../Components/ShortlistBar";
import AiChatLauncher from "../Components/AiChatLauncher";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PopupFormProvider>
      <CompareProvider>
        <ProgramShortlistProvider>
          <PromoBar />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <PopupForm />
          <CompareBar />
          <ShortlistBar />
          <AiChatLauncher />
        </ProgramShortlistProvider>
      </CompareProvider>
    </PopupFormProvider>
  );
}
