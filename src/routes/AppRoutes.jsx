import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import HomePage from '../pages/Home';
import SearchPage from '../pages/Search';
import AccessPage from '../pages/Access';
import AccessGroupsPage from '../pages/AccessGroups';
import LoginPage from '../pages/Login';
import LogoutPage from '../pages/Logout';
import FaceLoginPage from '../pages/FaceLogin';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = 240;
const collapsedWidth = 80;

function AppRoutes() {
    const location = useLocation();
    const hideSidebar = location.pathname === '/login';
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: 'margin 0.3s ease-in-out',
                    marginLeft: hideSidebar ? 0 : open ? `${drawerWidth}px` : `${collapsedWidth}px`,
                    p: 3,
                }}
            >
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />

                    <Route element={<PrivateRoute allowedRoles={["common", "admin", "manager"]} />}>
                        <Route path="/" element={
                            <>
                                <Sidebar open={open} handleToggle={handleToggle} />
                                <HomePage />
                            </>
                        } />
                    </Route>


                    <Route element={<PrivateRoute allowedRoles={["admin", "manager"]} />}>
                        <Route path="/request" element={
                            <>
                                <Sidebar open={open} handleToggle={handleToggle} />
                                <FaceLoginPage />
                            </>
                        } />
                    </Route>


                    <Route element={<PrivateRoute allowedRoles={["common", "admin", "manager"]} />}>
                        <Route path="/search" element={
                            <>
                                <Sidebar open={open} handleToggle={handleToggle} />
                                <SearchPage />
                            </>
                        } />
                    </Route>


                    <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                        <Route path="/access" element={
                            <>
                                <Sidebar open={open} handleToggle={handleToggle} />
                                <AccessPage />
                            </>
                        } />
                    </Route>

                    <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                        <Route path="/groups" element={
                            <>
                                <Sidebar open={open} handleToggle={handleToggle} />
                                <AccessGroupsPage />
                            </>
                        } />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default AppRoutes;
