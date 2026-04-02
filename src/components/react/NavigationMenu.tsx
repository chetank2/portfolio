import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Link {
  label: string;
  href: string;
  number: string;
}

interface Props {
  links: Link[];
}

export default function NavigationMenu({ links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-text-primary"
        aria-label="Open menu"
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-backdrop fixed inset-0 z-50 flex flex-col items-start justify-center px-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="font-mono text-sm text-accent">{link.number}</span>
                  <span className="font-display text-3xl text-text-primary group-hover:text-accent transition-colors duration-300">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
