import React from 'react';
import type { LucideProps } from 'lucide-react';

function TextColor({ size = 24, ...props }: LucideProps, ref: React.Ref<SVGSVGElement>) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
    >
      <path
        d="M11.1 1.65 4.17 19.25H7.03L8.68 14.96H15.72L17.37 19.25H20.23L13.3 1.65H11.1ZM9.56 12.32 12.2 5.28 14.84 12.32H9.56Z"
        transform="scale(0.9) translate(0.5,0)"
      />
    </svg>
  );
}

export default React.forwardRef<SVGSVGElement, LucideProps>(TextColor);
