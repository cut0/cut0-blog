import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

/**
 * テストケースで使用する。主にキャッシュにより、テストケース間の依存を取り除くために利用する。
 */

export const SwrTestWrapper = <T extends unknown>(
  props: PropsWithChildren<T>,
) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {props.children}
    </SWRConfig>
  );
};
