import React, { useContext } from 'react';
import BuilderPlaceContext from '../../modules/BuilderPlace/context/BuilderPlaceContext';

export default function BuilderPlaceHome() {
  const { builderPlace, loading } = useContext(BuilderPlaceContext);

  return (
    <div>
      BuilderPlace Home from {builderPlace?.name}
      <br />
      List of gigs
    </div>
  );
}
