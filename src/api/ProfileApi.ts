import api from '@/lib/axios';
import type { updateCurrentPassowrdForm, UserProfileForm } from '@/types';
import { isAxiosError } from 'axios';


export async function updateProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put<string>('/auth/profile', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function changePassword(formData: updateCurrentPassowrdForm) {
  try {
    const { data } = await api.post<string>('/auth/change-password', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}