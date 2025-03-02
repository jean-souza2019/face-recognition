import React from "react";
import { Container, Typography, Button, Box, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DynamicTable from "../components/DynamicTable";
import EditIcon from "@mui/icons-material/Edit";

function Access() {


    const headers = [
        { label: "ID", field: "id" },
        { label: "Funcionário", field: "employee" },
        { label: "Permissão", field: "permission" },
        { label: "Status", field: "status" },
    ];

    const data = [
        { id: 1, employee: "João Silva", permission: "Admin", status: "Ativo" },
        { id: 2, employee: "Maria Oliveira", permission: "User", status: "Inativo" },
        { id: 3, employee: "Carlos Santos", permission: "Manager", status: "Ativo" },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    <ManageAccountsIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />
                    Controle de Acessos
                </Typography>
                <Tooltip title="Novo Acesso">
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    Novo Acesso
                </Button>
                </Tooltip>
            </Box>

            <DynamicTable
                headers={headers}
                data={data}
                actions={(row) => (
                    <Tooltip title="Editar Registro">
                        <Button
                            variant="contained"
                            sx={{ minWidth: "40px", padding: "5px" }}

                        >
                            <EditIcon fontSize="small" />
                        </Button>
                    </Tooltip>
                )}
            />

        </Container>
    );
};

export default Access;
