
"use client";

import { useEffect, useState } from "react";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);

  const [title, setTitle] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [editId, setEditId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // =================================
  // GET VIDEOS
  // =================================

  const getVideos = async () => {
    try {
      setError("");

      const response =
        await fetch(
          "/api/videos",
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load videos"
        );
      }

      setVideos(
        data.videos || []
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load videos"
      );
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  // =================================
  // FILE SELECT
  // =================================

  const handleFileChange = (
    event
  ) => {
    const selectedFile =
      event.target.files[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(
        selectedFile
      )
    );
  };

  // =================================
  // UPLOAD
  // =================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim()) {
      setError(
        "Please enter video title"
      );
      return;
    }

    if (!editId && !file) {
      setError(
        "Please select a video"
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      if (file) {
        formData.append(
          "file",
          file
        );
      }

      const url = editId
        ? `/api/videos/${editId}`
        : "/api/videos/upload";

      const method = editId
        ? "PUT"
        : "POST";

      const response =
        await fetch(url, {
          method,
          body: formData,
        });

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Operation failed"
        );
        return;
      }

      setMessage(
        editId
          ? "Video updated successfully"
          : "Video uploaded successfully"
      );

      resetForm();

      getVideos();
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // EDIT
  // =================================

  const handleEdit = (
    video
  ) => {
    setEditId(video._id);

    setTitle(video.title);

    setFile(null);

    setPreview(video.filepath);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =================================
  // DELETE
  // =================================

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this video?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/videos/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Delete failed"
        );
        return;
      }

      setMessage(
        "Video deleted successfully"
      );

      getVideos();
    } catch (error) {
      console.error(error);

      setError(
        "Delete failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // RESET
  // =================================

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setPreview(null);
    setEditId(null);

    const input =
      document.getElementById(
        "videoFile"
      );

    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="space-y-6">

      {/* ==========================
          HEADER
      ========================== */}

      <div>
        <h1 className="text-3xl font-bold">
          Videos
        </h1>

        <p className="text-gray-500 mt-1">
          Upload and manage your videos
        </p>
      </div>

      {/* ==========================
          UPLOAD FORM
      ========================== */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">

          {editId
            ? "Edit Video"
            : "Upload Video"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}

          <div>

            <label className="block font-medium mb-2">
              Video Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Enter video title"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-[#5F6C37]
              "
            />

          </div>

          {/* VIDEO */}

          <div>

            <label className="block font-medium mb-2">

              {editId
                ? "Replace Video (Optional)"
                : "Select Video"}

            </label>

            <input
              id="videoFile"
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              onChange={
                handleFileChange
              }
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            />

            <p className="text-sm text-gray-500 mt-2">
              MP4, WEBM, OGG or MOV.
              Maximum 100 MB.
            </p>

          </div>

          {/* PREVIEW */}

          {preview && (
            <div>

              <p className="font-medium mb-2">
                Video Preview
              </p>

              <video
                src={preview}
                controls
                className="
                  w-full
                  max-w-xl
                  rounded-xl
                  border
                "
              />

            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          {/* BUTTON */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="
                bg-[#5F6C37]
                hover:bg-[#4d582d]
                disabled:bg-gray-400
                text-white
                px-6
                py-3
                rounded-lg
                font-semibold
              "
            >

              {loading
                ? "Processing..."
                : editId
                ? "Update Video"
                : "Upload Video"}

            </button>

            {editId && (
              <button
                type="button"
                onClick={
                  resetForm
                }
                className="
                  bg-gray-500
                  text-white
                  px-6
                  py-3
                  rounded-lg
                "
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* ==========================
          VIDEO TABLE
      ========================== */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold">
            Video List
          </h2>

          <p className="text-gray-500 mt-1">
            Total Videos:{" "}
            {videos.length}
          </p>

        </div>

        {videos.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No videos uploaded yet.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left px-6 py-4">
                    #
                  </th>

                  <th className="text-left px-6 py-4">
                    Video
                  </th>

                  <th className="text-left px-6 py-4">
                    Title
                  </th>

                  <th className="text-left px-6 py-4">
                    Type
                  </th>

                  <th className="text-left px-6 py-4">
                    Size
                  </th>

                  <th className="text-left px-6 py-4">
                    Date
                  </th>

                  <th className="text-left px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {videos.map(
                  (video, index) => (

                    <tr
                      key={
                        video._id
                      }
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      {/* NUMBER */}

                      <td className="px-6 py-4">
                        {index + 1}
                      </td>

                      {/* VIDEO */}

                      <td className="px-6 py-4">

                        <video
                          src={
                            video.filepath
                          }
                          controls
                          className="
                            w-40
                            h-24
                            object-cover
                            rounded-lg
                            bg-black
                          "
                        />

                      </td>

                      {/* TITLE */}

                      <td className="px-6 py-4 font-medium">
                        {video.title}
                      </td>

                      {/* TYPE */}

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {video.mimetype}
                      </td>

                      {/* SIZE */}

                      <td className="px-6 py-4 text-sm">

                        {(
                          video.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-4 text-sm">

                        {new Date(
                          video.createdAt
                        ).toLocaleDateString()}

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleEdit(
                                video
                              )
                            }
                            className="
                              bg-yellow-500
                              hover:bg-yellow-600
                              text-white
                              px-4
                              py-2
                              rounded-lg
                            "
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                video._id
                              )
                            }
                            className="
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              px-4
                              py-2
                              rounded-lg
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}
