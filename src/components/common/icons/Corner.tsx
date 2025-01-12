import React from 'react';
import type { LucideProps } from 'lucide-react';

function Corner({ size = 24, ...props }: LucideProps, ref: React.Ref<SVGSVGElement>) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      {...props}
    >
      <path d="M15 .5A2.5 2.5 0 0 0 12.5 3v9.5H3a2.5 2.5 0 0 0 0 5h12a2.5 2.5 0 0 0 2.5-2.5V3A2.5 2.5 0 0 0 15 .5z" />
    </svg>
  );
}

export default React.forwardRef<SVGSVGElement, LucideProps>(Corner);
