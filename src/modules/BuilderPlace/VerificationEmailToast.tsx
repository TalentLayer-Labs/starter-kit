const VerificationEmailToast = () => {
  return (
    <div className='flex flex-row items-center rounded-2xl p-4 bg-light-blue-100'>
      <div className='mt-6 grow sm:mt-0'>
        <div className='pb-4 text-center sm:pb-0 sm:text-left'>
          <p className='font-heading text-md font-semibold leading-normal mb-2 opacity-90'>
            <span className='text-4xl block'>📨</span>
            <span> Verification Email Sent!</span>
          </p>
          <p className='font-alt text-sm font-normal leading-normal max-w-sm opacity-70'>
            <span>
              A verification link has been sent to your email. Please check your inbox and follow
              the link to verify your email address.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default VerificationEmailToast;
