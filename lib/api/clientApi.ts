import { Credentials, User } from '@/types/user';
import { nextServer } from './api';
import { NewNote, Note } from '@/types/note';

export const register = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/register', credentials);
  return data;
};
export const login = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/login', credentials);

  return data;
};

export const logout = async () => {
  await nextServer.post<User>('/auth/logout');
};
interface SessionStatus {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>('/auth/session');
  return data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export interface UserToUpdate {
  email?: string;
  username?: string;
}

export const updateUser = async (updatedUser: UserToUpdate) => {
  const { data } = await nextServer.patch<User>('/users/me', updatedUser);
  return data;
};

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string | null
): Promise<FetchNotesProps> => {
  const params = {
    params: {
      page,
      search,
      perPage: 12,
      tag,
    },
  };

  const fetchNotesResponse = await nextServer.get<FetchNotesProps>(
    '/notes',
    params
  );

  return fetchNotesResponse.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`notes/${id}`);

  return response.data;
};

export const createNote = async (newTask: NewNote): Promise<Note> => {
  const createNoteResponse = await nextServer.post<Note>('/notes', newTask);
  return createNoteResponse.data;
};

//* === DELETE === *
export const deleteNote = async (taskID: string): Promise<Note> => {
  const deleteNoteResponse = await nextServer.delete<Note>(`notes/${taskID}`);
  return deleteNoteResponse.data;
};
