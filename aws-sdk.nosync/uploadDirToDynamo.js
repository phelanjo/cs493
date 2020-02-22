var AWS = require('aws-sdk')
var fs = require('fs')
var path = require('path')

var sts = new AWS.STS({
  region: 'us-east-1'
})

adminRole = {
  RoleArn: 'arn:aws:iam::314587419725:role/Admin',
  RoleSessionName: 'phelanjoHW10'
}

const argv = require('yargs')
  .option('table', {
    alias: 't',
    describe: 'table',
    demandOption: true
  })
  .option('name', {
    alias: 'n',
    describe: 'name',
    demandOption: true
  })
  .option('path', {
    alias: 'p',
    describe: 'path to file',
    demandOption: true
  })
  .help().argv

sts.assumeRole(adminRole, (err, data) => {
  if (err) console.log(err)
  else {
    AWS.config.update({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
      region: 'us-east-1'
    })

    const uploadToDynamo = (table, name, localPath) => {
      var ddb = new AWS.DynamoDB({
        apiVersion: '2012-08-10'
      })

      // Walk function from: https://stackoverflow.com/a/46213474/9487966
      function walk(currentDir, callback) {
        fs.readdirSync(currentDir).forEach(name => {
          var filePath = path.join(currentDir, name)
          var stat = fs.statSync(filePath)
          if (stat.isFile()) {
            callback(filePath, stat)
          } else if (stat.isDirectory()) {
            walk(filePath, callback)
          }
        })
      }

      walk(localPath, (filePath, stat) => {
        let artist_album_song = filePath.substring(
          localPath.length,
          filePath.indexOf('.txt')
        )

        let artist = artist_album_song
          .split('/')
          .slice(0, -2)
          .join()

        let album = artist_album_song
          .split('/')
          .slice(1, -1)
          .join()

        let song = artist_album_song.split('/').pop()

        let params = {
          TableName: table,
          Item: {
            genre: { S: name },
            artist_album_song: { S: artist_album_song.split('.').pop(1) },
            artist: { S: artist },
            album: { S: album },
            song: { S: song }
          }
        }

        ddb.putItem(params, (err, data) => {
          if (err) {
            console.log('Error:', err)
          } else {
            console.log('Successful upload!')
          }
        })
      })
    }
    uploadToDynamo(argv.table, argv.name, argv.path)
  }
})
