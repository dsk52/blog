"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";

type PostBodyProps = {
  body: string;
};

const RESET_DELAY_MS = 2000;

export const PostBody = ({ body }: PostBodyProps) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bodyElement = bodyRef.current;

    if (!bodyElement || !body) {
      return;
    }

    let isDisposed = false;
    const cleanups: Array<() => void> = [];

    for (const codeElement of bodyElement.querySelectorAll<HTMLPreElement>("pre > code")) {
      const preElement = codeElement.parentElement;

      if (!preElement) {
        continue;
      }

      preElement.classList.add("tw:relative");

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "コードをコピー");
      button.setAttribute("aria-live", "polite");
      button.textContent = "コピー";
      button.className = clsx(
        "tw:absolute tw:top-2 tw:right-2 tw:rounded tw:border tw:border-white/30",
        "tw:bg-slate-800 tw:px-2 tw:py-1 tw:text-xs tw:text-white tw:cursor-pointer",
        "tw:opacity-80 tw:transition-opacity hover:tw:opacity-100"
      );

      let resetTimer: ReturnType<typeof setTimeout> | undefined;
      const handleClick = async () => {
        if (resetTimer) {
          clearTimeout(resetTimer);
        }

        try {
          await navigator.clipboard.writeText(codeElement.textContent ?? "");

          if (isDisposed) {
            return;
          }

          button.textContent = "コピーしました";
        } catch {
          if (isDisposed) {
            return;
          }

          button.textContent = "コピーできませんでした";
        }

        resetTimer = setTimeout(() => {
          button.textContent = "コピー";
        }, RESET_DELAY_MS);
      };

      button.addEventListener("click", handleClick);
      preElement.append(button);

      cleanups.push(() => {
        if (resetTimer) {
          clearTimeout(resetTimer);
        }
        button.removeEventListener("click", handleClick);
        button.remove();
        preElement.classList.remove("tw:relative");
      });
    }

    return () => {
      isDisposed = true;
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [body]);

  return (
    <div
      ref={bodyRef}
      className={clsx(
        "tw:prose tw:prose-slate tw:max-w-none",
        // custom tailwindcss-typography
        "tw:prose-p:my-[1.4em] tw:prose-p:leading-[1.9]",
        "tw:prose-ul:my-6 tw:prose-ol:my-6 tw:prose-li:my-1",
        "tw:prose-h2:mt-16 tw:prose-h2:mb-6",
        "tw:prose-h3:mt-10 tw:prose-h3:mb-4",
        "tw:prose-pre:my-8 tw:prose-pre:px-5 tw:prose-pre:py-4 tw:prose-pre:leading-7",
        "tw:prose-a:transition-colors",
        "tw:prose-a:hover:no-underline tw:prose-a:hover:text-primary tw:prose-a:hover:opacity-70"
      )}
      data-testid="post-body"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: ブログ記事のHTML表示で必要
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};
