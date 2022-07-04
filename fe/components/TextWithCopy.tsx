import { debounce } from "lodash";
import { useState } from "react";

export const TextWithCopy: React.FC<{ text: string; maxLength?: number }> = ({
  text,
  maxLength = 8,
}) => {
  const [copied, setCopied] = useState(false);
  const stateDebounce = debounce(() => setCopied(false), 1000);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    stateDebounce();
  };

  return (
    <div className="flex flex-row items-center group">
      <span>{text.slice(0, maxLength)}...</span>
      <button
        onClick={handleCopy}
        type="button"
        className="bg-transparent border-none outline-none ml-2 group-hover:opacity-100 opacity-0"
      >
        {!copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
