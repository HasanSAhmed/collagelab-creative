import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => subscribeSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("subscribers")
      .insert({ email: data.email.toLowerCase() });
    if (error) {
      if (error.code === "23505") {
        return { ok: true, alreadySubscribed: true };
      }
      throw new Error("Could not subscribe right now.");
    }
    return { ok: true, alreadySubscribed: false };
  });

const submissionSchema = z.object({
  creator_name: z.string().trim().min(1).max(100),
  creator_email: z.string().trim().email().max(255),
  title: z.string().trim().min(1).max(200),
  medium: z.enum(["music", "art", "animation", "writing", "video", "other"]),
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
    return { ok: true };
  });


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
    return { ok: true };
  });

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
