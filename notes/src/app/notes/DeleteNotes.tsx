"use client";
import React from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

function DeleteNotes({ id }: any) {
  const router = useRouter();
  async function handleClick(id: any) {
    const db = new PocketBase("http://127.0.0.1:8090");
    await db.collection("notes").delete(id);
    router.refresh();
  }
  return (
    <button
      className="p-2 border border-white w-20 rounded-full hover:text-black hover:bg-white transition duration-200 ease-in-out"
      onClick={() => handleClick(id)}
    >
      Delete
    </button>
  );
}

export default DeleteNotes;
