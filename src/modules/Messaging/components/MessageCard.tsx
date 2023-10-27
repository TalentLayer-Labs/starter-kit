import { useContext } from 'react';
import Loading from '../../../components/Loading';
import TalentLayerContext from '../../../context/talentLayer';
import { shortenString } from '../../../utils';
import { formatDateDivider } from '../../../utils/dates';
import { formatDateTime } from '../utils/messaging';
import { ChatMessageStatus, XmtpChatMessage } from '../utils/types';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface IMessageCardProps {
  message: XmtpChatMessage;
  dateHasChanged: boolean;
}

const formatMessage = (message: string) => {
  if (message.includes('/pattern?')) {
    return <p>Formated message</p>;
  }
  return message;
};

const MessageCard = ({ message, dateHasChanged }: IMessageCardProps) => {
  const { account } = useContext(TalentLayerContext);

  const isSender = message.from.toLowerCase() === account?.address?.toLowerCase();

  const messageContent = formatMessage(message.messageContent);

  return (
    <>
      {dateHasChanged && <DateDivider date={message.timestamp} />}
      {message.from && (
        <div
          className={`flex ${
            isSender ? 'justify-end pr-5' : 'justify-start pl-5'
          } mb-3 items-center`}>
          <div
            className={`py-3 px-4 text-sm ${
              isSender && message.status === ChatMessageStatus.SENT
                ? 'ml-12 bg-info text-base-content rounded-bl-2xl rounded-tl-2xl rounded-tr-xl'
                : isSender && message.status === ChatMessageStatus.ERROR
                ? 'ml-12 bg-error rounded-br-2xl rounded-tl-2xl rounded-tr-xl'
                : isSender && message.status === ChatMessageStatus.PENDING
                ? 'ml-12 bg-base-200 text-base-content rounded-bl-2xl rounded-tl-2xl rounded-tr-xl'
                : 'mr-12 bg-base-200 text-base-content rounded-br-2xl rounded-tr-2xl rounded-tl-xl'
            }
          text-base-content`}>
            <span className='pr-1 text-base-content opacity-50 text-xs w-[50px]'>
              {formatDateTime(message.timestamp)}
            </span>
            {isSender && message.status === ChatMessageStatus.SENT && (
              <div className={'break-all'}>{messageContent}</div>
            )}
            {!isSender && <div className={'break-all'}>{messageContent}</div>}
            {isSender && message.status === ChatMessageStatus.PENDING && (
              <div className='flex flex-row items-center'>
                <div>
                  <div className={'break-all'}>{messageContent}</div>
                </div>
                <div className='ml-2'>
                  <Loading />
                </div>
              </div>
            )}
            {isSender && message.status === ChatMessageStatus.ERROR && (
              <div className={'break-all'}>{messageContent}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
  <div className='flex items-center pb-8 pt-4'>
    <div className='grow h-[1px] bg-gray-800' />
    <span className='mx-11 flex-none text-base-content text-sm font-semibold'>
      {formatDateDivider(date)}
    </span>
    <div className='grow h-[1px] bg-gray-800' />
  </div>
);

export default MessageCard;
