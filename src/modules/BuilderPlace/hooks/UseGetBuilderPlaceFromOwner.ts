import { useEffect, useState } from 'react';
import { getBuilderPlaceFromOwner } from '../request';
import { IBuilderPlace } from '../types';

export function useGetBuilderPlaceFromOwner(id: string): IBuilderPlace | null {
  const [builderPlace, setBuilderPlace] = useState<IBuilderPlace | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBuilderPlaceFromOwner(id);
        const data = await response.json();
        console.log('res', data);
        if (response) {
          setBuilderPlace(data);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return builderPlace;
}
