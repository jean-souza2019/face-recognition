import React from 'react';
import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton,
    Typography, Tooltip, Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAuth } from "../context/AuthProvider";
import { useThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;
const collapsedWidth = 64;

const Sidebar = ({ open, handleToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { mode, toggleTheme } = useThemeContext();
    const theme = useTheme();

    const menuItems = [
        { type: 'item', text: 'Início', icon: <HomeIcon />, path: '/', permissions: '*' },
        { type: 'header', text: 'Recursos', permissions: '*' },
        { type: 'item', text: 'Nova Requisição', icon: <AddIcon />, path: '/request', permissions: ['admin', 'manager'] },
        { type: 'item', text: 'Consultar Requisições', icon: <SearchIcon />, path: '/search', permissions: ['common', 'admin', 'manager'] },
        { type: 'divider', permissions: ['admin', 'manager'] },
        { type: 'header', text: 'Configurações', permissions: ['admin'] },
        { type: 'item', text: 'Gerenciamento de Acessos', icon: <ManageAccountsIcon />, path: '/access', permissions: ['admin'] },
        { type: 'divider', permissions: ['admin'] },
        { type: 'item', text: 'Sair', icon: <LogoutIcon />, path: '/logout', permissions: '*' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : collapsedWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : collapsedWidth,
                    transition: 'width 0.3s ease-in-out',
                    overflowX: 'hidden',
                    bgcolor: mode === 'dark' ? '#1E1E1E' : '#F4F4F4',
                    color: theme.palette.text.primary,
                    paddingX: open ? 1 : 0,
                    borderRight: `1px solid ${mode === 'dark' ? '#333' : '#DDD'}`
                },
            }}
        >
            {/* Cabeçalho do Sidebar */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    padding: open ? '12px 16px' : '8px',
                    bgcolor: theme.palette.background.paper,
                }}
            >
                {open && (
                    <Typography variant="h6" sx={{ fontSize: '15px' }}>
                        REQUISIÇÕES EPI
                    </Typography>
                )}
                <IconButton sx={{ p: open ? '6px' : '4px' }} onClick={handleToggle}>
                    <motion.div animate={{ rotate: open ? 0 : 180 }} transition={{ duration: 0.3 }}>
                        <ChevronLeftIcon />
                    </motion.div>
                </IconButton>
            </Box>
            <Divider />

            {/* Lista de Itens do Menu */}
            <List sx={{ padding: open ? '8px' : '4px', flexGrow: 1 }}>
                {menuItems.map((item, index) => {
                    if (item.permissions !== '*' && !item.permissions?.includes(user.role)) return null;

                    if (item.type === 'header') {
                        return open ? (
                            <Typography
                                key={index}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize: 12,
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {item.text}
                            </Typography>
                        ) : null;
                    }

                    if (item.type === 'divider') {
                        return <Divider key={index} sx={{ my: 1 }} />;
                    }

                    return (
                        <Tooltip key={index} title={!open ? item.text : ''} placement="right">
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    justifyContent: open ? 'flex-start' : 'center',
                                    bgcolor: location.pathname === item.path
                                        ? (mode === 'dark' ? '#444' : '#DDD')
                                        : 'transparent',
                                    '&:hover': { bgcolor: mode === 'dark' ? '#555' : '#EEE' },
                                    borderRadius: '6px',
                                    mx: open ? 1 : 0.5,
                                    my: 0.5,
                                    minHeight: open ? 48 : 40,
                                    px: open ? 2 : 1
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: open ? 40 : 30, color: theme.palette.text.primary }}>
                                    {item.icon}
                                </ListItemIcon>
                                {open && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Tooltip>
                    );
                })}
            </List>

            {/* Botão de alternância de tema fixado no rodapé */}
            <Box sx={{ position: 'absolute', bottom: 10, width: '100%', textAlign: 'center' }}>
                <Tooltip title="Alternar tema">
                    <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
                        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
