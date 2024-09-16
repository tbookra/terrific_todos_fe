"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getTodos,
  deleteTodo,
  updateStatusTodo,
} from "../util/fetchFunctions/db";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";


type Todo = {
  _id: string;
  todo: string;
  done: boolean;
};

const TodosList = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["todosList"],
    queryFn: getTodos,
  });


  const [todosList, setTodosList] = useState<Todo[]>(data);

  useEffect(() => {
    setTodosList(data);
  }, [data]);
  const handleDoneChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setTodosList((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, done: e.target.checked } : todo
      )
    );
    const { success } = await updateStatusTodo(`${id}`, e.target.checked);
    if (!success) {
      setTodosList(data);
    }
  };

  const handleDelete = async (id: string) => {
    setTodosList((prev) => prev.filter((item) => item._id !== id));
    const { success } = await deleteTodo(id);
    if (!success) {
      setTodosList(data);
    }
  };
  
  if (isFetching) return <div>Loading...</div>;
  return (
    <div className="w-[300px] mt-8">
      {todosList?.map((todo: Todo) => (
        <div
          key={todo._id}
          className="w-full flex items-center justify-between gap-2"
        >
          <Checkbox
            inputProps={{ "aria-label": "Todo" }}
            color="success"
            sx={{ width: "10px" }}
            checked={todo.done}
            onChange={(e) => handleDoneChange(e, todo._id)}
          />
          <p className="flex-1 justify-self-start">{todo.todo}</p>
          <div
            className="cursor-pointer"
            onClick={() => handleDelete(todo._id)}
          >
            <DeleteIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
