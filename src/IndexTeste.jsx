import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import navigation from './Navigation';

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true }
});

function Index(props) {
    const { window } = props;
    const router = useDemoRouter('/home');
    const demoWindow = window !== undefined ? window() : undefined;

    const currentContent = navigation.find(n => n.segment === router.pathname.slice(1))?.content;

    return (
        <AppProvider
            navigation={navigation}
            branding={{
                logo: '',
                title: 'FACE RECOGNITION',
            }}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout defaultSidebarCollapsed={true}>
                {currentContent}
            </DashboardLayout>
        </AppProvider>
    );
}

export default Index;
