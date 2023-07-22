import { XCircleIcon } from '@heroicons/react/24/outline';

function PreviewWebsite(props: any) {
  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div id='iframe-container'>
        <iframe
          src='http://localhost:3000/public-templates/template-1/index.html'
          className='w-full'
          width='100%'
          height='100%'
        />
        <XCircleIcon
          className='quit-iframe h-12 w-12'
          aria-hidden='true'
          onClick={() => {
            window.document.querySelector('#iframe-container').style.display = 'none';
          }}
        />
      </div>
    </div>
  );
}

export { PreviewWebsite };
