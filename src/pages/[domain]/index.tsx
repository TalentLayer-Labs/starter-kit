import React, { useContext } from 'react';
import SpaceContext from '../../modules/MultiDomain/context/SpaceContext';

export default function SpaceHome() {
  const { space, loading } = useContext(SpaceContext);

  return (
    <div>
      Space Home from {space?.name}
      <br />
      List of gigs
    </div>
  );
}
