import { BaseAxios } from '@/lib';

export const upLoadOneFile = async (folder: string, file: File) => {
  const axios = new BaseAxios();
  const formData = new FormData();
  formData.append('folder', folder);
  formData.append('file', file);
  const res = await axios.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res) {
    return res?.data?.data;
  } else {
    return '';
  }
};
