import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary" | "inverse";

const BASE =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-neutral-600",
  secondary: "border border-neutral-300 bg-white text-black hover:border-black",
  inverse: "bg-white text-black hover:bg-neutral-300",
};

type Size = "md" | "lg";

const SIZES: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
};

function styles(variant: Variant, size: Size, className: string): string {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return <button type={type} className={styles(variant, size, className)} {...rest} />;
}

interface ButtonLinkProps extends Omit<LinkProps, "className" | "children"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={styles(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}
