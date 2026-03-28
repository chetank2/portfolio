import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function ProjectCardHover({ children, className = "", href }: Props) {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
    borderColor: hovered ? "#3a3a3a" : "#2a2a2a",
    backgroundColor: hovered ? "#1e1e1e" : "#1a1a1a",
    boxShadow: hovered
      ? "0 8px 32px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.3)"
      : "0 0 0 rgba(0,0,0,0)",
    transition: "all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  const content = (
    <div
      className={`border rounded-xl h-full ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}
