import { toast } from 'react-hot-toast';

// Utility Functions for Toast Messages
export const showToastSuccess = (message: string) => {
  toast.success(message);
};

export const showToastError = (message: string) => {
  toast.error(message);
};

export const showToastLoading =(message:string)=>{
  toast.loading(message)

}

// Function to show a warning toast for unsaved changes
export const showToastWarning = (message: string) => {
  toast(message, {
    icon: '⚠️', // Warning icon
    style: {
      background: '#fff', // Amber background for warning
      color: '#000', // White text color
    },
    //duration: 5000, // Display for 5 seconds
  });
};
