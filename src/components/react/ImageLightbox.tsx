import { useState, useEffect, type ReactNode } from "react";

interface Props {
  image: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function ImageLightbox({ image, title, description, children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-backdrop absolute inset-0 backdrop-blur-sm"
            style={{
              animation: "fadeIn 200ms ease-out",
            }}
          />

          <div
            className="relative z-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto px-6 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "scaleIn 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="flex-1 flex items-center justify-center max-h-[75vh]">
              <img
                src={image}
                alt={title}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="md:w-72 shrink-0 text-center md:text-left">
              <h3 className="text-2xl font-display font-700 text-text-primary mb-3">{title}</h3>
              <p className="text-text-secondary font-body text-sm leading-relaxed">{description}</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute -top-2 right-4 md:right-0 w-10 h-10 flex items-center justify-center text-text-secondary hover:text-accent transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.97); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
