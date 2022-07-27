import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScrollTop from './components/ScrollTop';
import ToastMessage from './components/ToastMessage';
import { publicRoutes, dashboardRoutes, adminRoutes, errorRoutes } from './routes';

import { checkAuthLogin } from './redux/actions/auth';
import LoadingCheckLogin from './components/LoadingCheckLogin';

function App() {
    const dispatch = useDispatch();
    const isCheckLogin = useSelector((state) => state.auth.isCheckLogin);
    const token = localStorage.getItem('access_token');
    useEffect(() => {
        if (isCheckLogin && token) {
            dispatch(checkAuthLogin());
        }
    }, [dispatch]);
    if (isCheckLogin && token) {
        return <LoadingCheckLogin />;
    }
    return (
        <>
            <ScrollTop />
            <ToastMessage />
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {dashboardRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {adminRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {errorRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
