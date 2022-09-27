import { FC, PropsWithChildren } from "react";
import { SWRConfig } from "swr";

/**
 * swr を利用している hook の test 用 wrapper
 * https://swr.vercel.app/docs/advanced/cache#reset-cache-between-test-cases
 *
 * アプリケーションからは使わないこと
 */
export const SwrTestWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
};
