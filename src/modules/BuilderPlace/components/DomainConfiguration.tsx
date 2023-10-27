import React from 'react';
import { useState } from 'react';
import { getSubdomain } from '../domains';
import { useDomainStatus } from '../hooks/UseDomainStatus';
import { CheckCircle, ExclamationCircle, XCircleOutline } from 'heroicons-react';
import { DomainVerificationStatusProps } from '../types';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { handleCopyClick } from '../../../utils/copyClickHandler';
import { getDomainPrefix } from '../utils';

export const InlineSnippet = ({ children }: { children: string }) => {
  return (
    <span className='inline-block rounded-md bg-blue-100 px-1 py-0.5 text-info bg-blue-900 text-info'>
      {children}
    </span>
  );
};
export default function DomainConfiguration({ domain }: { domain: string }) {
  const [recordType, setRecordType] = useState<'A' | 'CNAME'>('A');

  const { status, domainJson } = useDomainStatus({ domain });

  if (!status || !domainJson) return null;

  const subdomain = getSubdomain(domainJson.name, domainJson.apexName);
  const txtVerification =
    (status === DomainVerificationStatusProps.Pending &&
      domainJson.verification.find((x: any) => x.type === 'TXT')) ||
    null;

  if (status === DomainVerificationStatusProps.Valid)
    return (
      <div className='border-t border-stone-200 px-10 pb-5 pt-7 border-stone-700'>
        <div className='mb-4 flex items-center space-x-2'>
          <CheckCircle
            fill='#32CD32'
            stroke='currentColor'
            className='text-base-content text-content'
          />
          <p className='text-lg font-semibold text-base-content'>{status}</p>
        </div>
      </div>
    );

  return (
    <div className='border-t border-stone-200 px-10 pb-5 pt-7 border-stone-700'>
      <div className='mb-4 flex items-center space-x-2'>
        {status === DomainVerificationStatusProps.Pending ? (
          <ExclamationCircle
            fill='#FBBF24'
            stroke='currentColor'
            className='text-base-content text-content'
          />
        ) : (
          <XCircleOutline
            fill='#DC2626'
            stroke='currentColor'
            className='text-base-content text-content'
          />
        )}
        <p className='text-lg font-semibold text-base-content'>{status}</p>
      </div>
      {txtVerification ? (
        <>
          <p className='text-sm text-base-content'>
            Please set the following TXT record on{' '}
            <InlineSnippet>{domainJson.apexName}</InlineSnippet> to prove ownership of{' '}
            <InlineSnippet>{domainJson.name}</InlineSnippet>:
          </p>
          <div className='my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 bg-stone-800 text-base-content'>
            <div>
              <p className='text-sm font-bold'>Type</p>
              <p className='mt-2 text-sm'>{txtVerification.type}</p>
            </div>
            <div>
              <p className='text-sm font-bold'>Name</p>
              <p className='mt-2 text-sm'>
                {getDomainPrefix(txtVerification.domain, domainJson.apexName)}
              </p>
            </div>
            <div>
              <p className='text-sm font-bold'>Value</p>
              <p className='mt-2 text-sm'>
                <span className='text-ellipsis'>{txtVerification.value}</span>
                <button
                  onClick={() => {
                    handleCopyClick(txtVerification.value);
                  }}
                  className='ml-2'>
                  <ClipboardDocumentListIcon className='h-5 w-5 text-indigo-500' />
                </button>
              </p>
            </div>
          </div>

          <p className='text-sm text-base-content opacity-50'>
            Warning: if you are using this domain for another site, setting this TXT record will
            transfer domain ownership away from that site and break it. Please exercise caution when
            setting this record.
          </p>
        </>
      ) : status === DomainVerificationStatusProps.Error ? (
        <p className='mb-5 text-sm text-base-content'>{domainJson.error.message}</p>
      ) : (
        <>
          <div className='flex justify-start space-x-4'>
            <button
              type='button'
              onClick={() => setRecordType('A')}
              className={`${
                recordType == 'A'
                  ? 'border-black text-content border-white text-base-content'
                  : 'border-white text-base-content opacity-50 border-black text-base-content'
              } ease border-b-2 pb-1 text-sm transition-all duration-150`}>
              A Record{!subdomain && ' (recommended)'}
            </button>
            <button
              type='button'
              onClick={() => setRecordType('CNAME')}
              className={`${
                recordType == 'CNAME'
                  ? 'border-black text-content border-white text-base-content'
                  : 'border-white text-base-content opacity-50 border-black text-base-content'
              } ease border-b-2 pb-1 text-sm transition-all duration-150`}>
              CNAME Record{subdomain && ' (recommended)'}
            </button>
          </div>
          <div className='my-3 text-left'>
            <p className='my-5 text-sm text-base-content'>
              To configure your {recordType === 'A' ? 'apex domain' : 'subdomain'} (
              <InlineSnippet>
                {recordType === 'A' ? domainJson.apexName : domainJson.name}
              </InlineSnippet>
              ), set the following {recordType} record on your DNS provider to continue:
            </p>
            <div className='flex items-center justify-start space-x-10 rounded-md bg-stone-50 p-2 bg-stone-800 text-base-content'>
              <div>
                <p className='text-sm font-bold'>Type</p>
                <p className='mt-2 text-sm'>{recordType}</p>
              </div>
              <div>
                <p className='text-sm font-bold'>Name</p>
                <p className='mt-2 text-sm'>{recordType === 'A' ? '@' : subdomain ?? 'www'}</p>
              </div>
              <div>
                <p className='text-sm font-bold'>Value</p>
                <p className='mt-2 text-sm'>
                  {recordType === 'A'
                    ? `76.76.21.21`
                    : `cname.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                </p>
              </div>
              <div>
                <p className='text-sm font-bold'>TTL</p>
                <p className='mt-2 text-sm'>86400</p>
              </div>
            </div>
            <p className='mt-5 text-sm text-base-content'>
              Note: for TTL, if <InlineSnippet>86400</InlineSnippet> is not available, set the
              highest value possible. Also, domain propagation can take up to an hour.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
