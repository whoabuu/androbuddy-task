import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary";

const BASE =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-neutral-600",
  secondary: "border border-neutral-300 bg-white text-black hover:border-black",
};

function styles(variant: Variant, className: string): string {
  return `${BASE} ${VARIANTS[variant]} ${className}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return <button type={type} className={styles(variant, className)} {...rest} />;
}

interface ButtonLinkProps extends Omit<LinkProps, "className" | "children"> {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={styles(variant, className)} {...rest}>
      {children}
    </Link>
  );
}
