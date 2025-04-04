import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useUsersData = () => {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (userData) => {

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      const data = await response.json();
      setRegisteredUser(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userId, userData) => {

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      const data = await response.json();
      setRegisteredUser(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsers(data);

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registeredUser,
    registerUser,
    updateUser,
    users,
    getUsers,
    isLoading,
  };
};

export default useUsersData;
