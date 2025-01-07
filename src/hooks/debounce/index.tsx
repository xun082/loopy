import { useCallback, useEffect, useRef, useState } from 'react';

interface DebounceOptions {
  // 延迟时间(ms)
  delay?: number;
  // 是否在首次调用时立即执行
  immediate?: boolean;
  // 最大等待时间(ms)，超过这个时间强制执行
  maxWait?: number;
}

/**
 * 创建一个防抖函数的 Hook
 * @param fn 需要防抖的函数
 * @param options 防抖配置选项
 * @returns 防抖处理后的函数
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  options: DebounceOptions = {},
): T {
  const { delay = 300, immediate = false, maxWait } = options;

  // 使用 useRef 存储函数和定时器，避免重复创建
  const fnRef = useRef(fn);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastInvokeTimeRef = useRef<number>(0);

  // 更新最新的函数引用
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // 清理函数
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 组件卸载时清理
  useEffect(() => cleanup, [cleanup]);

  // 实际执行函数
  const invoke = useCallback((time: number, args: Parameters<T>) => {
    lastInvokeTimeRef.current = time;

    return fnRef.current(...args);
  }, []);

  // 防抖主函数
  const debounced = useCallback(
    (...args: Parameters<T>) => {
      const time = Date.now();
      lastCallTimeRef.current = time;

      // 清除现有定时器
      cleanup();

      // 如果是第一次调用且需要立即执行
      if (immediate && lastInvokeTimeRef.current === 0) {
        lastInvokeTimeRef.current = time;

        return invoke(time, args);
      }

      // 创建新的定时器
      timerRef.current = setTimeout(() => {
        invoke(time, args);
      }, delay);

      // 如果设置了最大等待时间，检查是否需要强制执行
      if (maxWait !== undefined && time - lastInvokeTimeRef.current >= maxWait) {
        cleanup();
        invoke(time, args);
      }
    },
    [delay, immediate, maxWait, cleanup, invoke],
  ) as T;

  // 添加取消方法
  const cancel = useCallback(() => {
    cleanup();
    lastInvokeTimeRef.current = 0;
    lastCallTimeRef.current = 0;
  }, [cleanup]);

  // 添加立即执行方法
  const flush = useCallback(
    (...args: Parameters<T>) => {
      cleanup();

      return invoke(Date.now(), args);
    },
    [cleanup, invoke],
  );

  // 将取消和立即执行方法附加到防抖函数上
  (debounced as any).cancel = cancel;
  (debounced as any).flush = flush;

  return debounced;
}

/**
 * 创建一个防抖值的 Hook
 * @param value 需要防抖的值
 * @param delay 延迟时间
 * @returns 防抖后的值
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
