import mirrorCreator from 'mirror-creator'

const actionTypes = mirrorCreator([
  'CAR_ADDED',
  'CAR_ADD_FAILED',
  'PARKINGLOTS_REFRESHED',
  'PARKINGLOT_CHANGED'
])

export default actionTypes
