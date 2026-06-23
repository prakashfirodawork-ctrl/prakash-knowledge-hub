import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Facebook, Globe, MapPin, Briefcase, BookOpen, Users, Zap, TrendingUp } from "lucide-react";

const expertise = [
  { label: "Artificial Intelligence", icon: "🤖" },
  { label: "Data Analytics", icon: "📊" },
  { label: "Web3 & Blockchain", icon: "🔗" },
  { label: "Pi Network Ecosystem", icon: "π" },
  { label: "Personal Branding", icon: "🎯" },
  { label: "Digital Growth", icon: "📈" },
  { label: "Education & EdTech", icon: "🎓" },
  { label: "Community Building", icon: "🤝" },
];

const stats = [
  { icon: BookOpen, value: "50+", label: "Articles Published" },
  { icon: Users, value: "10K+", label: "Monthly Readers" },
  { icon: Zap, value: "7", label: "Topics Covered" },
  { icon: TrendingUp, value: "60M+", label: "Pi Pioneers Reached" },
];

export default function Author() {
  return (
    <Layout>
      <SEO
        title="About Prakash Choudhary – AI Educator, Digital Builder & Web3 Advocate"
        description="Prakash Choudhary is an AI Educator, Digital Builder, and Web3 Advocate helping students, professionals, and businesses leverage technology for growth."
      />

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-5xl">

        {/* Profile Card */}
        <div className="bg-card border border-border shadow-sm rounded-3xl overflow-hidden mb-10">
          {/* Cover gradient */}
          <div className="h-48 md:h-56 bg-gradient-to-br from-primary via-primary/80 to-secondary relative">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Mission badge */}
            <div className="absolute bottom-4 right-6 bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
              Learn · Build · Grow · Impact
            </div>
          </div>

          {/* Profile info row */}
          <div className="px-6 md:px-12 pb-10 relative -mt-20 md:-mt-24 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <img
                src="/images/author-prakash.png"
                alt="Prakash Choudhary"
                className="w-40 h-40 md:w-44 md:h-44 rounded-full border-4 border-background object-cover bg-muted shadow-xl"
              />
              <div
                className="absolute bottom-2 right-2 bg-secondary text-secondary-foreground p-1.5 rounded-full shadow-md"
                title="Verified Creator"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Name + title + links */}
            <div className="flex-1 pb-2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                Prakash Choudhary
              </h1>
              <p className="text-lg text-primary font-semibold mb-3">
                AI Educator · Digital Builder · Web3 Advocate
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Global / Remote</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> Founder & Creator — Prakash Knowledge Hub</span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Button asChild className="gap-2">
                  <a href="https://prakashfirodawork-ctrl.github.io/Prakash-Identity-Hub" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" /> View Portfolio
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/prakashphiroda" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://x.com/PiProtecter" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.facebook.com/prakashphiroda" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/40 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-heading font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left: About + Expertise */}
          <div className="md:col-span-2 space-y-8">

            <section>
              <h2 className="text-2xl font-heading font-bold mb-5">About Me</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I am <strong className="text-foreground">Prakash Choudhary</strong>, an AI Educator, Digital Builder, and Web3 Advocate passionate about helping students, professionals, entrepreneurs, and businesses leverage technology for growth.
                </p>
                <p>
                  Through <strong className="text-foreground">Prakash Knowledge Hub</strong>, I share practical insights on Artificial Intelligence, Data Analytics, Personal Branding, Web3, Blockchain, Pi Network, and Digital Growth.
                </p>

                {/* Mission callout */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 my-6">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">My Mission</p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    Learn. Build. Grow. Impact.
                  </p>
                </div>

                <p>
                  I believe knowledge should be <strong className="text-foreground">accessible, practical, and action-oriented</strong>. Whether you're a student exploring AI, a professional developing digital skills, or a Pioneer interested in the future of Web3 and Pi Network, this platform is designed to help you stay ahead.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-5">Areas of Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map(({ label, icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-4 bg-muted/50 hover:bg-primary/5 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-default"
                  >
                    <span className="text-xl w-8 text-center">{icon}</span>
                    <span className="font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Who this is for */}
            <section>
              <h2 className="text-2xl font-heading font-bold mb-5">Who This Platform Is For</h2>
              <div className="space-y-3">
                {[
                  { emoji: "🎓", title: "Students", desc: "Exploring AI tools, data analytics, and tech careers" },
                  { emoji: "💼", title: "Professionals", desc: "Developing digital skills and building their personal brand" },
                  { emoji: "🚀", title: "Entrepreneurs", desc: "Leveraging technology and Web3 for business growth" },
                  { emoji: "π", title: "Pi Pioneers", desc: "Staying informed on the future of Pi Network and Web3" },
                ].map(({ emoji, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <span className="text-2xl mt-0.5">{emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">

            {/* Connect card */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-lg mb-4">Connect With Me</h3>
                <ul className="space-y-3">
                  {[
                    { href: "https://www.linkedin.com/in/prakashphiroda", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                    { href: "https://x.com/PiProtecter", icon: <Twitter className="w-4 h-4" />, label: "Twitter / X" },
                    {
                      href: "https://www.instagram.com/prakashphiroda",
                      icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                      label: "Instagram",
                    },
                    { href: "https://www.facebook.com/prakashphiroda", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                  ].map(({ href, icon, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                      >
                        <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                          {icon}
                        </div>
                        <span className="font-medium">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pi Network referral card */}
            <Card className="border-0 bg-primary text-primary-foreground relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute top-0 left-0 w-full h-full opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="text-3xl mb-2">π</div>
                <h3 className="font-heading font-bold text-xl mb-1">Join Pi Network</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Mine Pi for free on your phone. Use my invitation code to get started.
                </p>
                <div className="bg-black/20 p-3 rounded-xl font-mono text-center font-bold tracking-widest text-lg mb-4">
                  prakashphiroda
                </div>
                <Button variant="secondary" className="w-full font-semibold" asChild>
                  <a href="https://minepi.com/" target="_blank" rel="noopener noreferrer">
                    Download Pi App
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Portfolio CTA */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">View Full Portfolio</h3>
                <p className="text-sm text-muted-foreground mb-4">See all projects, achievements and work.</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://prakashfirodawork-ctrl.github.io/Prakash-Identity-Hub" target="_blank" rel="noopener noreferrer">
                    Open Portfolio
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
