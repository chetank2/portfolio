import { useEffect, useState, type FormEvent, type ReactNode } from "react";

interface Props {
  password: string;
  storageKey: string;
  title: string;
  children: ReactNode;
}

export default function ProtectedCaseStudy({
  password,
  storageKey,
  title,
  children,
}: Props) {
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    return (
      <div>
        <div className="mt-8 mb-6 flex justify-end">
          <button
            type="button"
            onClick={handleLockAgain}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 1 1 8 0v3" />
            </svg>
            Lock again
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <section className="mt-10 rounded-3xl border border-border bg-bg-elevated/60 p-6 sm:mt-12 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent/70">
        Protected Case Study
      </p>
      <h2 className="mt-4 text-2xl font-display font-700 text-text-primary sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-text-secondary font-body leading-relaxed">
        Enter the shared password to view this case study.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter password"
            className="w-full rounded-2xl border border-border bg-bg-deep px-4 py-3 pr-14 text-text-primary outline-none transition-colors focus:border-accent"
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
          <p className="text-sm font-body text-red-400">{error}</p>
        ) : null}
        <button
          type="submit"
          className="inline-flex w-fit items-center justify-center rounded-2xl bg-text-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-bg-deep transition-opacity hover:opacity-90"
        >
          Unlock
        </button>
      </form>
    </section>
  );
}
