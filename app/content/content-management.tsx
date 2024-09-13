"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ContentItem {
  id: number;
  title: string;
  isActive: boolean;
}

export default function ContentManagement() {
  const { status } = useSession();
  const router = useRouter();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  // Example content for now
  useEffect(() => {
    setContentItems([
      { id: 1, title: "First Item", isActive: true },
      { id: 2, title: "Second Item", isActive: true }
    ]);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleEditContent = (item: ContentItem) => {
    // Edit content logic, maybe open a modal or navigate to another page
    console.log("Editing content:", item);
  };

  const handleDeactivateContent = (itemId: number) => {
    setContentItems(
      contentItems.map(item =>
        item.id === itemId ? { ...item, isActive: false } : item
      )
    );
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Content</h1>
      <div className="space-y-4">
        {contentItems.map(item => (
          <div key={item.id} className="p-4 border rounded-md bg-white">
            <p className="text-lg">{item.title}</p>
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
    </div>
  );
}
