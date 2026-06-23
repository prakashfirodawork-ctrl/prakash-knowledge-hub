import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prakash Knowledge Hub is a premium editorial destination covering Artificial Intelligence, Web3, Pi Network, Personal Branding, Data Analytics, Digital Growth, and Education.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/pi-network" className="hover:text-secondary transition-colors">Pi Network</Link></li>
              <li><Link href="/category/artificial-intelligence" className="hover:text-secondary transition-colors">Artificial Intelligence</Link></li>
              <li><Link href="/category/web3-blockchain" className="hover:text-secondary transition-colors">Web3 & Blockchain</Link></li>
              <li><Link href="/category/digital-growth" className="hover:text-secondary transition-colors">Digital Growth</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-secondary transition-colors">All Articles</Link></li>
              <li><Link href="/author" className="hover:text-secondary transition-colors">About Prakash</Link></li>
              <li><Link href="/dashboard" className="hover:text-secondary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://prakashfirodawork-ctrl.github.io/Prakash-Identity-Hub" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Portfolio</a></li>
              <li><a href="https://www.linkedin.com/in/prakashphiroda" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com/PiProtecter" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Twitter</a></li>
              <li><a href="https://www.instagram.com/prakashphiroda" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Prakash Knowledge Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
