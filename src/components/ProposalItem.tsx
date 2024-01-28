import Link from 'next/link';
import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useServiceById from '../hooks/useServiceById';
import { IProposal, ProposalStatusEnum, ServiceStatusEnum } from '../types';
import { renderTokenAmount } from '../utils/conversion';
import { formatDate } from '../utils/dates';
import ValidateProposalModal from './Modal/ValidateProposalModal';
import ProfileImage from './ProfileImage';

function ProposalItem({ proposal }: { proposal: IProposal }) {
  const { user, account } = useContext(TalentLayerContext);
  const { service } = useServiceById(proposal.service.id);

  if (!service) {
    return null;
  }

  const isBuyer = user?.id === proposal.service.buyer.id;

  return (
    <div className='flex flex-row gap-2 rounded-xl p-4 border border-info text-base-content bg-base-100'>
      <div className='flex flex-col items-top justify-between gap-4 w-full'>
        <div className='flex flex-col justify-start items-start gap-4'>
          <div className='flex items-center justify-start w-full  relative'>
            <ProfileImage size={50} url={proposal?.seller?.description?.image_url} />
            <div className='flex flex-col'>
              <p className='text-base-content font-medium break-all'>
                <Link href={`/profiles/${proposal.seller.id}`}>
                  {proposal.seller.handle} - {service.description?.title}
                </Link>
              </p>
              <p className='text-xs text-base-content opacity-50'>
                Proposal created the {formatDate(Number(proposal.createdAt) * 1000)}
              </p>
            </div>

            <span className='absolute right-[-25px] top-[-25px] inline-flex items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-content'>
              {proposal.status}
            </span>
          </div>

          <div className=' border-t border-info w-full'>
            <p className='text-sm text-base-content mt-4'>
              <strong>Message:</strong> {proposal.description?.about}
            </p>
            <p className='text-sm text-base-content mt-4'>
              <strong>Expiration Date:</strong> {formatDate(Number(proposal.expirationDate) * 1000)}
            </p>
            {proposal.description?.video_url && (
              <p className='text-sm text-content mt-4'>
                <a target='_blank' href={`${proposal.description?.video_url}`}>
                  Proposal video link
                </a>
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-row gap-4 justify-between items-center border-t border-info pt-4'>
          <p className='text-base-content font-bold line-clamp-1 flex-1'>
            {renderTokenAmount(proposal.rateToken, proposal.rateAmount)}
          </p>
          {account && isBuyer && proposal.status === ProposalStatusEnum.Pending && (
            <ValidateProposalModal proposal={proposal} account={account} />
          )}
        </div>
        {account &&
          !isBuyer &&
          proposal.status === ProposalStatusEnum.Pending &&
          service.status === ServiceStatusEnum.Opened && (
            <div className='flex flex-row gap-4 items-center border-t border-info pt-4'>
              <Link
                className='text-primary bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md relative'
                href={`/work/${service.id}/proposal`}>
                Edit proposal
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}

export default ProposalItem;
