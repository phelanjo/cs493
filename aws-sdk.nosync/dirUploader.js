var AWS = require('aws-sdk')
var fs = require('fs')
var mime = require('mime-types')
var path = require('path')

var sts = new AWS.STS({
  region: 'us-east-1'
})

roleToAssume = {
  RoleArn: 'arn:aws:iam::314587419725:role/s3-full-access',
  RoleSessionName: 'phelanjoHW8'
}

const argv = require('yargs')
  .option('bucket', {
    alias: 'b',
    describe: 'name of bucket',
    demandOption: true
  })
  .option('name', {
    alias: 'n',
    describe: 'rename file',
    demandOption: true
  })
  .option('path', {
    alias: 'p',
    describe: 'path to file',
    demandOption: true
  })
  .help().argv

sts.assumeRole(roleToAssume, function(err, data) {
  if (err) console.log(err)
  else {
    AWS.config.update({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    })

    // Heavily influenced by: https://stackoverflow.com/a/46213474/9487966
    const uploadDirectory = (localPath, name, bucket) => {
      var s3 = new AWS.S3({
        region: 'us-east-1'
      })

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

      walk(localPath, function(filePath, stat) {
        let bucketPath = name + '/' + filePath.substring(localPath.length)
        let fileType = mime.lookup(filePath)
        let params = {
          Bucket: bucket,
          Key: bucketPath,
          Body: fs.readFileSync(filePath),
          ContentType: fileType
        }

        s3.putObject(params, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log('Successfully uploaded ' + bucketPath + ' to ' + bucket)
          }
        })
      })
    }

    uploadDirectory(argv.path, argv.name, argv.bucket)

    // My code, uploads a single directory.

    // try {
    //   fs.readdirSync(argv.path).forEach(file => {
    //     const fileName = argv.path + file
    //     const fileType = mime.lookup(file)
    //     const fileContent = fs.readFileSync(argv.path + file)

    //     const stat = fs.statSync(fileName)

    //     s3.putObject(
    //       {
    //         Bucket: argv.bucket,
    //         Key: argv.name + '/' + file,
    //         Body: fileContent,
    //         ContentType: fileType
    //       },
    //       function(err, data) {
    //         if (err) console.log(err)
    //         else console.log(`Upload Successful!`)
    //       }
    //     )
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  }
})
