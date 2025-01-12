import { icons, LucideIcon, LucideProps } from 'lucide-react';
import { memo } from 'react';
import clsx from 'clsx';

// 定义所有可用的图标名称类型
export type IconName = keyof typeof icons;

// 导出图标类型
export type IconType = LucideIcon;

// 组件属性类型
export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const IconComponent = memo(
  ({ name, className, size = 20, strokeWidth = 2.5, ...props }: IconProps) => {
    const LucideIcon = icons[name];

    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found`);

      return null;
    }

    return (
      <LucideIcon
        className={clsx('rte-icon', className)}
        size={size}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);

IconComponent.displayName = 'IconComponent';

// 保持原有的导出
export { icons };
export const Icon = IconComponent;
export default IconComponent;
