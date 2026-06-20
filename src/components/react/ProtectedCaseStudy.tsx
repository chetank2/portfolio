import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import PasswordRequestOptions from "./PasswordRequestOptions";
import { CASE_STUDY_PASSWORD_LOCK_ENABLED } from "../../lib/caseStudyProtection";

interface Props {
  password: string;
  storageKey: string;
  title: string;
  tagline?: string;
  summary?: string;
  children: ReactNode;
}

export default function ProtectedCaseStudy({
  password,
  storageKey,
  title,
  tagline,
  summary,
  children,
}: Props) {
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!CASE_STUDY_PASSWORD_LOCK_ENABLED) {
    return <>{children}</>;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncUnlockedState = () => {
      setUnlocked(window.sessionStorage.getItem(storageKey) === "unlocked");
    };

    syncUnlockedState();

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== storageKey) return;
      syncUnlockedState();
    };

    const handleProtectedStateChange = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key && detail.key !== storageKey) return;
      syncUnlockedState();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("case-study-protection-change", handleProtectedStateChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("case-study-protection-change", handleProtectedStateChange);
    };
  }, [storageKey]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (value === password) {
      window.sessionStorage.setItem(storageKey, "unlocked");
      window.dispatchEvent(
        new CustomEvent("case-study-protection-change", {
          detail: { key: storageKey, state: "unlocked" },
        }),
      );
      setUnlocked(true);
      setError("");
      setValue("");
      return;
    }

    setError("Incorrect password");
  }

  function handleLockAgain() {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(storageKey);
      window.dispatchEvent(
        new CustomEvent("case-study-protection-change", {
          detail: { key: storageKey, state: "locked" },
        }),
      );
    }

    setUnlocked(false);
    setValue("");
    setError("");
    setShowPassword(false);
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <section className="mt-10 sm:mt-12">
      <p className="min-small mb-4" style={{ fontStyle: "italic" }}>Protected case study</p>
      <h2 className="min-title">{title}</h2>
      {tagline ? (
        <p className="min-subtitle mt-3">{tagline}</p>
      ) : null}
      {summary ? (
        <p className="min-body-secondary mt-5">{summary}</p>
      ) : null}
      <p className="min-meta mt-6" style={{ fontStyle: "italic" }}>
        Enter the shared password to view the full case study.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex max-w-sm flex-col gap-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter password"
            className="min-meta w-full border-b border-border bg-transparent px-0 py-3 pr-14 text-text-primary outline-none transition-colors focus:border-text-primary"
            style={{ borderRadius: 0 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                <path d="M9.4 5.5A10.7 10.7 0 0 1 12 5c5.5 0 9.5 7 9.5 7a16.7 16.7 0 0 1-4.1 4.8" />
                <path d="M6.7 6.7A16.1 16.1 0 0 0 2.5 12s4 7 9.5 7a10.7 10.7 0 0 0 5.3-1.5" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M2.5 12S6.5 5 12 5s9.5 7 9.5 7-4 7-9.5 7S2.5 12 2.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {error ? (
          <p className="min-meta text-red-400">{error}</p>
        ) : null}
        <button
          type="submit"
          className="min-meta inline-flex w-fit items-center justify-center border border-text-primary px-6 py-2 text-text-primary bg-transparent transition-all duration-200 hover:bg-text-primary hover:text-bg-deep"
          style={{ fontStyle: "italic", letterSpacing: "0.02em" }}
        >
          Unlock
        </button>
      </form>
      <PasswordRequestOptions caseStudyTitle={title} />
    </section>
  );
}
