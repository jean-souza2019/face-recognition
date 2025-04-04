import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AccessGroupModal = ({ open, onClose, onSubmit, mode = "create", initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    permission: "",
    status: "1", // string para funcionar no Select
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        permission: initialData.permission || "",
        status: String(initialData.status ?? "1"),
      });
    } else {
      setFormData({
        name: "",
        permission: "",
        status: "1",
      });
    }
  }, [initialData, mode, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      status: parseInt(formData.status),
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {mode === "edit" ? "Editar Grupo" : "Novo Grupo"}
        </Typography>

        <TextField
          label="Nome do Grupo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Permissão"
          name="permission"
          value={formData.permission}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Status"
          name="status"
          select
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="1">Ativo</MenuItem>
          <MenuItem value="0">Inativo</MenuItem>
        </TextField>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={1}>
          <Button variant="outlined" onClick={onClose} startIcon={<CloseIcon />}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AccessGroupModal;
