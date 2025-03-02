import React from "react";
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

function Search() {
    const epiRequests = [
        { id: 1, employee: "João Silva", date: "2024-02-26", status: "Aprovado" },
        { id: 2, employee: "Maria Oliveira", date: "2024-02-25", status: "Pendente" },
        { id: 3, employee: "Carlos Santos", date: "2024-02-24", status: "Rejeitado" },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Cabeçalho da Página */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    <SecurityIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />
                    Consultar Requisições de EPI
                </Typography>
            </Box>

            {/* Tabela de Requisições */}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Funcionário</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {epiRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.id}</TableCell>
                                <TableCell>{request.employee}</TableCell>
                                <TableCell>{request.date}</TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: request.status === "Aprovado" ? "green" : request.status === "Rejeitado" ? "red" : "orange",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {request.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Search;
