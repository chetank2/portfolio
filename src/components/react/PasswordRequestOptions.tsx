import { useState } from "react";
import {
  PASSWORD_REQUEST_CHANNELS,
  buildPasswordRequestEmailUrl,
  buildPasswordRequestMessage,
  buildPasswordRequestXUrl,
} from "../../lib/caseStudyProtection";

interface Props {
  caseStudyTitle: string;
}

type ChannelKey = keyof typeof PASSWORD_REQUEST_CHANNELS;

const COPY_FEEDBACK_MS = 1400;

const channels: Array<{
  key: ChannelKey;
  href: (caseStudyTitle: string) => string;
  icon: JSX.Element;
}> = [
  {
    key: "linkedin",
    href: () => PASSWORD_REQUEST_CHANNELS.linkedin.href,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M5.4 8.8h3.4V19H5.4V8.8Zm1.7-4.9a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM10.7 8.8H14v1.4h.1c.5-.9 1.6-1.7 3.2-1.7 3.4 0 4.1 2.2 4.1 5.1V19H18v-4.8c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V19h-3.4V8.8Z" />
      </svg>
    ),
  },
  {
    key: "x",
    href: buildPasswordRequestXUrl,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.7 10.6 20.4 3h-1.6L13 9.6 8.4 3H3l7 10-7 8h1.6l6.1-6.9 4.9 6.9H21l-7.3-10.4Zm-2.2 2.5-.7-1L5.2 4.2h2.4l4.5 6.4.7 1 5.9 8.2h-2.4l-4.8-6.7Z" />
      </svg>
    ),
  },
  {
    key: "email",
    href: buildPasswordRequestEmailUrl,
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function PasswordRequestOptions({ caseStudyTitle }: Props) {
  const [copiedChannel, setCopiedChannel] = useState<ChannelKey | null>(null);

  async function handleRequest(channel: (typeof channels)[number]) {
    const message = buildPasswordRequestMessage(caseStudyTitle);

    try {
      await copyText(message);
      setCopiedChannel(channel.key);
      window.setTimeout(() => setCopiedChannel(null), COPY_FEEDBACK_MS);
    } catch {
      setCopiedChannel(null);
    }

    window.open(channel.href(caseStudyTitle), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-8">
      <p className="min-meta mb-3" style={{ fontStyle: "italic" }}>
        Request access
      </p>
      <div className="flex flex-wrap gap-3">
        {channels.map((channel) => {
          const config = PASSWORD_REQUEST_CHANNELS[channel.key];
          const isCopied = copiedChannel === channel.key;

          return (
            <button
              key={channel.key}
              type="button"
              onClick={() => void handleRequest(channel)}
              className="min-meta inline-flex items-center gap-2 border border-border px-4 py-2 text-text-secondary transition-colors duration-200 hover:border-text-primary hover:text-text-primary"
              style={{ fontStyle: "italic", letterSpacing: "0.02em" }}
            >
              {channel.icon}
              <span>{isCopied ? "copied" : config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
