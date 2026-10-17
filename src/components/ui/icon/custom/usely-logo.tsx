import type * as React from 'react';

export function UselyLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M12 13.5a2 2 0 0 1 2-2h2v9.25c0 2.485 1.79 4.25 4 4.25s4-1.765 4-4.25V11.5h2a2 2 0 0 1 2 2v7.25C28 25.485 24.537 29 20 29s-8-3.515-8-8.25V13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
