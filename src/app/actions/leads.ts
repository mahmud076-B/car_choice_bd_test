"use server";

import {
  contactSchema,
  preOrderSchema,
  verifySchema,
} from "@/lib/validations";
import { createInquiry, createPreOrder } from "@/lib/leads";

export type ActionResult =
  | { success: true; message: string; id?: string }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

function honeypotFilled(value: unknown) {
  return typeof value === "string" && value.length > 0;
}

export async function submitContact(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  if (honeypotFilled(raw.website_url_hp)) {
    return { success: true, message: "Thank you. We will contact you soon." };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const result = await createInquiry({
    inquiry_type: "GENERAL_CONTACT",
    name: parsed.data.name,
    phone: parsed.data.phone || undefined,
    email: parsed.data.email || undefined,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (!result.ok) {
    return { success: false, message: result.error };
  }

  return {
    success: true,
    message: "Inquiry received. Our sales team will reply shortly.",
    id: result.id,
  };
}

export async function submitVerify(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  if (honeypotFilled(raw.website_url_hp)) {
    return { success: true, message: "Request received." };
  }

  const parsed = verifySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please check chassis and contact details.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const result = await createInquiry({
    inquiry_type: "AUCTION_VERIFY",
    name: parsed.data.name,
    phone: parsed.data.phone,
    chassis: parsed.data.chassis.trim().toUpperCase(),
    subject: `Auction sheet verify: ${parsed.data.chassis}`,
    message:
      parsed.data.notes ||
      `Please verify auction sheet for chassis ${parsed.data.chassis}`,
  });

  if (!result.ok) {
    return { success: false, message: result.error };
  }

  return {
    success: true,
    message:
      "Verification request submitted. Continue on WhatsApp for the fastest response — this is a free lead service (no automated paid report in MVP).",
    id: result.id,
  };
}

export async function submitPreOrder(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  if (honeypotFilled(raw.website_url_hp)) {
    return { success: true, message: "Request received." };
  }

  const parsed = preOrderSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete the required fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const result = await createPreOrder({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email || undefined,
    preferred_make: parsed.data.preferred_make || undefined,
    preferred_model: parsed.data.preferred_model || undefined,
    year_min: parsed.data.year_min ? Number(parsed.data.year_min) : null,
    year_max: parsed.data.year_max ? Number(parsed.data.year_max) : null,
    budget_bdt: parsed.data.budget_bdt ? Number(parsed.data.budget_bdt) : null,
    notes: parsed.data.notes || undefined,
  });

  if (!result.ok) {
    return { success: false, message: result.error };
  }

  return {
    success: true,
    message:
      "Pre-order request saved. Our team will confirm sourcing options on WhatsApp.",
    id: result.id,
  };
}
