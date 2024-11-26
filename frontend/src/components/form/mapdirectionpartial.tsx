import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'

interface Location {
  latitude: number
  longitude: number
}

interface MapDirectionPartialProps {
  locations: { start: Location; end: Location }
}

const MapDirectionPartial: React.FC<MapDirectionPartialProps> = ({
  locations,
}) => {
  const { start, end } = locations

  if (
    (start.latitude === 0 && start.longitude === 0) ||
    (end.latitude === 0 && end.longitude === 0)
  ) {
    return null
  }

  const position: LatLngExpression = [start.latitude, start.longitude]
  const endPosition: LatLngExpression = [end.latitude, end.longitude]

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Início</Popup>
      </Marker>
      <Marker position={endPosition}>
        <Popup>Fim</Popup>
      </Marker>
      <Polyline positions={[position, endPosition]} color="blue" />
    </MapContainer>
  )
}

export default MapDirectionPartial
