import crypto from "node:crypto";

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function bookingDedupeKey(input: {
  phone: string;
  eventDateISO: string;
  eventAddress: string;
}): string {
  const raw = `${normalize(input.phone)}|${normalize(input.eventDateISO)}|${normalize(
    input.eventAddress
  )}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
}

