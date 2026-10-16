"use client";

import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { whatsappLink } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { formatPhone, isValidPhone } from "@/lib/phone";

type Fields = { name: string; phone: string; age: string; message: string };
type Errors = Partial<Record<"name" | "phone" | "age", string>>;

const EMPTY: Fields = { name: "", phone: "", age: "", message: "" };

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1.5 overflow-hidden pt-1.5 text-sm font-semibold text-red-600"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm() {
  const { t } = useLanguage();
  const f = t.contacts.form;
  const uid = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (v: Fields): Errors => ({
    ...(v.name.trim().length < 2 && { name: f.errors.name }),
    ...(!isValidPhone(v.phone) && { phone: f.errors.phone }),
    ...(v.age === "" && { age: f.errors.age }),
  });
  const errors = touched ? validate(fields) : {};

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = key === "phone" ? formatPhone(e.target.value) : e.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
    setSent(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(fields);
    const firstInvalid = (["name", "phone", "age"] as const).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    const ageLabel = f.ageOptions[Number(fields.age)] ?? fields.age;
    const text = [
      f.wa.greeting,
      "",
      `${f.wa.name}: ${fields.name.trim()}`,
      `${f.wa.phone}: ${fields.phone}`,
      `${f.wa.age}: ${ageLabel}`,
      ...(fields.message.trim() ? [`${f.wa.message}: ${fields.message.trim()}`] : []),
    ].join("\n");
    const url = whatsappLink(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setSent(true);
  };

  const inputClass = (invalid: boolean) =>
    cn(
      "mt-1.5 block w-full rounded-2xl border-2 bg-cream/60 px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 transition-colors outline-none focus:bg-white",
      invalid ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-brand",
    );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4" aria-describedby={`${uid}-note`}>
      <div>
        <label htmlFor={`${uid}-name`} className="text-sm font-extrabold text-ink">
          {f.name} <span className="text-brand" aria-hidden="true">*</span>
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={set("name")}
          placeholder={f.namePlaceholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          className={inputClass(!!errors.name)}
        />
        <FieldError id={`${uid}-name-err`} msg={errors.name} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-phone`} className="text-sm font-extrabold text-ink">
            {f.phone} <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={fields.phone}
            onChange={set("phone")}
            placeholder={f.phonePlaceholder}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            className={inputClass(!!errors.phone)}
          />
          <FieldError id={`${uid}-phone-err`} msg={errors.phone} />
        </div>
        <div>
          <label htmlFor={`${uid}-age`} className="text-sm font-extrabold text-ink">
            {f.age} <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <select
            id={`${uid}-age`}
            name="age"
            required
            value={fields.age}
            onChange={set("age")}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? `${uid}-age-err` : undefined}
            className={cn(inputClass(!!errors.age), "appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10", !fields.age && "text-ink-soft/70")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232074ED' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              {f.agePlaceholder}
            </option>
            {f.ageOptions.map((opt, i) => (
              <option key={i} value={String(i)} className="text-ink">
                {opt}
              </option>
            ))}
          </select>
          <FieldError id={`${uid}-age-err`} msg={errors.age} />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="text-sm font-extrabold text-ink">
          {f.message}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={fields.message}
          onChange={set("message")}
          placeholder={f.messagePlaceholder}
          className={cn(inputClass(false), "resize-y")}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full !min-h-[3.25rem] text-base">
        <Send className="h-5 w-5" aria-hidden="true" />
        {f.submit}
      </button>

      <p id={`${uid}-note`} className="text-center text-sm text-ink-soft">
        {f.note}
      </p>
      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-sky-soft px-4 py-3 text-sm font-bold text-brand-deep"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
            {f.opened}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
