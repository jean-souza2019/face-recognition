import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Search from './pages/Search';
import Access from './pages/Access';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Sidebar from './components/Sidebar';
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
            {!hideSidebar && <Sidebar open={open} handleToggle={handleToggle} />}
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <ProtectedRoute>
                                <Search />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/access"
                        element={
                            <ProtectedRoute>
                                <Access />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default AppRoutes;
