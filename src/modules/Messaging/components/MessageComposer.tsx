import { Dispatch, SetStateAction } from 'react';
import Loading from '../../../components/Loading';

interface IMessageComposerProps {
  messageContent: string;
  setMessageContent: Dispatch<SetStateAction<string>>;
  sendNewMessage: () => void;
  sendingPending: boolean;
  peerUserExistsOnXMTP: boolean;
  peerUserExistsOnTalentLayer: boolean;
}

const MessageComposer = ({
  setMessageContent,
  messageContent,
  sendNewMessage,
  sendingPending,
  peerUserExistsOnXMTP,
  peerUserExistsOnTalentLayer,
}: IMessageComposerProps) => {
  const renderSendButton = (peerUserExists: boolean, sendingPending: boolean) => {
    return (
      !sendingPending && (
        <button
          className='hover:bg-base-300 bg-info text-base-content font-bold py-2 px-4 -ml-2 min-w-[20%] shrink-0'
          onClick={sendNewMessage}
          disabled={!peerUserExists || !peerUserExistsOnTalentLayer}>
          Send
        </button>
      )
    );
  };

  return (
    <>
      <div className='flex flex-row pt-5 fixed bottom-[64px] md:bottom-0 w-full md:w-[calc(100vw-256px)]'>
        <input
          className='w-full py-4 px-3 bg-base-300 border-0 text-base-content text-sm'
          type='text'
          onChange={e => setMessageContent(e.target.value)}
          placeholder='Write a message'
          disabled={!peerUserExistsOnXMTP || !peerUserExistsOnTalentLayer}
          value={messageContent}
        />
        {sendingPending && <Loading />}
        {renderSendButton(peerUserExistsOnXMTP, sendingPending)}
      </div>
    </>
  );
};

export default MessageComposer;
