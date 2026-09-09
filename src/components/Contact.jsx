import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Set VITE_WEB3FORMS_KEY in a .env file to send submissions straight to
// your inbox via https://web3forms.com (free, no backend needed). Without
// it, the form quietly falls back to opening the visitor's own mail client.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Contact() {
  const { t } = useLanguage();
  const info = t("contact.info");
  const infoLabels = t("contact.infoLabels");
  const form = t("contact.form");

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function openMailClient() {
    const subject = encodeURIComponent(`${values.name || "—"} — contacto desde el portfolio`);
    const body = encodeURIComponent(`${values.message}\n\n${values.name} · ${values.email}`);
    window.location.href = `mailto:${info.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.botcheck.checked) return; // honeypot tripped — silently drop

    if (!WEB3FORMS_KEY) {
      openMailClient();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${values.name || "—"} — contacto desde el portfolio`,
          from_name: "Jaskaran Singh — Portfolio",
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="grid-backdrop relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="mono-label mb-4"
        >
          {t("contact.kicker")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="font-display text-clamp1 font-semibold uppercase leading-[0.9] tracking-tight"
        >
          {t("contact.title")}
        </motion.h2>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2}
              className="max-w-md text-lg leading-relaxed text-graphite"
            >
              {t("contact.description")}
            </motion.p>

            <div className="mt-12 flex flex-col gap-8">
              {[
                { key: "email", href: `mailto:${info.email}` },
                { key: "phone", href: `tel:${info.phone.replace(/\s+/g, "")}` },
                { key: "location", href: null },
              ].map((row, i) => (
                <motion.div
                  key={row.key}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={0.3 + i * 0.1}
                  className="border-b border-ink/10 pb-4"
                >
                  <p className="mono-label mb-1">{infoLabels[row.key]}</p>
                  {row.href ? (
                    <a href={row.href} className="link-underline font-display text-xl font-medium tracking-tight md:text-2xl">
                      {info[row.key]}
                    </a>
                  ) : (
                    <p className="font-display text-xl font-medium tracking-tight md:text-2xl">{info[row.key]}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.3}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {/* Honeypot — invisible to people, catnip for bots */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <Field
              label={form.name}
              name="name"
              value={values.name}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />
            <Field
              label={form.email}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />
            <Field
              label={form.message}
              name="message"
              as="textarea"
              value={values.message}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full border border-ink px-6 py-3 font-display text-sm font-medium transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-[0_12px_24px_-12px_rgba(10,10,10,0.4)] active:translate-y-0 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? form.sending : form.submit}
                {status !== "sending" && (
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mono-label !text-blueprint"
                >
                  {form.success}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mono-label"
                >
                  {form.error}{" "}
                  <a href={`mailto:${info.email}`} className="link-underline !text-ink">
                    {info.email}
                  </a>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", as = "input", required = false, disabled = false }) {
  const Comp = as;
  return (
    <label className="group block">
      <span className="mono-label mb-2 block transition-colors duration-300 group-focus-within:!text-ink">{label}</span>
      <div className="relative">
        <Comp
          name={name}
          type={as === "input" ? type : undefined}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={as === "textarea" ? 5 : undefined}
          className="w-full resize-none border-b border-ink/20 bg-transparent py-2 font-body text-base text-ink outline-none disabled:opacity-50"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-ink transition-all duration-300 ease-smooth group-focus-within:w-full"
        />
      </div>
    </label>
  );
}
