import { ClipboardDocumentIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import TalentLayerContext from '../../../context/talentLayer';

function ShareModal() {
  const [show, setShow] = useState(false);
  const { account } = useContext(TalentLayerContext);

  const shareLink = `${window.location.origin}/dashboard/messaging/${account?.address}`;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareLink);
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

  return (
    <>
      <button
        type='button'
        className=' hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'
        onClick={() => setShow(true)}>
        <QrCodeIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
        Share
      </button>

      <div
        className={`${
          !show ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-black/90 flex flex-col items-center justify-center`}>
        <div className='relative w-full max-w-2xl h-auto'>
          <div className='relative bg-endnightshadow '>
            <div className='fixed top-0 right-0'>
              <button
                onClick={() => setShow(false)}
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm p-4 ml-auto inline-flex items-center '
                data-modal-toggle='defaultModal'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'></path>
                </svg>
                <span>Close</span>
              </button>
            </div>
            <div className='flex flex-col justify-between items-center '>
              <h3 className='text-xl font-semibold text-center py-6'>Share your address</h3>
              <div className='flex justify-center rounded-xl overflow-hidden'>
                <QRCodeSVG
                  value={shareLink}
                  size={260}
                  bgColor='#ff0050'
                  fgColor='#0A0A18'
                  level='L'
                  includeMargin={true}
                />
              </div>
              <p className='mt-10'>or</p>
              <a
                onClick={handleCopyClick}
                className='flex p-3 bg-endnight border-endnight rounded-xl justify-between mt-10 text-redpraha'>
                Copy a share link
                <ClipboardDocumentIcon className='ml-2 h-5 w-5' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareModal;
