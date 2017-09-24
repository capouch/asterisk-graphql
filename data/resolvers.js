let ari = require('ari-client')

const resolvers = {
  Query: {
  sounds: () => {
    return ari.connect('http://knuckle.palaver.net:8088', 'brianc', 'getmeoutofhere')
    .then (function (client) {
        return client.sounds.list()
        .then (function (_sounds) {
          console.log('Got some sounds ' + _sounds)
          return _sounds
        })
        .catch(function (err) {
          console.log('Error in sounds query ' + err);
          return err
        })
    })
    .catch(function(err) {
      console.log(err)
    })
  },

  getSound: (_, { id } ) => {
    return ari.connect('http://knuckle.palaver.net:8088', 'brianc', 'getmeoutofhere')
      .then (function(client) {
          return client.sounds.get({ soundId: id })
          .then (function(_sound) {
            console.log('So far, so good: ' + _sound.id + " " + _sound.text + " " + JSON.stringify(_sound.formats))
            return _sound
          })
          .catch(function(err){
            console.log('No sounds currently :-(' + err)
          })
        })
      .catch(function(err){
        console.log('Error ' + err)
      })
    },
  },

  Sound: {
    formats(sound) {
      return [
          {language: "EN", format: "gsm"},
          {language: "ES", format: "wav"}
        ];
      },
  },
}

export default resolvers;
