#CS 493 AWS-SDK

##How To Use:

- Clone the project from the repo
- Install dependencies using `node install`
- Navigate to project directory

###assumeRole

- node assumeRole --rA `your-role-arn` --rSN `your-role-session-name`

Options --rA and --rSN are required.

###fileUploader

- node fileUploader -p `path/to/file` -b `name-of-s3-bucket` -n `new file name (rename)`

Options -p -b -a are required.

###dirUploader

- node dirUploader -p `path/to/dir/` -b `name-of-s3-bucket` -n `new dir name (rename)`

Options -p -b -a are required.
