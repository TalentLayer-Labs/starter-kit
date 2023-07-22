import { useContext, useEffect, useState } from 'react';
import Steps from '../../components/Steps';
import UserDetail from '../../components/UserDetail';
import StarterKitContext from '../../context/starterKit';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Attestations from '../../modules/Eas/components/Attestations';
import { useAccount } from 'wagmi';
import { ResolvedAttestation } from '../../modules/Eas/utils/types';
import { CUSTOM_SCHEMAS } from '../../modules/Eas/utils/utils';
import { mockEnsNames, mockTempAttestations } from '../../modules/Eas/components/mock-data';
import { getAttestationsForAddress } from '../api/utils/eas-utils';
import LensModule from '../../modules/Lens/LensModule';

function Dashboard() {
  const { account, user } = useContext(StarterKitContext);

  if (!user) {
    return <Steps />;
  }

  const { address } = useAccount();
  const [attestations, setAttestations] = useState<ResolvedAttestation[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(CUSTOM_SCHEMAS);

  useEffect(() => {
    async function getAtts() {
      setAttestations([]);
      setLoading(true);
      if (!address) return;
      // const tmpAttestations = await getAttestationsForAddress(address);
      const tmpAttestations = mockTempAttestations;

      const addresses = new Set<string>();

      tmpAttestations.forEach(att => {
        addresses.add(att.attester);
        addresses.add(att.recipient);
      });

      const resolvedAttestations: ResolvedAttestation[] = [];

      // const ensNames = await getENSNames(Array.from(addresses));
      const ensNames = mockEnsNames;

      const uids = tmpAttestations.map(att => att.id);

      // const confirmations = await getConfirmationAttestationsForUIDs(uids);
      const confirmations = [];

      tmpAttestations.forEach(att => {
        const amIAttester = att.attester.toLowerCase() === address.toLowerCase();

        const otherGuy = amIAttester ? att.recipient : att.attester;

        const relatedConfirmation = confirmations.find(conf => {
          return (
            conf.refUID === att.id &&
            ((amIAttester && conf.attester.toLowerCase() === otherGuy.toLowerCase()) ||
              (!amIAttester && conf.attester.toLowerCase() === address.toLowerCase()))
          );
        });

        resolvedAttestations.push({
          ...att,
          confirmation: relatedConfirmation,
          name:
            ensNames.find(name => name.id.toLowerCase() === otherGuy.toLowerCase())?.name ||
            otherGuy,
        });
      });

      setAttestations(resolvedAttestations);
      setLoading(false);
    }
    getAtts();
  }, [address]);

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>
            Get started with your <span className='text-gray-100 ml-1'> Husky-Attestations </span>!
          </p>
          <Link
            href={`/dashboard/profile/edit`}
            className=' hover:bg-endnight text-white bg-endnight px-3 py-2 text-sm flex items-center rounded-xl'>
            <PencilSquareIcon className='w-[18px] h-[18px] text-redpraha mr-2' />
            Edit
          </Link>
          <LensModule address={user.address} />
        </div>
      </div>

      {account?.isConnected && user && (
        <div>
          {/* -------------------------- */}
          <div className='mb-6'>
            <UserDetail user={user} score={6} />
          </div>
          <div>{attestations && <Attestations attestations={attestations} />}</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
