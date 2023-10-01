import type { TFile } from '@/types/types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export const downloadFile = async (file: TFile) => {
  try {
    const data = await getSession();
    if (!data) {
      return;
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/task/download/${file._id}`,
      {
        headers: {
          Authorization: `Bearer ${data?.user.token}`,
        },
        responseType: 'blob',
      },
    );

    if (response.status === 200) {
      const blob = await response.data;
      const downLoadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downLoadUrl;
      link.download = file.file_originalName;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(downLoadUrl);
    }
  } catch (err: any) {
    toast.error(err.response.statusText);
  }
};
