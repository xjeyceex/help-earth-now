"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ContentItem {
  id: number;
  title: string;
  isActive: boolean;
  type: string;
}

const ITEMS_PER_PAGE = 5;

export default function ContentManagement() {
  const { status } = useSession();
  const router = useRouter();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentType, setNewContentType] = useState("article");
  const [filterType, setFilterType] = useState("all");

  // Example content for now
  useEffect(() => {
    setContentItems([
      { id: 1, title: "First Article", isActive: true, type: "article" },
      { id: 2, title: "Second Video", isActive: true, type: "video" },
      { id: 3, title: "Third Article", isActive: true, type: "article" },
      { id: 4, title: "Fourth Podcast", isActive: true, type: "podcast" },
      { id: 5, title: "Fifth Video", isActive: true, type: "video" },
      { id: 6, title: "Sixth Article", isActive: true, type: "article" }
    ]);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleAddContent = () => {
    if (newContentTitle.trim()) {
      const newItem = {
        id: contentItems.length + 1,
        title: newContentTitle,
        isActive: true,
        type: newContentType
      };
      setContentItems([newItem, ...contentItems]);
      setNewContentTitle(""); // Reset input field
      setNewContentType("article"); // Reset content type
    }
  };

  const handleEditContent = (item: ContentItem) => {
    console.log("Editing content:", item);
  };

  const handleDeactivateContent = (itemId: number) => {
    setContentItems(
      contentItems.map(item =>
        item.id === itemId ? { ...item, isActive: false } : item
      )
    );
  };

  // Pagination logic
  const filteredItems = filterType === "all"
    ? contentItems
    : contentItems.filter(item => item.type === filterType);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Content Type Filter */}
        <div>
          <label htmlFor="filterType" className="mr-2">Content Management:</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="all">All</option>
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="podcast">Podcast</option>
          </select>
        </div>
      </div>

      {/* Add New Content Section */}
      <div className="mb-4">
        <input
          type="text"
          value={newContentTitle}
          onChange={(e) => setNewContentTitle(e.target.value)}
          placeholder="Enter new content title"
          className="border p-2 rounded-md mr-2"
        />

        {/* Content Type Selection for New Content */}
        <select
          value={newContentType}
          onChange={(e) => setNewContentType(e.target.value)}
          className="border p-2 rounded-md mr-2"
        >
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="podcast">Podcast</option>
        </select>

        <button
          onClick={handleAddContent}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Content
        </button>
      </div>

      {/* Content Items List */}
      <div className="space-y-4">
        {currentItems.map(item => (
          <div key={item.id} className="p-4 border rounded-md bg-white">
            <p className="text-lg">{item.title} ({item.type})</p>
            <button
              onClick={() => handleEditContent(item)}
              className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeactivateContent(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Deactivate
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
