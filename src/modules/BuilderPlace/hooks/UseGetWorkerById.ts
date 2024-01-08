import { useEffect, useState } from 'react';
import { getWorkerProfileById } from '../request';
import { IWorkerProfile } from '../types';

export function useGetWorkerById(id: string): IWorkerProfile | null {
  const [worker, setWorker] = useState<IWorkerProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWorkerProfileById(id);
        const data = await response.json();
        if (!data.error) {
          setWorker(data);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return worker;
}
