import React, { useState } from 'react';
import MapsService from 'services/maps';
import AddressForm from 'components/AddressForm';
import Map from 'components/Map';
import DeliveryOptionForm from 'components/DeliveryOptionForm';

function Home() {
  const [mapsService, setMapsService] = useState(null);
  const [routeCalculated, setRouteCalculated] = useState(false);

  const handleApiLoaded = (map, maps) => {
    setMapsService(new MapsService(maps, map));
  };

  return (
    <>
      <Map handleApiLoaded={handleApiLoaded} />
      {
          routeCalculated
            ? <DeliveryOptionForm />
            : !!mapsService && (
              <AddressForm
                onFinish={() => setRouteCalculated(true)}
                mapsService={mapsService}
              />
            )
        }
    </>
  );
}

export default Home;
