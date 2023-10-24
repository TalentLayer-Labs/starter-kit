import { useState } from 'react';
import { postOpenAiRequest } from '../../../modules/OpenAi/utils';
import { getBuilderPlace } from '../../../modules/BuilderPlace/queries';

enum Creator {
  Me = 0,
  Bot = 1,
}

interface MessageProps {
  text: string;
  from: Creator;
  key: number;
}

interface InputProps {
  onSend: (input: string) => void;
  disable: boolean;
}

export async function getServerSideProps({ params }: any) {
  return await getBuilderPlace(params.domain);
}

const ChatMessage = ({ text, from }: MessageProps) => {
  return (
    <>
      {from == Creator.Me && (
        <div className=' bg-endnight border border-redpraha p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap mb-2'>
          <p className=' text-stone-700'></p>
        </div>
      )}
      {from == Creator.Bot && (
        <div className='bg-endnight p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap mb-2'>
          <p className='text-stone-800'>{text}</p>
        </div>
      )}
    </>
  );
};

const ChatInput = ({ onSend, disable }: InputProps) => {
  const [input, setInput] = useState('');

  const sendInput = () => {
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (event: any) => {
    if (event.keycode === 13) {
      sendInput();
    }
  };

  return (
    <div className='rounded-lg flex justify-center'>
      <input
        value={input}
        onChange={(ev: any) => setInput(ev.target.value)}
        className='w-full py-2 px-3 text-stone-400 rounded-lg focuse:outline-none'
        type='text'
        placeholder='Ask me anything'
        disabled={disable}
        onKeyDown={ev => handleKeyDown(ev)}
      />
      {disable && <p>disabled</p>}
      {!disable && (
        <button
          onClick={() => sendInput()}
          className='grow px-5 py-2 rounded-xl bg-redpraha text-stone-800'>
          <p>send</p>
        </button>
      )}
    </div>
  );
};

export default function Ai() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: input,
      from: Creator.Me,
      key: new Date().getTime(),
    };
    setMessages([myMessage, ...messages]);
    const context = "I'm using BuilderPlace freelance platform, help me use the platform.";
    const response = await postOpenAiRequest(context + input);
    setLoading(false);

    if (response) {
      const botMessage: MessageProps = {
        text: response,
        from: Creator.Bot,
        key: new Date().getTime(),
      };
      setMessages([botMessage, ...messages]);
    } else {
      //Show error
    }
  };
  return (
    <main className='relative max-w-2xl mx-auto'>
      <div className='sticky top-0 w-full pt-10 px-4'>
        <ChatInput onSend={input => callApi(input)} disable={loading} />
      </div>
      <div className='mt-10 px-4'>
        {messages.map((msg: MessageProps) => (
          <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
        ))}
        {messages.length == 0 && <p className='text-center text-stone-600'>I am at you service</p>}
      </div>
    </main>
  );
}
