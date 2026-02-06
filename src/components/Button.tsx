import { clsx } from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "ghost" | "black";

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold tracking-wide transition active:translate-y-[1px] focus:outline-none focus:ring-4 focus:ring-sboom-yellow/30";
  const v: Record<Variant, string> = {
    primary: "bg-sboom-orange text-sboom-white shadow-punch hover:brightness-105",
    secondary: "bg-sboom-yellow text-sboom-black shadow-punch hover:brightness-105",
    ghost: "bg-transparent text-sboom-black hover:bg-black/5",
    black: "bg-sboom-black text-sboom-white shadow-punch hover:brightness-110",
  };
  return (
    <button className={clsx(base, v[variant], className)} {...props}>
      {children}
    </button>
  );
}
