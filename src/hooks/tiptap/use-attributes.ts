import { Editor } from '@tiptap/core';
import { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash-es/isEqual';

type MapFn<T, R> = (arg: T) => R;

function mapSelf<T>(d: T): T {
  return d;
}

export function useAttributes<T, R>(
  editor: Editor,
  attribute: string,
  defaultValue: T,
  map?: MapFn<T, R>,
) {
  const mapFn = (map || mapSelf) as MapFn<T, R>;
  const [value, setValue] = useState<R>(mapFn(defaultValue));
  const prevValueCache = useRef<R>(value);

  useEffect(() => {
    const listener = () => {
      const attrs = { ...defaultValue, ...editor.getAttributes(attribute) };
      const nextAttrs = mapFn(attrs);

      if (isEqual(prevValueCache.current, nextAttrs)) {
        return;
      }

      setValue(nextAttrs);
      prevValueCache.current = nextAttrs;
    };

    editor.on('transaction', listener);

    return () => {
      editor.off('transaction', listener);
    };
  }, [editor, defaultValue, attribute, mapFn]);

  return value;
}
