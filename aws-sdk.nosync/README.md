# CS 493 AWS-SDK

## How To Use:

- Clone the project from the repo
- Install dependencies using `node install`
- Navigate to project directory

### assumeRole example:

`node assumeRole --rA your-role-arn --rSN your-role-session-name`

_Options --rA and --rSN are required._

### fileUploader example:

`node fileUploader -p path/to/file -b name-of-s3-bucket -n new file name (rename)`

_Options -p -b -a are required._

### dirUploader example:

`node dirUploader -p path/to/dir/ -b name-of-s3-bucket -n new dir name (rename)`

_Options -p -b -a are required._
