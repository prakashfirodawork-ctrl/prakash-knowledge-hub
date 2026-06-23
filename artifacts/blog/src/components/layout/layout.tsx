import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { PiReferralBar } from "./pi-referral-bar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full pb-16">
        {children}
      </main>
      <Footer />
      <PiReferralBar />
    </div>
  );
}
