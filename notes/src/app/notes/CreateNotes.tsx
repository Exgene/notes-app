"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CreateNotes() {
  const [name, setname] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  async function handleSubmit() {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, content }),
    });
    setname("");
    setContent("");
    router.refresh();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center items-center p-6"
    >
      <h2 className="text-3xl">Enter the Note</h2>
      <input
        className="w-80 h-10 bg-slate-900 rounded-md placeholder:text-center px-2"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <textarea
        className="w-80 resize-none h-40 bg-slate-900 rounded-md placeholder:text-center p-2"
        placeholder="content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <button
        className="p-2 border border-white w-36 rounded-full text-black bg-white hover:text-slate-950 hover:bg-slate-100 transition duration-200 ease-in-out"
        type="submit"
      >
        Create Note
      </button>
    </form>
  );
}

export default CreateNotes;
