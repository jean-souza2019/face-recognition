import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import DynamicTable from "../components/DynamicTable";
import useAccessGroupsData from "../hooks/useAccessGroupsData";
import AccessGroupModal from "../components/AccessGroupModal"; 

function AccessGroups() {
  const { getGroups, groups, isLoading, registerGroup, updateGroup } = useAccessGroupsData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getGroups();
  }, []);

  const headers = [
    { label: "ID", field: "id" },
    { label: "Nome", field: "name" },
    { label: "Permissão", field: "permission" },
    { label: "Status", field: "status" },
  ];
  
  const formattedGroups = groups.map((group) => ({
    id: group.id,
    name: group.name || "N/A",
    permission: group.permission || "—",
    status: group.status == 1 ? "Ativo" : "Inativo",
  }));
  
  const handleSubmit = async (formData) => {
    if (editData) {
      await updateGroup(editData.id, formData);
    } else {
      await registerGroup(formData);
    }

    await getGroups();
    setModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          <GroupIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />
          Grupos de Acesso
        </Typography>
        <Tooltip title="Novo Grupo">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
            }}
          >
            Novo Grupo
          </Button>
        </Tooltip>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <DynamicTable
          headers={headers}
          data={formattedGroups}
          actions={(row) => (
            <Tooltip title="Editar Grupo">
              <Button
                variant="contained"
                sx={{ minWidth: "40px", padding: "5px" }}
                onClick={() => {
                  const originalGroup = groups.find((g) => g.id === row.id);
                  setEditData(originalGroup);
                  setModalOpen(true);
                }}
              >
                <EditIcon fontSize="small" />
              </Button>
            </Tooltip>
          )}
        />
      )}

      <AccessGroupModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={editData ? "edit" : "create"}
        initialData={editData}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default AccessGroups;
