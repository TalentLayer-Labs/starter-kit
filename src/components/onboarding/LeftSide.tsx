function LeftSide({ title, subtext }: { title: string; subtext: string }) {
  return (
    <div className='bg-info group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex'>
      <div className='mx-auto max-w-xs text-center'>
        <h2 className='font-heading text-3xl font-medium leading-normal text-base-content mb-4'>
          {title}
        </h2>
        <p className='font-alt text-sm font-normal leading-normal text-base-content mb-3'>
          {subtext}
        </p>
      </div>
      <div className='bg-base-100/20 absolute -start-6 left-0 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72' />
      <div className='bg-base-100/20 absolute -top-12 left-[100px] start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48' />
      <div className='bg-base-100/20 absolute -start-7 left-0 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40' />
      <div className='bg-base-100/20 absolute -bottom-6 right-[-23px] h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72' />
      <div className='bg-base-100/20 absolute -bottom-12 right-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48' />
      <div className='bg-base-100/20 absolute -right-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40' />
    </div>
  );
}

export default LeftSide;
