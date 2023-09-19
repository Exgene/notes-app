import PocketBase from "pocketbase";
import DeleteNotes from "../DeleteNotes";
import { redirect } from "next/navigation";
import getBetterTime from "@/utilities/getBetterTime";

export const revalidate = 0;

const Note = async ({ params }: any) => {
  const getNote = async (noteId: string) => {
    const db = new PocketBase("http://127.0.0.1:8090");
    try {
      const data = await db.collection("notes").getOne(noteId);
      return data as any;
    } catch (e) {
      redirect("/notes");
    }
  };
  const note = await getNote(params.id);

  return (
    <div className="flex flex-col border rounded-lg p-6 m-4 w-auto gap-4">
      <div className="flex flex-col gap-2 break-words">
        <h1 className="text-3xl font-semibold">{note.name}</h1>
        <p className="leading-loose text-slate-500">{note.content}</p>
        <p className="text-slate-200">{getBetterTime(note.created)}</p>
      </div>
      <DeleteNotes id={note.id} />
    </div>
  );
};

export default Note;
