let ari = require('ari-client')

var mySounds = [
  {
    _id: "111111",
    text: "Some text for my sound",
  },
  {
    _id: "222222",
    text: "More soundy textys",
  }
]
var PromiseData

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

/*
  Query: {
    sounds: () => {
      // Non-working variant--does ari.connect return a promise?
      // PromiseData = () => {
      // return new Promise((resolve, reject) => {
      ari.connect('http://knuckle.palaver.net:8088', 'brianc', 'getmeoutofhere')
      .then (function (client) {
          client.sounds.list()
          .then (function (_sounds) {
            console.log('Got some sounds ' + _sounds)
            return _sounds
          // resolve(sounds)
          })
      .catch(function (err) {
        console.log('Error in sounds query ' + err)
        })
      })
      // })
    // }
  },

      /*
      // working variant
      console.log("We are really here")
      let retObject = [
        {
          _id: "23443",
          text: "Some text for my sound",
        },
        {
          _id: "234234",
          text: "More soundy textys",
        }
      ]
      return retObject
      },
      */

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
/*

      return {
        _id: "23432",
        text: "Some demonstrative text",
      }
    },
  },
*/
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
