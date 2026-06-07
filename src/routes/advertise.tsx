import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendAdInquiry } from "@/lib/marsbox.functions";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkle } from "@/components/site/decor";

export const Route = createFileRoute("/advertise")({
  head: () => ({
    meta: [
      { title: "Partner with us — CollageLab" },
      { name: "description", content: "Back the artists making Ottawa interesting. Print + digital placements in CollageLab, from $25." },
      { property: "og:title", content: "Partner with CollageLab" },
      { property: "og:description", content: "Support local art. Print + digital placements from $25." },
    ],
  }),
  component: Advertise,
});

function Advertise() {
  const send = useServerFn(sendAdInquiry);
  const [form, setForm] = useState({ name: "", company: "", email: "", budget: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await send({ data: form });
      toast.success("Got it — we'll be in touch within a few days.");
      setForm({ name: "", company: "", email: "", budget: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <section className="relative mx-auto max-w-3xl px-5 pt-20 pb-10 md:px-8">
        <p className="font-hand text-2xl text-tomato">— for local businesses</p>
        <h1 className="mt-2 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em]">
          Sponsor the<br />
          <span className="italic text-warm-blue">art scene</span>.
        </h1>
        <p className="mt-6 text-lg text-foreground/75">
          CollageLab is read by Ottawa's most curious, creative, and locally-active
          people. A placement isn't an ad — it's a vote for the scene.
          Placements start at $25.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
        <form onSubmit={onSubmit} className="mt-2 space-y-5 rounded-md border-2 border-foreground bg-cream p-7 md:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="aname">Your name</Label>
              <Input id="aname" required maxLength={100} value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acompany">Business / project</Label>
              <Input id="acompany" maxLength={150} value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aemail">Email</Label>
              <Input id="aemail" type="email" required maxLength={255} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="abudget">Budget range</Label>
              <Input id="abudget" maxLength={50} placeholder="e.g. $25 - $100" value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amsg">What would you like to share?</Label>
            <Textarea id="amsg" required maxLength={2000} rows={5} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" disabled={loading} size="lg" className="rounded-full bg-tomato hover:bg-tomato/90">
            {loading ? "Sending…" : (<><Sparkle className="mr-1 h-4 w-4" /> Send inquiry</>)}
          </Button>
          <p className="font-hand text-lg text-warm-blue">we will get in touch with you soon</p>
        </form>
      </section>

      <Footer />
    </div>
  );
}
