import { clsx } from "clsx";
import type { PropsWithChildren } from "react";

export default function WavyCard({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={clsx("wavy bg-sboom-light bg-grain shadow-punch border border-black/10", className)}>
      <div className="relative p-5 sm:p-7">{children}</div>
    </section>
  );
}
