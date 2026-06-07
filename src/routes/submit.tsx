import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitWork, createUploadUrl } from "@/lib/marsbox.functions";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkle } from "@/components/site/decor";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit your work — Collage Lab" },
      { name: "description", content: "Send your painting, sculpture, music, film, photography, or poetry to Collage Lab. Free submissions, always." },
      { property: "og:title", content: "Submit your work — Collage Lab" },
      { property: "og:description", content: "Your work belongs here. Free submissions, always." },
    ],
  }),
  component: Submit,
});

const MAX_FILE_MB = 25;

const MEDIA = [
  { v: "painting", l: "Painting" },
  { v: "illustration", l: "Illustration" },
  { v: "sculpture", l: "Sculpture" },
  { v: "ceramics", l: "Ceramics" },
  { v: "music", l: "Music / audio" },
  { v: "photography", l: "Photography" },
  { v: "film", l: "Film / video" },
  { v: "animation", l: "Animation" },
  { v: "poetry", l: "Poetry / writing" },
  { v: "printmaking", l: "Printmaking" },
  { v: "other", l: "Other" },
] as const;

const STICKERS = [
  { l: "Painting", c: "bg-tomato text-cream", r: "-rotate-2" },
  { l: "Music", c: "bg-mustard", r: "rotate-1" },
  { l: "Film", c: "bg-warm-blue text-cream", r: "-rotate-1" },
  { l: "Photo", c: "bg-dusty-pink", r: "rotate-2" },
  { l: "Sculpture", c: "bg-dusty-purple text-cream", r: "-rotate-3" },
  { l: "Poetry", c: "bg-earth-green text-cream", r: "rotate-2" },
  { l: "Ceramics", c: "bg-cream border-2 border-foreground", r: "-rotate-1" },
  { l: "Printmaking", c: "bg-tomato text-cream", r: "rotate-3" },
];

type MediumValue = typeof MEDIA[number]["v"];

function Submit() {
  const submit = useServerFn(submitWork);
  const getUploadUrl = useServerFn(createUploadUrl);

  const [form, setForm] = useState({
    creator_name: "",
    creator_email: "",
    title: "",
    medium: "painting" as MediumValue,
    other_medium: "",
    description: "",
  });
  const [links, setLinks] = useState<string[]>([""]);
  const [files, setFiles] = useState<(File | null)[]>([null]);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function updateLink(i: number, v: string) {
    setLinks((arr) => arr.map((l, idx) => (idx === i ? v : l)));
  }
  function addLink() {
    setLinks((arr) => [...arr, ""]);
  }
  function removeLink(i: number) {
    setLinks((arr) => arr.filter((_, idx) => idx !== i));
  }

  function updateFile(i: number, f: File | null) {
    setFiles((arr) => arr.map((x, idx) => (idx === i ? f : x)));
  }
  function addFile() {
    setFiles((arr) => [...arr, null]);
  }
  function removeFile(i: number) {
    setFiles((arr) => arr.filter((_, idx) => idx !== i));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const realFiles = files.filter((f): f is File => f !== null);
    for (const f of realFiles) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`"${f.name}" is over ${MAX_FILE_MB}MB. Email it to art@collagelab.ca instead.`);
        return;
      }
    }
    setLoading(true);
    try {
      const file_paths: string[] = [];
      for (const file of realFiles) {
        const { path, token } = await getUploadUrl({
          data: { filename: file.name, contentType: file.type || "application/octet-stream" },
        });
        const { error } = await supabase.storage
          .from("submissions")
          .uploadToSignedUrl(path, token, file);
        if (error) throw new Error("Upload failed.");
        file_paths.push(path);
      }

      const cleanLinks = links.map((l) => l.trim()).filter(Boolean);

      await submit({
        data: {
          creator_name: form.creator_name,
          creator_email: form.creator_email,
          title: form.title,
          medium: form.medium,
          other_medium: form.medium === "other" ? form.other_medium : "",
          description: form.description,
          links: cleanLinks,
          file_paths,
        },
      });
      toast.success("We've got it. We read every submission — talk soon.");
      setForm({ creator_name: "", creator_email: "", title: "", medium: "painting", other_medium: "", description: "" });
      setLinks([""]);
      setFiles([null]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <section className="relative mx-auto max-w-4xl px-5 pt-16 pb-8 text-center md:px-8 md:pt-24">
        <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-[-0.03em]">
          Your work<br /><span className="italic text-warm-blue">belongs</span> here.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/75">
          Send us anything you've made — finished or unfinished, polished or weird,
          serious or playful. We read every submission. We never charge to submit.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-base text-foreground/65">
          Need help, or have a file bigger than {MAX_FILE_MB}MB? Email us at{" "}
          <a href="mailto:art@collagelab.ca" className="underline">art@collagelab.ca</a>.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {STICKERS.map((s) => (
            <span key={s.l} className={`sticker ${s.c} ${s.r} text-base`}>
              {s.l}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
        <form onSubmit={onSubmit} className="space-y-6 rounded-md border-2 border-foreground bg-cream p-7 md:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" required maxLength={100} value={form.creator_name}
                onChange={(e) => update("creator_name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required maxLength={255} value={form.creator_email}
                onChange={(e) => update("creator_email", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title of the piece</Label>
            <Input id="title" required maxLength={200} value={form.title}
              onChange={(e) => update("title", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>What kind of work?</Label>
            <Select value={form.medium} onValueChange={(v) => update("medium", v as MediumValue)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MEDIA.map((m) => (
                  <SelectItem key={m.v} value={m.v}>{m.l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.medium === "other" && (
              <Input
                className="mt-2"
                placeholder="Tell us what kind of work it is"
                maxLength={100}
                value={form.other_medium}
                onChange={(e) => update("other_medium", e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Tell us about it</Label>
            <Textarea id="desc" required maxLength={2000} rows={5} value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="What is it? What were you trying to do? What should we know about you?" />
          </div>

          <div className="space-y-2">
            <Label>Links <span className="text-muted-foreground">(optional — add as many as you like: YouTube, Vimeo, Soundcloud, IG, portfolio…)</span></Label>
            {links.map((link, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  type="url"
                  maxLength={500}
                  placeholder="https://…"
                  value={link}
                  onChange={(e) => updateLink(i, e.target.value)}
                />
                {links.length > 1 && (
                  <Button type="button" variant="outline" onClick={() => removeLink(i)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addLink}>
              + Add another link
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">
              Upload files <span className="text-muted-foreground">(optional — you can pick multiple, max {MAX_FILE_MB}MB each)</span>
            </Label>
            <Input
              id="file"
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
            {files.length > 0 && (
              <ul className="mt-1 list-disc pl-5 text-sm text-foreground/70">
                {files.map((f) => (
                  <li key={f.name}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full bg-tomato hover:bg-tomato/90 sm:w-auto">
            {loading ? "Sending…" : (<><Sparkle className="mr-1 h-4 w-4" /> Send it to Collage Lab</>)}
          </Button>
        </form>

        <p className="mt-6 text-center font-hand text-xl text-warm-blue">
          you'll get a reply from us soon
        </p>
      </section>

      <Footer />
    </div>
  );
}
