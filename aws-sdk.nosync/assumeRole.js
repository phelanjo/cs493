var AWS = require('aws-sdk')

var sts = new AWS.STS({
  region: 'us-east-1'
})

const argv = require('yargs')
  .option('roleArn', {
    alias: 'rA',
    describe: 'enter the role ARN',
    demandOption: true
  })
  .option('roleSessionName', {
    alias: 'rSN',
    describe: 'enter a role session name',
    demandOption: true
  })
  .help().argv

var params = {
  RoleArn: argv.roleArn,
  RoleSessionName: argv.roleSessionName
}

sts.assumeRole(params, function(err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data)
})
