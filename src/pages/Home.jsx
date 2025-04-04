import React from "react";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const stats = {
    aprovadas: 12,
    ultimasRequisicoes: [
      { id: 1, nome: "Capacete", status: "Aprovado", data: "2024-04-02" },
      { id: 2, nome: "Luva térmica", status: "Pendente", data: "2024-04-01" },
      { id: 3, nome: "Óculos de proteção", status: "Rejeitado", data: "2024-03-30" },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bem-vindo ao Sistema de Requisição de EPI
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Aqui você pode visualizar o status do sistema e tomar ações rápidas.
      </Typography>
      
      <Grid2 container spacing={3} mt={2}>
        <Grid2 item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="h6">Requisições Realizadas</Typography>
              </Box>
              <Typography variant="h4" mt={1}>{stats.aprovadas}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>


      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Ações rápidas
        </Typography>
        <Stack direction="row" spacing={2} mt={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/request")}
          >
            Nova Requisição
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AssignmentIcon />}
            onClick={() => navigate("/search")}
          >
            Consultar Requisições
          </Button>
        </Stack>
      </Box>

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Últimas Requisições
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Box>
          {stats.ultimasRequisicoes.map((req) => (
            <Grid2 container key={req.id} py={1}>
              <Grid2 item xs={12} sm={5}>
                <Typography>{req.nome}</Typography>
              </Grid2>
              <Grid2 item xs={12} sm={4}>
                <Typography color="text.secondary">{req.status}</Typography>
              </Grid2>
              <Grid2 item xs={12} sm={3}>
                <Typography color="text.secondary">{req.data}</Typography>
              </Grid2>
            </Grid2>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
