import Link from 'next/link';
import React from 'react';
import ProfileImage from './ProfileImage';

type NotificationProps = {
  title: string;
  text: string;
  link: string;
  linkText: string;
  imageUrl?: string;
  color: string;
  callback?: () => void | Promise<void>;
};

function Notification({
  title,
  text,
  link,
  linkText,
  imageUrl,
  color,
  callback,
}: NotificationProps) {
  return (
    <div
      className={`bg-${color}-50 border border-${color} text-content py-4 px-4 flex flex-wrap  items-center justify-between rounded-xl`}>
      <div className='flex items-center'>
        <div className='flex items-center justify-center relative'>
          <ProfileImage size={50} url={imageUrl} />
          <div
            className={`bg-${color} rounded-full h-4 w-4 absolute top-[-4px] right-[-4px]`}></div>
        </div>
        <div className='ml-4'>
          <p className='font-bold'>{title}</p>
          <p>{text}</p>
        </div>
      </div>
      {callback ? (
        <button
          onClick={callback}
          className={`bg-${color} hover:opacity-70 text-${color} px-4 py-2 rounded-xl mt-2 sm:mt-0`}>
          {linkText}
        </button>
      ) : (
        <Link
          href={link}
          className={`bg-${color} hover:opacity-70 text-${color} px-4 py-2 rounded-xl mt-2 sm:mt-0`}>
          {linkText}
        </Link>
      )}
    </div>
  );
}

export default Notification;
