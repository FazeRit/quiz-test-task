import { AppRequireAuth } from '../components/app-require-auth/app-require-auth.component';
import type { ComponentType, JSX, ReactNode } from 'react';
import { PageLoader } from '../../../../shared/components';
import type { RenderRouteFn } from '../types/app-router-component.types';
import { Route } from 'react-router-dom';
import { Suspense } from 'react';

const resolveFlag = (explicit?: boolean, parent = false): boolean => {
  return explicit ?? parent;
};

function wrapElement(
  element: ReactNode,
  roles: string[] | undefined,
  guestOnly: boolean,
  authOnly: boolean,
  Layout?: ComponentType<{ children: ReactNode }>
): JSX.Element {
  let wrapped = <Suspense fallback={<PageLoader />}>{element}</Suspense>;

  if (authOnly || guestOnly) {
    wrapped = (
      <AppRequireAuth roles={roles} guestOnly={guestOnly}>
        {wrapped}
      </AppRequireAuth>
    );
  }

  if (Layout) {
    wrapped = <Layout>{wrapped}</Layout>;
  }

  return wrapped;
}

export const renderRoute: RenderRouteFn = (
  route,
  parentAuthOnly = false,
  parentGuestOnly = false,
  keyPrefix = ''
): JSX.Element => {
  const { path, roles, element, children, authOnly: explicitAuth, guestOnly: explicitGuest, layout: Layout } = route;

  if (!element) {
    throw new Error(`[App Router]: route "${path}" has no element. Set element in route config!`);
  }

  const routeKey = keyPrefix ? `${keyPrefix}-${path}` : path;

  const authOnly = resolveFlag(explicitAuth, parentAuthOnly);
  const guestOnly = resolveFlag(explicitGuest, parentGuestOnly);

  const elementWrapper = wrapElement(element, roles, guestOnly, authOnly, Layout);

  return (
    <Route path={path} key={routeKey} element={elementWrapper}>
      {children?.map((route, index) => {
        return renderRoute(route, authOnly, guestOnly, `${routeKey}-${index}`);
      })}
    </Route>
  );
};
