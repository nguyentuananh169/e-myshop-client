//Layout

//pages
import Error404 from '../pages/Errors/Error404';
import Error403 from '../pages/Errors/Error403';
const errorRoutes = [
    { path: '/error403', component: Error403, layout: null },
    { path: '*', component: Error404, layout: null },
];
export default errorRoutes;
