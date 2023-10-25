import { CogIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { PaperAirplane } from 'heroicons-react';
import { useContext } from 'react';
import Loading from '../../../../components/Loading';
import Steps from '../../../../components/Steps';
import UserNeedsMoreRights from '../../../../components/UserNeedsMoreRights';
import TalentLayerContext from '../../../../context/talentLayer';
import dynamic from 'next/dynamic';
import useWeb3MailStats from '../../../../modules/Web3mail/hooks/useWeb3MailStats';
import { getBuilderPlace } from '../../../../modules/BuilderPlace/queries';

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

const Web3mailChart = dynamic(
  () => import('../../../../modules/Web3mail/components/Web3mailChart'),
  {
    ssr: false,
  },
);

function Web3mailStats() {
  const { user, loading } = useContext(TalentLayerContext);
  const { web3MailStats } = useWeb3MailStats();
  const isWeb3mailActive = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL as string;

  if (loading || !web3MailStats) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!user.isAdmin) {
    return <UserNeedsMoreRights />;
  }

  if (isWeb3mailActive === 'false') {
    return (
      <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
        <div className=' -mx-6 -mt-6 '>
          <div className='flex py-2 px-6 items-center border-b w-full border-redpraha mb-8'>
            <p className='text-2xl font-medium flex-1'>Stats Web3 Mails</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-2xl font-medium flex-1'>Web3mail is not active</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto text-stone-800 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <div className='flex py-2 px-6 sm:px-0 items-center border-b w-full border-redpraha mb-8'>
          <p className='text-2xl font-medium flex-1'>Stats Web3 Mails</p>
          <a
            href={`/admin/web3mail`}
            className=' hover:bg-endnight text-stone-800 bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <PaperAirplane
              width={18}
              height={18}
              className='w-[18px] h-[18px] text-stone-600 mr-2'
            />
            Send
          </a>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-12 gap-6'>
          <div className='bg-endnight ltablet:col-span-6 col-span-12 lg:col-span-6 rounded-xl border border-redpraha'>
            <div className='p-6'>
              <div className='mb-6'>
                <h3 className='text-stone-800'>
                  <span>Quick Stats</span>
                </h3>
              </div>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='bg-midnight flex items-center gap-2 rounded-xl px-5 py-10'>
                  <div className='p-4 rounded-full border-2 border-redpraha/80 bg-redpraha/20 text-redpraha'>
                    <PaperAirplane width={20} height={20} />
                  </div>
                  <div>
                    <h2 className='text-stone-800'>
                      <span>{web3MailStats.totalSent}</span>
                    </h2>
                    <p className=''>
                      <span className='text-stone-600'> Total sent </span>
                    </p>
                  </div>
                </div>
                <div className='bg-midnight flex items-center gap-2 rounded-xl px-5 py-10'>
                  <div className='p-4 rounded-full border-2 border-redpraha/80 bg-redpraha/20 text-redpraha'>
                    <PaperAirplane width={20} height={20} />
                  </div>
                  <div>
                    <h2 className='text-stone-800'>
                      <span>{web3MailStats.totalSentThisMonth}</span>
                    </h2>
                    <p className=''>
                      <span className='text-stone-600'> sent this month </span>
                    </p>
                  </div>
                </div>
                <div className='bg-midnight flex items-center gap-2 rounded-xl px-5 py-10'>
                  <div className='p-4 rounded-full border-2 border-redpraha/80 bg-redpraha/20 text-redpraha'>
                    <UserGroupIcon width={20} height={20} />
                  </div>
                  <div>
                    <h2 className='text-stone-800'>
                      <span>{web3MailStats.totalContact}</span>
                    </h2>
                    <p className=''>
                      <span className='text-stone-600'> contacts </span>
                    </p>
                  </div>
                </div>
                <div className='bg-midnight flex items-center gap-2 rounded-xl px-5 py-10'>
                  <div className='p-4 rounded-full border-2 border-redpraha/80 bg-redpraha/20 text-redpraha'>
                    <CogIcon width={20} height={20} />
                  </div>
                  <div>
                    <h2 className='text-stone-800'>
                      <span>{web3MailStats.totalCronRunning}</span>
                    </h2>
                    <p className=''>
                      <span className='text-stone-600'> cron running </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-endnight ltablet:col-span-6 col-span-12 lg:col-span-6 rounded-xl border border-redpraha'>
            <div className='p-6'>
              <div className='mb-6'>
                <h3 className='text-stone-800'>
                  <span>Web3mails sent by month</span>
                </h3>
              </div>
              <div className='-ms-4'>
                {/**/}
                <div className='vue-apexcharts' style={{ minHeight: 273 }}>
                  <Web3mailChart totalSentByMonth={web3MailStats.totalSentByMonth} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Web3mailStats;
