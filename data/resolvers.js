// resolvers.js: Populate graphQL queries from Asterisk ARI fetches
//
// Written by Brian Capouch September 2017
//

let ari = require('ari-client')

const resolvers = {
  Query: {

  // Get all available sounds
  sounds: () => {

    // Connect to Asterisk ARI interface
    return ari.connect('http://knuckle.palaver.net:8088', 'astricon', 'dangrous')
    .then (function (client) {

      // Use client handle to fetch list of sounds
      return client.sounds.list()
      .then (function (_sounds) {
        return _sounds
      })
      .catch(function (err) {
        console.log('Error in sounds query ' + err);
        return err
      })
    })
    .catch(function(err) {
      console.log('Error connecting: ' + err)
    })
  },

  // Fetch a single sound from the ARI interface
  getSound: (_, { id } ) => {
    return ari.connect('http://knuckle.palaver.net:8088', 'astricon', 'dangrous')
    .then (function(client) {

      // Fetch a single sound from the ARI interface
      return client.sounds.get({ soundId: id })
      .then (function(_sound) {
        // console.log('So far, so good: ' + _sound.id + " " + _sound.text + " " + JSON.stringify(_sound.formats))
        return _sound
      })
      .catch(function(err){
        console.log('No sounds currently :-(' + err)
        })
      })
    .catch(function(err){
      console.log('Error connecting ' + err)
      })
    },
  },

  // Get format fields for a given sound
  Sound: {
    formats(sound) {
      return sound.formats
      },
  },
}

export default resolvers;
