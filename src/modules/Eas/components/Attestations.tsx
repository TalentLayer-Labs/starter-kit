import { IUser } from '../../../types';
import React, { useEffect, useState } from 'react';
import { ResolvedAttestation } from '../utils/types';
import {
  getAttestationsForAddress,
  getConfirmationAttestationsForUIDs,
  getENSNames,
} from '../utils/utils';
import { useAccount } from 'wagmi';
import { ensNames, mockEnsNames, mockTempAttestations } from './mock-data';
import { AttestationItem } from './AttestationItem';

interface IProps {
  user: IUser;
}

function Attestations({ user }: IProps) {
  const { address } = useAccount();
  const [attestations, setAttestations] = useState<ResolvedAttestation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAtts() {
      setAttestations([]);
      setLoading(true);
      if (!address) return;
      // const tmpAttestations = await getAttestationsForAddress(address);
      const tmpAttestations = mockTempAttestations;
      console.log('tmpAttestations', tmpAttestations);

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

  console.log('attestations', attestations);
  return (
    <>
      <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-100 font-medium break-all'>
        Your attestations
      </h2>
      <div className='flex flex-col mb-8'>
        {attestations.map((attestation, i) => <div>{attestation.id}</div>)}
        {/*{loading && <div>Loading...</div>}*/}
        {/*{attestations.length > 0 || loading ? (*/}
        {/*  attestations.map((attestation, i) => <AttestationItem key={i} data={attestation} />)*/}
        {/*) : (*/}
        {/*  <div>No one here yet</div>*/}
        {/*)}*/}
      </div>
    </>
  );
}

export default Attestations;