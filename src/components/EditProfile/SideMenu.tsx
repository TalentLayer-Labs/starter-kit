import { useState, useEffect } from 'react';
import SideLink from './SideLink';
import { navigation } from './navigation';
import { ICompletionScores, getCompletionScores } from '../../utils/profile';
import { useTalentLayer } from '@talentlayer/react/dist';

export default function SideMenu() {
  const [completionScores, setCompletionScores] = useState<ICompletionScores>();

  const { user } = useTalentLayer();

  useEffect(() => {
    if (user) setCompletionScores(getCompletionScores(user));
  }, [user]);

  return (
    <ul className='space-y-1 font-sans text-sm'>
      {navigation().map(item => (
        <SideLink
          key={item.name}
          href={item.href}
          isCompleted={
            completionScores &&
            completionScores[item.completitonKey as keyof ICompletionScores]?.percentage == 100
              ? true
              : false
          }>
          <item.icon width={20} height={20} />
          <span className='grow'>{item.name}</span>
        </SideLink>
      ))}
    </ul>
  );
}
