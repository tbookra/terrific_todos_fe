import axios from "axios";
const BASE_URL = "http://localhost:3001/todos";

export const getTodos = async () => {
  const todos = await axios.get(BASE_URL);
  
  return todos?.data;
};

export const addTodo = async (todo: string) => {
  try {
    await axios.post(BASE_URL, { todo });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const updateStatusTodo = async (id: string, status: boolean) => {
  try {
    await axios.patch(`${BASE_URL}/${id}`, { done: status });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
