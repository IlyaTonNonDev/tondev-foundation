import { motion } from "framer-motion";
import { Menu, X, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import logo from "@assets/2025-11-30_21.27.41_1765057405798.jpg";
import chart from "@assets/2025-11-29_15.30.00_1765057405798.jpg";
import swapScreen from "@assets/Screenshot_2025-12-07_at_00.19.03_1765057420024.png";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Token", href: "#about" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "How to Buy", href: "#how-to-buy" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b-2 border-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="TONDEV Logo" className="w-8 h-8 rounded-full border border-black" />
          <span className="font-hand text-xl font-bold tracking-tighter">$TONDEV</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-sm hover:text-primary transition-colors font-bold"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-3">
            <a href="https://t.me/tondev_jetton" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
               <span className="sr-only">Telegram</span>
               TG
            </a>
            <a href="https://x.com/tondevmeme" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
               <span className="sr-only">Twitter</span>
               X
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-black bg-background p-4 absolute w-full">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-lg font-bold"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-4 mt-2">
               <a href="https://t.me/tondev_jetton" target="_blank" rel="noreferrer" className="font-bold underline">Telegram</a>
               <a href="https://x.com/tondevmeme" target="_blank" rel="noreferrer" className="font-bold underline">Twitter</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-b-2 border-black bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-2 text-primary drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              TONDEV
            </h1>
            <p className="text-2xl md:text-3xl font-hand mb-6 rotate-[-2deg] inline-block bg-accent px-2 border border-black">
              meme token for developers
            </p>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            &lt; by devs, for devs /&gt;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="sketch-border bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-8 py-6 h-auto font-hand"
              onClick={() => window.location.href = '#how-to-buy'}
            >
              Buy $TONDEV
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black rounded-full translate-x-2 translate-y-2" />
            <img 
              src={logo} 
              alt="TONDEV Mascot" 
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-2 border-black z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 border-b-2 border-black bg-secondary/5">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sketch-border bg-background p-8 md:p-12"
        >
          <h2 className="text-4xl font-bold mb-8">About the Token</h2>
          <p className="text-lg md:text-xl font-mono leading-relaxed mb-6">
            TONDEV is a meme token born in the TON developer community.
          </p>
          <p className="text-lg md:text-xl font-mono leading-relaxed mb-6">
            It is a symbol of devs' strength, freedom of code, and love for memes.
          </p>
          <p className="text-lg md:text-xl font-mono leading-relaxed font-bold text-primary">
            No promises, no utopia — just fun, community, and build energy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-20 border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Tokenomics</h2>
          <p className="font-mono text-muted-foreground">The serious math part (drawn by a child)</p>
        </div>
        
        <div className="flex justify-center">
          <motion.div 
            className="max-w-2xl w-full sketch-border p-2 bg-black"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <img 
              src={chart} 
              alt="Tokenomics Chart" 
              className="w-full h-auto rounded-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HowToBuy = () => {
  const { toast } = useToast();

  const handleCopy = async () => {
    const address = "EQDKMh511DOn02mL0nf0JrND0TlkUKmos17eK9zKyGAsjS1K";
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard.",
      });
    } catch (err) {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast({
          title: "Copied!",
          description: "Contract address copied to clipboard.",
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to copy address manually.",
        });
      }
      document.body.removeChild(textArea);
    }
  };

  const buyOptions = [
    {
      name: "Bidask (recommended)",
      url: "https://bidask.finance/en/app/swap/ton/EQDKMh511DOn02mL0nf0JrND0TlkUKmos17eK9zKyGAsjS1K",
      color: "bg-blue-100"
    },
    {
      name: "Ston.fi Pool",
      url: "https://app.ston.fi/pools/EQCx6omZ3w4osBk8bBnDJwAjY9cV1QYaLUnDFdWvlvyTzHGQ",
      color: "bg-green-100"
    },
    {
      name: "Dtrade (Telegram App)",
      url: "https://t.me/dtrade?start=EQDKMh511DOn02mL0nf0JrND0TlkUKmos17eK9zKyGAsjS1K",
      color: "bg-purple-100"
    }
  ];

  return (
    <section id="how-to-buy" className="py-20 border-b-2 border-black bg-accent/10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How to Buy $TONDEV</h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {buyOptions.map((option, idx) => (
            <motion.a
              key={idx}
              href={option.url}
              target="_blank"
              rel="noreferrer"
              className={`block p-8 ${option.color} sketch-border flex flex-col items-center justify-center gap-4 min-h-[200px] group text-center`}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl font-hand font-bold group-hover:underline underline-offset-4">
                {option.name}
              </span>
              <ExternalLink className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
           <div className="order-2 md:order-1">
             <div className="bg-white p-6 sketch-border text-left">
                <h3 className="font-bold mb-2">Contract Address:</h3>
                <div className="font-mono text-xs md:text-sm break-all bg-gray-100 p-2 rounded border border-gray-300 flex items-center justify-between gap-2">
                  EQDKMh511DOn02mL0nf0JrND0TlkUKmos17eK9zKyGAsjS1K
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={handleCopy}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
             </div>
             <div className="mt-6 space-y-4 font-mono text-sm">
                <p className="flex items-center gap-2">
                   <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                   Install TON Wallet (Tonkeeper, Wallet in TG)
                </p>
                <p className="flex items-center gap-2">
                   <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                   Get some TON from exchange or P2P
                </p>
                <p className="flex items-center gap-2">
                   <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                   Click a link above and swap TON for $TONDEV
                </p>
             </div>
           </div>
           
           <div className="order-1 md:order-2 flex justify-center">
              <motion.div 
                 className="sketch-border p-1 bg-black rotate-2"
                 whileHover={{ rotate: 0 }}
              >
                 <img src={swapScreen} alt="Swap Interface" className="rounded w-64 md:w-full" />
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 border-b-2 border-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">Roadmap</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-green-200 inline-block px-2 -rotate-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Done ✅</h3>
            <ul className="space-y-4">
               <li className="flex items-start gap-2 font-mono">
                  <Check className="w-5 h-5 mt-0.5 text-green-600" />
                  <span>TONDEV Golden Visa</span>
               </li>
               <li className="flex items-start gap-2 font-mono">
                  <Check className="w-5 h-5 mt-0.5 text-green-600" />
                  <span>Token launch</span>
               </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-yellow-200 inline-block px-2 rotate-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">In Plans 🚧</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-2 font-mono text-muted-foreground">
                  <span className="text-xl">💻</span>
                  <span>Hosting Hackathons</span>
               </li>
               <li className="flex items-start gap-2 font-mono text-muted-foreground">
                  <span className="text-xl">🛡️</span>
                  <span>Smart Contract Auditing & Bug Bounties</span>
               </li>
               <li className="flex items-start gap-2 font-mono text-muted-foreground">
                  <span className="text-xl">🛑</span>
                  <span>Stop TON Blockchain</span>
               </li>
               <li className="flex items-start gap-2 font-mono text-muted-foreground">
                  <span className="text-xl">♻️</span>
                  <span>Restart TON Blockchain</span>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="community" className="py-24 bg-primary text-primary-foreground border-b-2 border-black text-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Join the Dev Army
          </h2>
          <p className="text-xl md:text-2xl font-hand mb-8 max-w-2xl mx-auto">
            Build & Meme with $TONDEV
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 text-xl px-10 py-8 h-auto font-hand border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            onClick={() => window.location.href = '#how-to-buy'}
          >
            Buy $TONDEV
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="TONDEV" className="w-10 h-10 rounded-full border border-white" />
          <span className="font-hand text-2xl font-bold">$TONDEV</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-mono text-sm">
          <a href="#about" className="hover:text-primary transition-colors">Token</a>
          <a href="#tokenomics" className="hover:text-primary transition-colors">Tokenomics</a>
          <a href="#how-to-buy" className="hover:text-primary transition-colors">How to Buy</a>
          <a href="#community" className="hover:text-primary transition-colors">Community</a>
        </div>

        <div className="flex gap-6">
          <a href="https://t.me/tondev_jetton" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Telegram</a>
          <a href="https://x.com/tondevmeme" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Twitter (X)</a>
        </div>

        <div className="max-w-lg text-center text-xs text-gray-500 font-mono">
          <p>This is a meme token with no financial promises.</p>
          <p>$TONDEV is created purely for entertainment and community purposes.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tokenomics />
        <HowToBuy />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
