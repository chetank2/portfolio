import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function ProjectCardHover({ children, className = "", href }: Props) {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
    borderColor: hovered ? "#353225" : "#252318",
    backgroundColor: hovered ? "#1B1A14" : "#13120E",
    boxShadow: hovered
      ? "0 12px 40px rgba(200, 165, 85, 0.04), 0 2px 8px rgba(0,0,0,0.4)"
      : "0 0 0 rgba(0,0,0,0)",
    transition: "all 400ms cubic-bezier(0.22, 1, 0.36, 1)",
  };

  const content = (
    <div
      className={`border card-accent h-full ${className}`}
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
