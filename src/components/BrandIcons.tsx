export { InstagramIcon } from "./InstagramIcon";

/** WhatsApp-style glyph (brand icons are not shipped with lucide-react 1.x). */
export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M3.5 20.5l1.3-4.2A8.6 8.6 0 1 1 8 19.4l-4.5 1.1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 7.9c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.2.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.1.6-.1l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6v.4c0 .4-.1.7-.4.9-.6.5-1.4.7-2.2.5-2.9-.8-5.1-3-5.9-5.9-.2-.8 0-1.7.6-2.4z"
        fill="currentColor"
      />
    </svg>
  );
}
