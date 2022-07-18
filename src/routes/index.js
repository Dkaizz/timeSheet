import Homepage from '~/pages/Home';

import config from '~/config';
import Login from '~/pages/Login';
import Report from '~/pages/Report/Report';
//publicRoutes
const publicRoutes = [
  {
    path: config.routes.home,
    component: Homepage,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.report,
    component: Report,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
