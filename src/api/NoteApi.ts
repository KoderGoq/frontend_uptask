import api from '@/lib/axios';
import type { Note, NoteFormData, Project, Task } from '@/types';
import { isAxiosError } from 'axios';


type NoteApiType = {
  formData: NoteFormData,
  projectId: Project['_id'],
  taskId: Task['_id']
  noteId: Note['_id']
}

export async function createNote({ projectId, taskId, formData }: Pick<NoteApiType, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteApiType, 'projectId' | 'taskId' | 'noteId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}