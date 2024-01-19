import { useEffect, useState } from 'react';
import { getBuilderPlaceById } from '../request';
import { IBuilderPlace } from '../types';

export function useGetBuilderPlaceById(id: string): IBuilderPlace | null {
  const [builderPlace, setBuilderPlace] = useState<IBuilderPlace | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getBuilderPlaceById(id);
          const data = await response.json();
          if (!data.error) {
            setBuilderPlace(data.result);
          }
        } catch (err: any) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    };
    fetchData();
  }, [id]);

  return builderPlace;
}
