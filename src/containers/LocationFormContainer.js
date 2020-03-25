import React from 'react'
import { useSnackbar } from 'notistack'
import api from '../api'
import { withRouter } from 'react-router-dom'
import parse from 'coord-parser'
import LocationForm from '../components/LocationForm'
import Loader from '../components/Loader'
import useLanguage from '../utils/useLanguage'
import useAuth0 from '../utils/useAuth0'


const LocationFormContainer = ({
  cachedLocation,
  setCachedLocation,
  refreshMap,
  isNew,
  history,
  match,
}) => {
  const { params: { id } } = match
  const { isLoggedIn, loading: loadingAuth, isModerator } = useAuth0()
  const { translations } = useLanguage()
  const [location, setLocation] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState()
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      history.push(`/location/${id}`)
      enqueueSnackbar('Dodawanie lub edycja lokalizacji wymaga bycia zalogowanym.', { variant: 'warning' })
    }
  }, [loadingAuth])

  React.useEffect(() => {
    setLocation(cachedLocation)
  }, [cachedLocation])

  // Use cached location data if avaliable, otherwise load data from endpoint.
  React.useEffect(() => {
    if (cachedLocation) {
      setLocation(cachedLocation)
      setLoading(false)
    } else {
      if (id) {
        const handleAsync = async () => {
          try {
            const { data } = await api.post('get_point', { id })
            setLocation(data)
            setCachedLocation(data)
          } catch (error) {
            setError(true)
          }
          setLoading(false)
        }
        handleAsync()
      } else {
        setLoading(false)
      }
    }
  }, [])

  const onSubmitLocation = async fields => {
    /* eslint-disable camelcase */
    const {
      name,
      description,
      directions,
      type,
      location,
      water_exists,
      water_comment,
      fire_exists,
      fire_comment,
    } = fields

    try {
      const { lat, lon } = parse(location)
      const dataObject = {
        name,
        description,
        directions,
        lat: lat,
        lon: lon,
        type,
        water_exists: water_exists || false,
        water_comment: water_exists && water_comment ? water_comment : null,
        fire_exists: fire_exists || false,
        fire_comment: fire_exists && fire_comment ? fire_comment : null,
      }

      if (isNew) {
        // New marker creation.
        const { data } = await api.post('add_point', dataObject)
        setLocation(data)
        setCachedLocation(data)
        history.push(`/location/${_id}`)
        enqueueSnackbar(translations.notifications.newMarkerAdded, { variant: 'success' })
      } else {
        // Updating exisitng marker.
        const { id } = cachedLocation
        const { data } = await api.post('modify_point', { id, ...dataObject })
        setLocation(data)
        setCachedLocation(data)
        history.push(`/location/${_id}`)
        enqueueSnackbar(translations.notifications.markerUpdated, { variant: 'success' })
      }
      refreshMap()
    } catch (error) {
      if (error.type === 'parseError') {
        console.error(error.value)
        enqueueSnackbar(translations.notifications.wrongCoordsFormat, { variant: 'error' })
      } else {
        console.error(error)
        enqueueSnackbar(translations.notifications.couldNotSaveMarker, { variant: 'error' })
      }
    }
  }

  const onDeleteLocation = async () => {
    try {
      await api.post('delete_point', { id })
      setCachedLocation(null)
      history.push('/')
      refreshMap()
      enqueueSnackbar(translations.notifications.locationDeleted, { variant: 'success' })
    } catch (err) {
      console.error(err)
      enqueueSnackbar(translations.notifications.couldNotDeleteLocation, { variant: 'error' })
    }
  }

  return (
    loading || loadingAuth
      ? <Loader dark big />
      : error
        ? <div>Error!</div>
        : <LocationForm
          locationData={location}
          onSubmitLocation={onSubmitLocation}
          updateCurrentMarker={coords => {
            const { lat, lon } = parse(coords)
            if (location.location.lat !== lat || location.location.lon !== lon) {
              setCachedLocation({ ...location, location: { lat, lon } })
            }
          }}
          cancel={() => history.goBack()}
          isModerator={isModerator}
          onDeleteLocation={onDeleteLocation}
          isNew={isNew}
        />
  )
}

export default withRouter(LocationFormContainer)
