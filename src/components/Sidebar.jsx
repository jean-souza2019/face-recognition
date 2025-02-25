import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Typography, Tooltip, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;
const collapsedWidth = 64;

const Sidebar = ({ open, handleToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Recursos', type: 'header' },
        { text: 'Nova Requisição', icon: <AddIcon />, path: '/home' },
        { text: 'Consultar Requisições', icon: <SearchIcon />, path: '/search' },
        { type: 'divider' },
        { text: 'Configurações', type: 'header' },
        { text: 'Gerenciamento de Acessos', icon: <ManageAccountsIcon />, path: '/access' },
        { type: 'divider' },
        { text: 'Sair', icon: <LogoutIcon />, path: '/logout' },
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
                    backgroundColor: '#121212',
                    color: '#fff',
                    borderRight: '1px solid #333',
                    paddingX: open ? 1 : 0
                },
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    padding: open ? '12px 16px' : '8px',
                    backgroundColor: '#1a1a1a',
                }}
            >
                {open && (
                    <Typography variant="h6" sx={{ color: 'white', fontSize: '15px' }}>
                        REQUISIÇÕES EPI
                    </Typography>
                )}
                <IconButton sx={{ color: 'white', p: open ? '6px' : '4px' }} onClick={handleToggle}>
                    <motion.div animate={{ rotate: open ? 0 : 180 }} transition={{ duration: 0.3 }}>
                        <ChevronLeftIcon /> 
                    </motion.div>
                </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: '#333' }} />

            <List sx={{ padding: open ? '8px' : '4px' }}>
                {menuItems.map((item, index) => {
                    if (item.type === 'header') {
                        return open ? (
                            <Typography
                                key={index}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize: 12,
                                    color: '#aaa',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {item.text}
                            </Typography>
                        ) : null;
                    }

                    if (item.type === 'divider') {
                        return <Divider key={index} sx={{ my: 1, backgroundColor: '#333' }} />;
                    }

                    return (
                        <Tooltip key={index} title={!open ? item.text : ''} placement="right">
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    justifyContent: open ? 'flex-start' : 'center',
                                    backgroundColor: location.pathname === item.path ? '#333' : 'transparent',
                                    '&:hover': { backgroundColor: '#222' },
                                    borderRadius: '6px',
                                    mx: open ? 1 : 0.5,
                                    my: 0.5,
                                    minHeight: open ? 48 : 40,
                                    px: open ? 2 : 1
                                }}
                            >
                                <ListItemIcon sx={{ color: location.pathname === item.path ? '#00bcd4' : 'white', minWidth: open ? 40 : 30 }}>
                                    {item.icon}
                                </ListItemIcon>
                                {open && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Tooltip>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default Sidebar;
