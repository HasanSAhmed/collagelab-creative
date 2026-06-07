import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ─── Email notifications via Resend ──────────────────────────────────────────
const NOTIFY_TO = ["art@collagelab.ca", "art.collagelab@gmail.com"];
// Until you verify collagelab.ca in Resend, sends use the shared sandbox sender.
// After verifying the domain, change this to e.g. "CollageLab <hello@collagelab.ca>"
const FROM_ADDRESS = "CollageLab <onboarding@resend.dev>";

async function sendNotification(subject: string, html: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping notification email");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: NOTIFY_TO,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("Resend send failed:", res.status, body);
    }
  } catch (err) {
    console.error("Resend send error:", err);
  }
}

const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );

// ─── Subscribe ───────────────────────────────────────────────────────────────
const subscribeSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => subscribeSchema.parse(input))
  .handler(async ({ data }) => {
    const email = data.email.toLowerCase();
    const { error } = await supabaseAdmin
      .from("subscribers")
      .insert({ email });
    if (error) {
      if (error.code === "23505") {
        return { ok: true, alreadySubscribed: true };
      }
      throw new Error("Could not subscribe right now.");
    }
    await sendNotification(
      `New CollageLab subscriber: ${email}`,
      `<p>A new person just subscribed to the Sunday Dispatch.</p>
       <p><strong>Email:</strong> ${esc(email)}</p>`,
    );
    return { ok: true, alreadySubscribed: false };
  });

// ─── Submissions ─────────────────────────────────────────────────────────────
const submissionSchema = z.object({
  creator_name: z.string().trim().min(1).max(100),
  creator_email: z.string().trim().email().max(255),
  title: z.string().trim().min(1).max(200),
  medium: z.enum(["painting","illustration","sculpture","ceramics","music","photography","film","animation","poetry","printmaking","art","writing","video","other"]),
  other_medium: z.string().trim().max(100).optional().or(z.literal("")),
  description: z.string().trim().min(1).max(2000),
  links: z.array(z.string().trim().url().max(500)).max(10).optional(),
  file_paths: z.array(z.string().trim().max(500)).max(10).optional(),
});

export const submitWork = createServerFn({ method: "POST" })
  .inputValidator((input) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    const links = (data.links ?? []).filter(Boolean);
    const files = (data.file_paths ?? []).filter(Boolean);
    const descSuffix = data.medium === "other" && data.other_medium
      ? `\n\n[Other medium: ${data.other_medium}]`
      : "";
    const { error } = await supabaseAdmin.from("submissions").insert({
      creator_name: data.creator_name,
      creator_email: data.creator_email.toLowerCase(),
      title: data.title,
      medium: data.medium,
      description: data.description + descSuffix,
      link: links.length ? links.join("\n") : null,
      file_path: files.length ? files.join("\n") : null,
    });
    if (error) throw new Error("Could not save your submission.");

    const linkList = links.length
      ? `<ul>${links.map((l) => `<li><a href="${esc(l)}">${esc(l)}</a></li>`).join("")}</ul>`
      : "<p><em>None</em></p>";
    const fileList = files.length
      ? `<ul>${files.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
         <p style="color:#666;font-size:13px">Files live in the <code>submissions</code> bucket in your backend.</p>`
      : "<p><em>None</em></p>";

    await sendNotification(
      `New submission: "${data.title}" — ${data.creator_name}`,
      `<h2>New CollageLab submission</h2>
       <p><strong>From:</strong> ${esc(data.creator_name)} &lt;${esc(data.creator_email)}&gt;</p>
       <p><strong>Title:</strong> ${esc(data.title)}</p>
       <p><strong>Medium:</strong> ${esc(data.medium)}${data.other_medium ? ` (${esc(data.other_medium)})` : ""}</p>
       <p><strong>Description:</strong></p>
       <p style="white-space:pre-wrap">${esc(data.description)}</p>
       <p><strong>Links:</strong></p>${linkList}
       <p><strong>Files:</strong></p>${fileList}`,
      data.creator_email,
    );
    return { ok: true };
  });

// ─── Ad Inquiries ────────────────────────────────────────────────────────────
const adSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email().max(255),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const sendAdInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => adSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("ad_inquiries").insert({
      name: data.name,
      company: data.company || null,
      email: data.email.toLowerCase(),
      budget: data.budget || null,
      message: data.message,
    });
    if (error) throw new Error("Could not send your inquiry.");

    await sendNotification(
      `New partnership inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      `<h2>New CollageLab partnership inquiry</h2>
       <p><strong>Name:</strong> ${esc(data.name)}</p>
       ${data.company ? `<p><strong>Business:</strong> ${esc(data.company)}</p>` : ""}
       <p><strong>Email:</strong> ${esc(data.email)}</p>
       ${data.budget ? `<p><strong>Budget:</strong> ${esc(data.budget)}</p>` : ""}
       <p><strong>Message:</strong></p>
       <p style="white-space:pre-wrap">${esc(data.message)}</p>`,
      data.email,
    );
    return { ok: true };
  });

// ─── Upload URL ──────────────────────────────────────────────────────────────
const uploadUrlSchema = z.object({
  filename: z.string().trim().min(1).max(200),
  contentType: z.string().trim().max(100),
});

export const createUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((input) => uploadUrlSchema.parse(input))
  .handler(async ({ data }) => {
    const safe = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${crypto.randomUUID()}-${safe}`;
    const { data: signed, error } = await supabaseAdmin.storage
      .from("submissions")
      .createSignedUploadUrl(path);
    if (error || !signed) throw new Error("Could not prepare upload.");
    return { path: signed.path, token: signed.token };
  });
