import * as React from 'react';
import type { JSX } from 'react';
import { memo } from 'react';
import { renderRoute } from '../../helpers';
import { routeConfig } from '../../config/route.config';
import { Routes } from 'react-router-dom';

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      {Object.values(routeConfig).map((route, index) => {
        return renderRoute(route);
      })}
    </Routes>
  );
};

export default memo(AppRouter);
