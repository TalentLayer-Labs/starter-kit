import { toast } from 'react-toastify';

export const handleCopyClick = (input: string) => {
  navigator.clipboard.writeText(input);
  toast('Link copied', {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'dark',
  });
};
