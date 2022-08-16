# company-z-challenge
**Company Z** provides essential online services for tens of thousands of users through their platform **ZPlatform.**
## How to run this
- first clone this [repo](https://github.com/fab-ryan/company-z-challenge/)
- then run command in cmd or terminal `npm run install` to install dependencies and packages.
- copy `.env.example` to `.env`, fill all variable as suggested in `.env`.
- create database in postgress also register it in `.env`
- to create migration in database run this command in cmd and terminal `npm run migrate` 
- insert default data like for administrator(**admin**) run command `npm run seed` this will seed default value
- after that run command in cmd or terminal `npm run build` to build project
- once build command successful works 
## How to test
-  run `npm start` to start server 
-  admin user as default his email: `admin@admin.com` password: `Admin@123`
-  this has different endpoint each start with `api`
#### List of Endpoint
- `/api/` starting point welcome
- `/api/user/register` for register
- `/api/user/login` for login
- `/api/user/verify` for verification token
- `/api/user/resend/:userId` for resending OTP verification in-order to do two factor-authantication
- `/api/user` for getting user information about logged one
- `/api/user/all` get all user detail but this will be done only admin.
- `/api/user/forgot` user send email for resetting password
- `/api/user/reset/:token` reset password using token send to email provided
- `/api/user/change` to change old password to new password
- `/api/profile` create profile and this will be done only to logged user only, getting user information, deleting user profile
- `/api/profile/complete` to complete user profile by filling national Id or passport number and also document photo
- `/api/profile/verify/account/:profileId` this will be done only admin to verify completed profile
- `/api/profile/all` get all profile but this will be done by administration user
### documentation links and hosted link
- [https://company-z-challenge.herokuapp.com/api-docs](https://company-z-challenge.herokuapp.com/api-docs) documentation link
- [https://company-z-challenge.herokuapp.com/api](https://company-z-challenge.herokuapp.com/api) hosted Link
## environment variable 
> PORT=5000

> NODE_ENV=development

> URL=http://localhost:$PORT

> DATABASE_URL=

> JWT_SECRET=secretGHJKL456vbnmjhgf3456789uiy234!!

> USER_EMAIL=250.n.fabrice@gmail.com

> USER_PASSWORD=kejprmdswsjducmw

> REDIS_URL=redis://redis-13648.c251.east-us-mz.azure.cloud.redislabs.com:13648

> REDIS_PWD=I3eanq6ozO0zILla51LfVNyZKg7pLIM3

> CLOUDINARY_NAME=ryan-fab

> CLOUDINARY_API_KEY=329394397286775

> CLOUDINARY_API_SECRET=WTEH9SVjjCbp-bZPoiNcnCNN0NU

> FRONTEND_URL=http://localhost:3000
