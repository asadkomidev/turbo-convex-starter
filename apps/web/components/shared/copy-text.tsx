"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export function CopyText({ value }: { value: string }) {
  const [_, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(value);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="font-mono text-[#878787] text-xs md:text-sm px-4 py-2 rounded-full border border-primary/30 flex items-center mx-auto gap-4 bg-background"
    >
      <span>{value}</span>
      {copied ? (
        <Check className="size-5 text-green-500" />
      ) : (
        <Copy className="size-5 cursor-pointer" />
      )}
    </button>
  );
}
