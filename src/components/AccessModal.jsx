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

const AccessModal = ({ open, onClose, onSubmit, mode = "create", initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
    permission: "",
    status: "active",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        login: initialData.login || "",
        password: "",
        permission: initialData.permission || "",
        status: initialData.status || "active",
      });
    } else {
      setFormData({
        name: "",
        login: "",
        password: "",
        permission: "",
        status: "active",
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

    const dataToSubmit = { ...formData };
    if (mode === "edit" && !formData.password) {
      delete dataToSubmit.password;
    }
    onSubmit(dataToSubmit);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {mode === "edit" ? "Editar Acesso" : "Novo Acesso"}
        </Typography>

        <TextField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder={mode === "edit" ? "Deixe em branco para manter a senha atual" : ""}
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
          <MenuItem value="active">Ativo</MenuItem>
          <MenuItem value="inactive">Inativo</MenuItem>
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

export default AccessModal;
