import React from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './App.css'
import Layout from './components/Layout'
import MapContainer from './containers/MapContainer'
import ContextMenu from './components/ContextMenu'
import LocationTabContainer from './containers/LocationTabContainer'
import NavBarContainer from './containers/NavBarContainer'


const App = () => {
  const [showContextMenu, setShowContextMenu] = React.useState()
  const [locationTabContent, setLocationTabContent] = React.useState()
  const [contextMenuPosition, setContextMenuPosition] = React.useState({})
  const [selectedLocation, setSelectedLocation] = React.useState()
  const [searchResults, setSearchResults] = React.useState()
  console.log('locationTabContent: ', locationTabContent);

  const mapRef = React.useRef()

  return (
    <Layout appBar={
      <NavBarContainer
        setSearchResults={results => setSearchResults(results)}
        setLocationTabContent={content => setLocationTabContent(content)}
      />
    }>

      <LocationTabContainer
        content={locationTabContent}
        setLocationTabContent={content => setLocationTabContent(content)}
        selectedLocation={selectedLocation}
        closeLocationTab={() => {
          setLocationTabContent(false)
          mapRef.current.clearAddMarker()
        }}
        searchResults={searchResults}
        refreshMap={async () => {
          console.log('before clearAddMarker')
          await mapRef.current.clearAddMarker()
          console.log('before loadMapMarkers')
          await mapRef.current.loadMapMarkers()
        }}
        setMapCenter={(lon, lat) => mapRef.current.setMapCenter(lon, lat)}
        setNewMarker={(lon, lat) => mapRef.current.setNewMarker(lon, lat)}
        setSelectedLocation={location => setSelectedLocation(location)}
      />

      <MapContainer
        openContextMenu={(x, y, coords) => {
          setContextMenuPosition({ x, y })
          setShowContextMenu(true)
          setSelectedLocation({ location: { lon: coords.x, lat: coords.y } })
          setSearchResults(null)
        }}
        closeContextMenu={() => setShowContextMenu(false)}
        openLocationTab={point => {
          setSearchResults(null)
          setLocationTabContent('markerInfo')
          setSelectedLocation(point)
        }}
        unsetCurrentLocation={() => setLocationTabContent(null)}
        onUpdateMarkerPosition={(lon, lat) => {
          setSelectedLocation({ ...selectedLocation, location: { lon, lat } })
        }}
        ref={mapRef}
        style={{ flexGrow: 1 }}
      />

      {showContextMenu &&
        <ContextMenu
          addMarker={async () => {
            setLocationTabContent('addMarker')
            setShowContextMenu(false)
            const { lon, lat } = selectedLocation.location
            mapRef.current.setMapCenter(lon, lat)
          }}
          position={contextMenuPosition}
          selectedLocation={selectedLocation}
        />
      }

    </Layout>
  )
}

export default App
