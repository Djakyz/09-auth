import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string | null
): Promise<FetchNotesProps> => {
  const cookieStore = await cookies();
  const params = {
    params: {
      perPage: 12,
      page,
      search,
      ...(tag && tag !== "All" ? { tag } : {}),
    },
    headers: { Cookie: cookieStore.toString() },
  };

  const fetchNotesResponse = await nextServer.get<FetchNotesProps>(
    "/notes",
    params
  );

  return fetchNotesResponse.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return response.data;
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return responce;
};
