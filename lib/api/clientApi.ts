import { Credentials, User } from "@/types/user";
import { nextServer } from "./api";
import { NewNote, Note } from "@/types/note";

export const register = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>("/auth/register", credentials);
  return data;
};

export const login = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  await nextServer.post<User>("/auth/logout");
};

interface SessionStatus {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      perPage: 12,
      page,
      search,
      ...(tag && tag !== "All" ? { tag } : {}),
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export type updateProfileProps = {
  email: string;
  username: string;
};

export const updateProfile = async (data: updateProfileProps) => {
  const res = await nextServer.patch<User>(`/users/me`, data);
  return res.data;
};
