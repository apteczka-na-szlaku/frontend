import React from 'react'
import { Button } from '@material-ui/core'
import Form from 'react-standalone-form'
import {
  Input,
  FormButton,
  Select,
  Checkbox,
  FormActions,
} from 'react-standalone-form-mui'
import { strings } from '../lang/strings.js'

const LocationForm = ({ selectedLocation, onSubmitLocation, cancel }) => {
  const [hasWater, setHasWater] = React.useState()
  const [hasFire, setHasFire] = React.useState()

  return (
    <Form
      fields={[
        'name',
        'description',
        'type',
        'water_exists',
        'water_description',
        'fire_exists',
        'fire_description',
      ]}
      required={[
        'placeName',
        'placeDescription',
        'placeType',
      ]}
      callbackOnChange={fields => {
        setHasWater(fields.water_exists)
        setHasFire(fields.fire_exists)
      }}
    >

      <Input
        name='name'
        label={strings.markerForm.place}
        min={5}
        initialValue={selectedLocation && selectedLocation.name}
      />

      <Input
        name='description'
        label={strings.markerForm.description}
        min={40}
        initialValue={selectedLocation && selectedLocation.description}
        multiline
      />

      <Select
        name='type'
        label={strings.markerForm.type}
        options={['Wiata', '2', '3', '4', '5']}
        initialValue={selectedLocation && selectedLocation.type}
      />

      <Checkbox
        name='water_exists'
        text={strings.marker.waterAccess}
        initialValue={selectedLocation && selectedLocation.water && selectedLocation.water.exists}
      />

      {hasWater &&
        <Input
          name='water_description'
          label={strings.markerForm.waterDescription}
          min={40}
          initialValue={selectedLocation && selectedLocation.water && selectedLocation.water.comment}
          multiline
        />
      }

      <Checkbox
        name='fire_exists'
        text={strings.marker.fireAccess}
        initialValue={selectedLocation && selectedLocation.fire && selectedLocation.fire.exists}
      />

      {hasFire &&
        <Input
          name='fire_description'
          label={strings.markerForm.fireDescription}
          min={40}
          initialValue={selectedLocation && selectedLocation.fire && selectedLocation.fire.comment}
          multiline
        />
      }

      <FormActions>
        <Button onClick={() => cancel()}>Anuluj</Button>
        <FormButton
          variant='contained'
          color='primary'
          callback={fields => onSubmitLocation(fields)}
        >{strings.markerForm.cta}</FormButton>
      </FormActions>
    </Form>
  )
}

export default LocationForm