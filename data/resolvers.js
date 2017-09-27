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

    // Expost listByTech from the ari-client library
    listByTech: (_, { tech } ) => {
      return ari.connect('http://knuckle.palaver.net:8088', 'astricon', 'dangrous')
      .then (function(client) {

        // Fetch all endpoints for a given technology from the ARI interface
        return client.endpoints.listByTech({ tech: tech })
        .then (function(_endpoints) {
          // console.log('So far, so good: ' + _sound.id + " " + _sound.text + " " + JSON.stringify(_sound.formats))
          return _endpoints
        })
        .catch(function(err){
          console.log('No endpoints for that tech' + err)
          })
        })
      .catch(function(err){
        console.log('Error connecting ' + err)
        })
      },

    // Expose part of the endpoints API
    endpoints: () => {

      // Connect to Asterisk ARI interface
      return ari.connect('http://knuckle.palaver.net:8088', 'astricon', 'dangrous')
      .then (function (client) {

        // Use client handle to fetch list of sounds
        return client.endpoints.list()
        .then (function (_endpoints) {
          return _endpoints
        })
        .catch(function (err) {
          console.log('Error in endpoints query ' + err);
          return err
        })
      })
      .catch(function(err) {
        console.log('Error connecting: ' + err)
      })
    },
  },
  Mutation: {
    sendMessage: ( _, { to, from, body } ) => {
      // console.log('Got parm of body as: ' + body)
      return ari.connect('http://knuckle.palaver.net:8088', 'astricon', 'dangrous')
      .then (function(client) {

        // Here is a horible kludge!!  See https://github.com/asterisk/node-ari-client/issues/30
        let variables = { "body":body, "variables": {"Event":"somepointlessname"} }
        return client.endpoints.sendMessage( { to: to, from: from, variables: variables } )
        .then (function() {
          return "Message sent"
        })
        .catch(function(err){
          console.log('Cannot send message!! :-(' + err)
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
