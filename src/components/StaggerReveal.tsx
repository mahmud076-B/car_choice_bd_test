"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; each card now times itself on enter */
  staggerMs?: number;
  durationMs?: number;
};

/**
 * Each direct child fades/rises on its own when it enters the viewport,
 * and resets when it leaves so the motion plays again on the next scroll.
 * Transform + opacity only (cheap on Android).
 */
export default function StaggerReveal({
  children,
  className = "",
  durationMs = 560,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = [...root.children] as HTMLElement[];
    items.forEach((el) => el.classList.add("stagger-item"));
    setArmed(true);

    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("is-in");
          else el.classList.remove("is-in");
        }
      },
      {
        // Fire per card, not when the whole block first peeks in
        threshold: 0.22,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`stagger-float-grid ${armed ? "is-armed" : ""} ${className}`.trim()}
      style={{ ["--stagger-dur"]: `${durationMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
