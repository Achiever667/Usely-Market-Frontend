import type * as React from 'react';

export function MarketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4.75 10.25v7.5A2.25 2.25 0 0 0 7 20h10a2.25 2.25 0 0 0 2.25-2.25v-7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 4h13l1.25 5.25A2.75 2.75 0 0 1 15 11.18a2.75 2.75 0 0 1-6 0 2.75 2.75 0 0 1-4.75-1.93L5.5 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-4.25A1.75 1.75 0 0 1 10.75 14h2.5A1.75 1.75 0 0 1 15 15.75V20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
