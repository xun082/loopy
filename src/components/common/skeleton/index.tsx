import { cn } from '@/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义宽度
   */
  width?: number | string;
  /**
   * 自定义高度
   */
  height?: number | string;
  /**
   * 骨架屏变体
   */
  variant?: 'rectangular' | 'circular' | 'text';
  /**
   * 是否显示动画
   * @default true
   */
  animation?: boolean;
  /**
   * 动画持续时间(ms)
   * @default 1500
   */
  animationDuration?: number;
  /**
   * 自定义动画效果
   */
  animationEffect?: 'pulse' | 'wave' | 'none';
  /**
   * 是否启用 CSS will-change 优化
   * @default true
   */
  enableOptimization?: boolean;
  /**
   * 自定义背景色
   * @default 'bg-muted'
   */
  backgroundColor?: string;
}

function Skeleton({
  className,
  width,
  height,
  variant = 'rectangular',
  animation = true,
  animationDuration = 1500,
  animationEffect = 'pulse',
  enableOptimization = true,
  backgroundColor = 'bg-muted',
  ...props
}: SkeletonProps) {
  const baseStyles = {
    width,
    height,
    ...(animation && {
      animationDuration: `${animationDuration}ms`,
      willChange: enableOptimization ? 'opacity, transform' : 'auto',
    }),
    ...props.style,
  };

  return (
    <div
      className={cn(
        // 基础样式
        backgroundColor,
        // 性能优化
        'will-change-[opacity,transform]',
        'backface-visibility-hidden',
        'transform-gpu',
        // 动画效果
        {
          'animate-pulse': animation && animationEffect === 'pulse',
          'animate-wave': animation && animationEffect === 'wave',
          // 变体样式
          'rounded-md': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'rounded h-4': variant === 'text',
        },
        className,
      )}
      style={baseStyles}
      {...props}
    />
  );
}

export default Skeleton;
export type { SkeletonProps };
