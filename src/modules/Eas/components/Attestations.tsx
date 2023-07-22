import { ResolvedAttestation } from '../utils/types';
import { AttestationItem } from './AttestationItem';

function Attestations({ attestations }: { attestations: ResolvedAttestation[] }) {

  console.log('attestations', attestations);
  return (
    <>
      <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-100 font-medium break-all'>
        Your attestations
      </h2>
      <div className='flex flex-col mb-8'>
        {/*{attestations.map((attestation, i) => {*/}
        {/*  return <div>{attestation.schemaId}</div>;*/}
        {/*})}*/}
        {attestations.length > 0 ? (
          attestations.map((attestation, i) => <AttestationItem key={i} data={attestation} />)
        ) : (
          <div>No one here yet</div>
        )}
      </div>
    </>
  );
}

export default Attestations;
