import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";

export function PiReferralBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteCode = "prakashphiroda";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground border-t border-primary-foreground/10 shadow-lg px-4 py-3 flex items-center justify-between sm:justify-center sm:gap-8 transition-transform duration-300">
        <div className="text-sm font-medium flex items-center gap-2">
          <span>🚀</span>
          <span className="hidden sm:inline">Join Pi Network — Invited By: @{inviteCode}</span>
          <span className="sm:hidden">Join Pi Network</span>
        </div>
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-xs sm:text-sm h-8 sm:h-9"
        >
          Open Pi App
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-primary flex items-center gap-2">
              <span>🚀</span> Join Pi Network
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Start mining Pi cryptocurrency today on your phone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Step 1: Download the App</h4>
              <p className="text-sm text-muted-foreground">Get the Pi Network app from the App Store or Google Play.</p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://minepi.com/" target="_blank" rel="noopener noreferrer">Visit Website</a>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Step 2: Use Invitation Code</h4>
              <p className="text-sm text-muted-foreground">You need an invitation to join. Use my code to get started and earn a bonus!</p>
              
              <div className="flex items-center gap-2 mt-2 p-3 bg-muted rounded-md border border-border">
                <code className="flex-1 font-mono text-primary font-bold text-lg">{inviteCode}</code>
                <Button size="icon" variant="ghost" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
