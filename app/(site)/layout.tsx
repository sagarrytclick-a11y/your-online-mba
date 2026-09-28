import { PopupFormProvider } from "../context/PopupFormContext";
import { CompareProvider } from "../context/CompareContext";
import { ProgramShortlistProvider } from "../context/ProgramShortlistContext";
import PopupForm from "../Components/PopupForm";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CompareBar from "../Components/CompareBar";
import ShortlistBar from "../Components/ShortlistBar";
import ExpressBar from "../Components/ExpressBar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PopupFormProvider>
      <CompareProvider>
        <ProgramShortlistProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <PopupForm />
          <CompareBar />
          <ShortlistBar />
          <ExpressBar />
        </ProgramShortlistProvider>
      </CompareProvider>
    </PopupFormProvider>
  );
}
