import React from 'react';
import type { LucideProps } from 'lucide-react';

function InlineCode({ size = 24, ...props }: LucideProps, ref: React.Ref<SVGSVGElement>) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 6.5l-5.5 5.5l5.5 5.5" />
      <path d="M16 6.5l5.5 5.5l-5.5 5.5" />
    </svg>
  );
}

export default React.forwardRef<SVGSVGElement, LucideProps>(InlineCode);
