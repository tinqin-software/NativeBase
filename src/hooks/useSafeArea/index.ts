import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSortedProps, calculatePaddingProps } from './utils';
import { useTheme } from './../useTheme';
import stableHash from 'stable-hash';

import { useMemo } from 'react';
import { isEmptyObj } from '../../utils';

export function useSafeArea(props: any) {
  const { safeAreaProps, paddingProps, sansPaddingProps } = useSortedProps(
    props
  );

  const insets = useSafeAreaInsets();
  const sizes = useTheme().sizes;

  const result = useMemo(() => {
    if (isEmptyObj(safeAreaProps)) {
      return props;
    }

    let calcualtedPaddingProps = calculatePaddingProps(
      safeAreaProps,
      paddingProps,
      insets,
      sizes
    );

    return { ...sansPaddingProps, ...paddingProps, ...calcualtedPaddingProps };
  }, [
    stableHash(safeAreaProps),
    stableHash(paddingProps),
    stableHash(sansPaddingProps),
  ]);

  // const { style, dataSet } = React.useMemo(() => {});

  return result;
}
