import { useEffect, useState } from 'react';
import { getWorkerProfileByOwnerId } from '../request';
import { IWorkerProfile } from '../types';

export function useGetWorkerProfileByOwnerId(id?: string): IWorkerProfile | null {
  const [workerProfile, setWorkerProfile] = useState<IWorkerProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getWorkerProfileByOwnerId(id);
          const data = await response.json();
          if (!data.error) {
            setWorkerProfile(data);
          }
        } catch (err: any) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    };
    fetchData();
  }, [id]);

  return workerProfile;
}
