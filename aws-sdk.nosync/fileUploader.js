var AWS = require('aws-sdk')
var fs = require('fs')
var mime = require('mime-types')

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

var sts = new AWS.STS({
  region: 'us-east-1'
})

roleToAssume = {
  RoleArn: 'arn:aws:iam::314587419725:role/s3-full-access',
  RoleSessionName: 'phelanjoHW8'
}

sts.assumeRole(roleToAssume, function(err, data) {
  if (err) console.log(err)
  else {
    console.log('Assumed Role')
    AWS.config.update({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    })

    var s3 = new AWS.S3({
      region: 'us-east-1'
    })

    const fileContent = fs.readFileSync(argv.path)
    const fileType = mime.lookup(argv.path)

    var params = {
      Bucket: argv.bucket,
      Key: argv.name,
      Body: fileContent,
      ContentType: fileType
    }

    s3.putObject(params, function(err, data) {
      if (err) console.log(err)
      else console.log(`Upload Successful!`)
    })
  }
})
