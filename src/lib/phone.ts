/** Kazakhstan phone helpers: +7 (XXX) XXX XX XX */

export function phoneDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits[0] === "8") digits = `7${digits.slice(1)}`;
  else if (digits[0] !== "7") digits = `7${digits}`;
  return digits.slice(0, 11);
}

export function formatPhone(value: string): string {
  const d = phoneDigits(value);
  if (!d) return "";
  const rest = d.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += ` ${rest.slice(6, 8)}`;
  if (rest.length > 8) out += ` ${rest.slice(8, 10)}`;
  return out;
}

export function isValidPhone(value: string): boolean {
  return /^7\d{10}$/.test(phoneDigits(value));
}
