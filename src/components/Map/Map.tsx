import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import style from '../../styles/Map.module.css';

export default function Map({ X, Y }: { X: number; Y: number }): JSX.Element {
  const customIcon = new Icon({
    iconUrl: '/icons8-maps-48.png',
    iconSize: [20, 20],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  });
  return (
    <MapContainer
      className={`${style.map} rounded-full`}
      center={[X, Y]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker icon={customIcon} position={[X, Y]}></Marker>
    </MapContainer>
  );
}
