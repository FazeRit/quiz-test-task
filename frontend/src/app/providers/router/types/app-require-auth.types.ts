import type { JSX } from 'react';

export type AppRequireAuthProps = {
  guestOnly: undefined | boolean;
  roles?: Array<string>;
  children: JSX.Element;
};
