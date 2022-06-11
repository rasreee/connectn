import type { FunctionComponent, ReactNode } from 'react';

declare module 'react' {
  declare namespace React {
    type FC<P = {}> = FunctionComponent<
      P & { children?: ReactNode | ReactNode[] }
    >;
  }

  export = React;

  export as namespace React;
}
