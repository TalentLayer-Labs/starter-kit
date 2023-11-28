import React from 'react';

type ProfileImageProps = {
  size: number;
  url?: string;
};

function ProfileImage({ size, url }: ProfileImageProps) {
  if (!url) {
    return (
      <span className={`h-[${size}px] w-[${size}px] rounded-full bg-base-100 p-2`}>
        <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
          <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
          <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
              d='m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0'
              fill='currentColor'></path>{' '}
          </g>
        </svg>
      </span>
    );
  }
  return (
    <img
      className={`h-[${size}px] w-[${size}px] rounded-full bg-base-100 p-2`}
      alt='profile picture'
      src={url}
      width={size}
      height={size}
    />
  );
}

export default ProfileImage;
