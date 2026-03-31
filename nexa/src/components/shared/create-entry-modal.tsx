"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type CreateEntryModalProps = {
  buttonLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  children: (helpers: { closeModal: () => void }) => ReactNode;
};

export function CreateEntryModal({
  buttonLabel,
  eyebrow,
  title,
  description,
  children,
}: CreateEntryModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
        >
          {buttonLabel}
        </button>
      </div>

      {canUsePortal && isOpen
        ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={closeModal}
          />
          <div className="relative flex max-h-full w-full items-center justify-center">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-border bg-[#f8f4ed] p-6 shadow-[0_24px_60px_rgba(46,55,45,0.22)] md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow text-muted">{eyebrow}</p>
                  <h2
                    id={titleId}
                    className="mt-3 text-2xl font-semibold tracking-tight"
                  >
                    {title}
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-3 max-w-2xl text-sm leading-6 text-muted"
                  >
                    {description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted transition hover:bg-white hover:text-foreground"
                >
                  Schliessen
                </button>
              </div>

              <div className="mt-6">{children({ closeModal })}</div>
            </div>
          </div>
        </div>,
        document.body,
      )
        : null}
    </>
  );
}
