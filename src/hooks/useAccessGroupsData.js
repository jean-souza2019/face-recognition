import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useAccessGroupsData = () => {
  const [registeredGroup, setRegisteredGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const registerGroup = async (groupData) => {
    try {
      const response = await fetch(`${API_URL}/group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar grupo");
      }

      const data = await response.json();
      setRegisteredGroup(data);
      return data;
    } catch (error) {
      console.error("❌ Erro ao registrar grupo:", error);
    }
  };

  const updateGroup = async (groupId, groupData) => {
    try {
      const response = await fetch(`${API_URL}/groups/${groupId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar grupo");
      }

      const data = await response.json();
      setRegisteredGroup(data);
      return data;
    } catch (error) {
      console.error("❌ Erro ao atualizar grupo:", error);
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      const response = await fetch(`${API_URL}/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar grupo");
      }

      return true;
    } catch (error) {
      console.error("❌ Erro ao deletar grupo:", error);
      return false;
    }
  };

  const getGroups = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/groups`);

      if (!response.ok) {
        throw new Error("Erro ao buscar grupos");
      }

      const data = await response.json();
      setGroups(data);
      return data;
    } catch (error) {
      console.error("❌ Erro ao buscar grupos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registeredGroup,
    registerGroup,
    updateGroup,
    deleteGroup,
    groups,
    getGroups,
    isLoading,
  };
};

export default useAccessGroupsData;
