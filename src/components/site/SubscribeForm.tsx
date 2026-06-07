import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeEmail } from "@/lib/marsbox.functions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const subscribe = useServerFn(subscribeEmail);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await subscribe({ data: { email } });
      toast.success(
        res.alreadySubscribed
          ? "You're already on the list — see you Sunday."
          : "You're in. Welcome to Collage Lab."
      );
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Please enter a valid email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex gap-2" : "flex flex-col gap-3 sm:flex-row"}>
      <Input
        type="email"
        required
        placeholder="you@somewhere.cool"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-full bg-cream border-2 border-foreground/20 px-5 h-12"
        maxLength={255}
      />
      <Button type="submit" disabled={loading} className="h-12 shrink-0 rounded-full bg-tomato px-6 hover:bg-tomato/90">
        {loading ? "Sending…" : "Get the dispatch"}
      </Button>
    </form>
  );
}
