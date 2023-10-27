import Link from 'next/link';
import React from 'react';

type NotificationProps = {
  title: string;
  text: string;
  link: string;
  linkText: string;
  imageUrl?: string;
  color: string;
};

function Notification({ title, text, link, linkText, imageUrl, color }: NotificationProps) {
  return (
    <div
      className={`bg-${color}-50 border border-${color} text-content py-4 px-4 flex items-center justify-between rounded-xl`}>
      <div className='flex items-center'>
        <div className='flex items-center justify-center relative'>
          <img src={imageUrl} className='h-10 w-10 rounded-full' alt='default avatar' />
          <div
            className={`bg-${color} rounded-full h-4 w-4 absolute top-[-4px] right-[-4px]`}></div>
        </div>
        <div className='ml-4'>
          <p className='font-bold'>{title}</p>
          <p>{text}</p>
        </div>
      </div>
      <Link
        href={link}
        className={`bg-${color} hover:opacity-70 text-${color} px-4 py-2 rounded-xl`}>
        {linkText}
      </Link>{' '}
    </div>
  );
}

export default Notification;
