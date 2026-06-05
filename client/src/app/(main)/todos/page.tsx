"use client";

import { useEffect, useState } from "react";
import apiClient from "@/src/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";

interface Todo {
  id: number;
  title: string;
  content: string;
}

export default function TodosPage() {
  const { loading: authLoading } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [adding, setAdding] = useState(false);

 
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchTodos = async () => {
    try {
      const { data } = await apiClient.get("/post");
      setTodos(data.data);
    } catch (err) {
      console.error("fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    fetchTodos();
  }, [authLoading]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    try {
      const { data } = await apiClient.post("/post", { title, content });
      setTodos((prev) => [data.data, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("add error", err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/post/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("delete error", err);
    }
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content ?? "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleUpdate = async (id: number) => {
    try {
      const { data } = await apiClient.patch(`/post/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setTodos((prev) => prev.map((t) => (t.id === id ? data.data : t)));
      cancelEdit();
    } catch (err) {
      console.error("update error", err);
    }
  };

  if (authLoading) return null;

  return (
    <div className="w-full max-w-xl py-10 px-4">
      <h1 className="mb-6 text-2xl font-semibold">My Todos</h1>

      {/* Form tambah */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Add Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col gap-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Content (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit" disabled={adding} className="self-end gap-1">
              <Plus size={16} />
              {adding ? "Adding..." : "Add"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-muted-foreground text-sm">No todos yet. Add one!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {todos.map((todo) =>
            editId === todo.id ? (
              // Edit mode
              <Card key={todo.id}>
                <CardContent className="flex flex-col gap-2 pt-4">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={cancelEdit}>
                      <X size={16} />
                    </Button>
                    <Button size="icon" onClick={() => handleUpdate(todo.id)}>
                      <Check size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // View mode
              <Card key={todo.id}>
                <CardContent className="flex items-start justify-between gap-4 pt-4">
                  <div>
                    <p className="font-medium">{todo.title}</p>
                    {todo.content && (
                      <p className="text-muted-foreground text-sm mt-0.5">
                        {todo.content}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEdit(todo)}
                    >
                      <Pencil size={15} />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}