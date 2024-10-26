import { toast } from 'react-hot-toast';

// Utility Functions for Toast Messages
export const showToastSuccess = (message: string) => {
  toast.success(message);
};

export const showToastError = (message: string) => {
  toast.error(message);
};
