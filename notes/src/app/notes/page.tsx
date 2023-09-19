export const revalidate = 0;
import CreateNotes from "./CreateNotes";
import DeleteNotes from "./DeleteNotes";
import getBetterTime from "@/utilities/getBetterTime";

import Link from "next/link";
import PocketBase from "pocketbase";
async function getNotes() {
/*   
  const response = await fetch(
      "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
      { cache: "no-store" }
    );
    const data = await response.json();
*/

  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getList();
  return data?.items as any[];
}
async function NotesPage() {
  const notes = await getNotes();
  return (
    <>
      <CreateNotes />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => {
          return <Note key={note.id} value={note} />;
        })}
      </div>
    </>
  );
}

function Note({ value }: any) {
  const { id, name, content, created } = value || {};
  return (
    <div className="flex flex-col border rounded-lg p-6 m-4 w-auto gap-4">
      <Link href={`/notes/${id}`}>
        <div className="flex flex-col gap-2 break-words">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="leading-loose text-slate-500">{content}</p>
          <p className="text-slate-200">{getBetterTime(created)}</p>
        </div>
      </Link>
      <DeleteNotes id={id} />
    </div>
  );
}

export default NotesPage;
