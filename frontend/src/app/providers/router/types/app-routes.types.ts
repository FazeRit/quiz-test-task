import type { AppRoutes } from '../enum/app-router.enum';
import type { ComponentType, ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouterKeys } from '../../../../shared/constants/router-keys.const';

export type RouterPath = (typeof RouterKeys)[keyof typeof RouterKeys];

export type AppRouteProps = {
  layout?: ComponentType<{ children: ReactNode }>;
  children?: Array<AppRouteProps>;
  roles?: Array<string>;
  guestOnly?: boolean;
  authOnly?: boolean;
  path: RouterPath;
} & RouteObject;

export type RouteConfig = Record<AppRoutes, AppRouteProps>;
export type PartialRouteConfig = Partial<RouteConfig>;
