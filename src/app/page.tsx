"use client";
import { useState } from "react";
import { addTodo } from "./util/fetchFunctions/db";
import TodosList from "./components/TodosList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [addTotoStr, setAddTotoStr] = useState<string>("");
  const queryClient = useQueryClient();
  const handleAddTodo = async () => {
    const res = await addTodo(addTotoStr);
    setAddTotoStr("");
  };

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: handleAddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todosList"]);
    },
  });

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>My Todo List</h1>
      <div className="flex gap-2">
        <TextField
          id="standard-basic"
          label="Add Todo"
          variant="standard"
          sx={{ width: "250px" }}
          onChange={(e) => setAddTotoStr(e.target.value)}
          value={addTotoStr}
        />
        <Button
          variant="contained"
          sx={{ maxWidth: "110px", height: "35px", alignSelf: "flex-end" }}
          onClick={addTodoMutation}
        >
          Add Todo
        </Button>
      </div>
      <TodosList />
    </div>
  );
}
