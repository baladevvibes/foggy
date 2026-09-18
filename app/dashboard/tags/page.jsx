
"use client";

import { useEffect, useState } from "react";

export default function TagsPage() {
  const [tags, setTags] = useState([]);

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // =========================
  // GET TAGS
  // =========================
  const fetchTags = async () => {
    try {
      setFetching(true);

      const res = await fetch("/api/tags", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setTags(data.tags);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // =========================
  // CREATE / UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a tag");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `/api/tags/${editingId}`
        : "/api/tags";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert(data.message);

      setName("");
      setEditingId(null);

      fetchTags();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (tag) => {
    setEditingId(tag._id);
    setName(tag.name);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this tag?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/tags/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert(data.message);

      fetchTags();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  // =========================
  // SEARCH
  // =========================
  const filteredTags = tags.filter((tag) => {
    const value = search.toLowerCase();

    return (
      tag.name.toLowerCase().includes(value) ||
      tag.hashtag.toLowerCase().includes(value) ||
      tag.slug.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#5F6C37]">
          Tags
        </h1>

        <p className="mt-2 text-gray-600">
          Manage hashtags for your Gallery and Videos.
        </p>
      </div>

      {/* CREATE / EDIT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          {editingId ? "Edit Tag" : "Add New Tag"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >

          <div className="flex-1">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tag e.g. Ooty or #Ooty"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5F6C37]"
            />

            {name && (
              <p className="text-sm text-gray-500 mt-2">
                Preview: #
                {name.replace(/^#+/, "").replace(/\s+/g, "")}
              </p>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-[#5F6C37] text-white font-semibold hover:bg-[#4d582d] transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Tag"
              : "Add Tag"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-7 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

        </form>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tags..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5F6C37]"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            All Tags
            <span className="ml-2 text-sm text-gray-500">
              ({filteredTags.length})
            </span>
          </h2>
        </div>

        {fetching ? (
          <div className="p-10 text-center text-gray-500">
            Loading tags...
          </div>
        ) : filteredTags.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No tags found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    #
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Tag
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Slug
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Created
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredTags.map((tag, index) => (
                  <tr
                    key={tag._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">

                      <span className="inline-flex px-4 py-2 rounded-full bg-[#D9A25C]/10 text-[#5F6C37] font-semibold">
                        {tag.hashtag}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {tag.slug}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(
                        tag.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => handleEdit(tag)}
                          className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(tag._id)
                          }
                          className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

