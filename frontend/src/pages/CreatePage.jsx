import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All field are required!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content
      });
      toast.success("Notes created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating notes");
      if (error.response?.status === 429) {
        toast.error("Slow down! You are creating notes to fast", {
          duration: 4000,
          icon: "(..)"
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="h-5 w-5" />
            Back To Notes
          </Link>

          <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-semibold mb-6">Create New Note</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter note title"
                  className="w-full px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows={5}
                  placeholder="Write your note here..."
                  className="w-full px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 rounded-md text-white font-medium transition ${
                  loading
                    ? "bg-zinc-700 cursor-not-allowed"
                    : "bg-zinc-600 hover:bg-zinc-700"
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
