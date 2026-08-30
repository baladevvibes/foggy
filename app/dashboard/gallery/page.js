"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ============================
  // GET IMAGES
  // ============================

  const getImages = async () => {
    try {
      const response = await fetch(
        "/api/gallery"
      );

      const data = await response.json();

      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load gallery"
      );
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  // ============================
  // SELECT FILE
  // ============================

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(selectedFile)
    );
  };

  // ============================
  // UPLOAD
  // ============================

  const handleUpload = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim()) {
      setError(
        "Please enter image title"
      );
      return;
    }

    if (!file) {
      setError(
        "Please select an image"
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "file",
        file
      );

      const response = await fetch(
        "/api/gallery/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Upload failed"
        );
        return;
      }

      setMessage(
        "Image uploaded successfully"
      );

      resetForm();

      getImages();
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // EDIT BUTTON
  // ============================

  const handleEdit = (image) => {
    setEditId(image._id);

    setTitle(image.title);

    setFile(null);

    setPreview(image.filepath);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================
  // UPDATE
  // ============================

  const handleUpdate = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim()) {
      setError(
        "Please enter image title"
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        title
      );

      // File is optional during update
      if (file) {
        formData.append(
          "file",
          file
        );
      }

      const response = await fetch(
        `/api/gallery/${editId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Update failed"
        );
        return;
      }

      setMessage(
        "Image updated successfully"
      );

      resetForm();

      getImages();
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // DELETE
  // ============================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this image?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/gallery/${id}`,
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
        "Image deleted successfully"
      );

      getImages();
    } catch (error) {
      console.error(error);

      setError(
        "Delete failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // RESET
  // ============================

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setPreview(null);
    setEditId(null);

    const input =
      document.getElementById(
        "galleryFile"
      );

    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">
          Gallery
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your gallery images
        </p>
      </div>

      {/* FORM */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">

          {editId
            ? "Edit Image"
            : "Upload Image"}

        </h2>

        <form
          onSubmit={
            editId
              ? handleUpdate
              : handleUpload
          }
          className="space-y-5"
        >

          {/* TITLE */}

          <div>

            <label className="block font-medium mb-2">
              Image Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Enter image title"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "
            />

          </div>

          {/* FILE */}

          <div>

            <label className="block font-medium mb-2">

              {editId
                ? "Replace Image (Optional)"
                : "Select Image"}

            </label>

            <input
              id="galleryFile"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
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
              JPG, PNG, WEBP or GIF. Maximum 5 MB.
            </p>

          </div>

          {/* PREVIEW */}

          {preview && (
            <div>

              <p className="font-medium mb-2">
                Preview
              </p>

              <img
                src={preview}
                alt="Preview"
                className="
                  w-48
                  h-48
                  object-cover
                  rounded-lg
                  border
                "
              />

            </div>
          )}

          {/* MESSAGE */}

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-400
                text-white
                px-6
                py-3
                rounded-lg
                font-medium
              "
            >

              {loading
                ? "Processing..."
                : editId
                ? "Update Image"
                : "Upload Image"}

            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="
                  bg-gray-500
                  hover:bg-gray-600
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

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold">
            Gallery List
          </h2>

          <p className="text-gray-500">
            Total Images: {images.length}
          </p>

        </div>

        {images.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No images found
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
                    Image
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

                {images.map(
                  (image, index) => (

                    <tr
                      key={image._id}
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      {/* NUMBER */}

                      <td className="px-6 py-4">
                        {index + 1}
                      </td>

                      {/* IMAGE */}

                      <td className="px-6 py-4">

                        <img
                          src={
                            image.filepath
                          }
                          alt={
                            image.title
                          }
                          className="
                            w-20
                            h-20
                            rounded-lg
                            object-cover
                            border
                          "
                        />

                      </td>

                      {/* TITLE */}

                      <td className="px-6 py-4 font-medium">
                        {image.title}
                      </td>

                      {/* TYPE */}

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {image.mimetype}
                      </td>

                      {/* SIZE */}

                      <td className="px-6 py-4 text-sm">

                        {(
                          image.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-4 text-sm">

                        {new Date(
                          image.createdAt
                        ).toLocaleDateString()}

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleEdit(
                                image
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
                                image._id
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