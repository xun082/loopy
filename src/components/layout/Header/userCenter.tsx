import Image from 'next/image';

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export default function UserCenter() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src="/user.png"
            alt="user"
            width={30}
            height={30}
            className="rounded-full border border-gray-300"
          />
        </TooltipTrigger>
        <TooltipContent>
          <ul className="flex flex-col gap-2">
            <li>个人资料</li>
            <li>设置</li>
            <li>退出</li>
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
