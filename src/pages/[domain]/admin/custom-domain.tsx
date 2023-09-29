import React, { useContext } from 'react';
import SpaceContext from '../../../modules/MultiDomain/context/SpaceContext';

export default function CustomDomain() {
  const { space, loading } = useContext(SpaceContext);

  return (
    <div>
      <p>Space name: {space?.name}</p>
      <p>{loading}</p>
    </div>)
}
