import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function DemoPageContent({ title }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h5">{title}</Typography>
            <Typography>Dashboard content for {title}</Typography>
        </Box>
    );
}

function DemoPageContent2({ title }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h5">{title}</Typography>
            <Typography>testando {title}</Typography>
        </Box>
    );
}


export default [
    {
        kind: 'header',
        title: 'Recursos',
    },
    {
        segment: 'home',
        title: 'Nova Requisição',
        icon: <AddIcon />,
        content: <DemoPageContent title="Nova Requisição" />,
    },
    {
        segment: 'search',
        title: 'Consultar Requisições',
        icon: <SearchIcon />,
        content: <DemoPageContent2 title="Consultar Requisições" />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Configurações',
    },
    {
        segment: 'access',
        title: 'Gerenciamento de Acessos',
        icon: <ManageAccountsIcon />,
        content: <DemoPageContent title="Gerenciamento de Acessos" />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'exit',
        title: 'Sair',
        icon: <LogoutIcon />,
    },
];
