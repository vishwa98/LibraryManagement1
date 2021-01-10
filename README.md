# AF Project - Fashion Shop

URL of the app hosted on a cloud server: https://af-fashion-store.herokuapp.com/

### Get Started
 Clone the repository using git.
```$xslt
git clone https://github.com/LakshanPerera/af-fashion-store-project.git
```

Then install the dependencies.
```$xslt
yarn
or 
npm install
```

Copy the .env file.
```
cp .env.example .env
```
Update the values of the .env file to your environment.

During development, you have to run both express and react server seperately. Makesure to start the express server first, then the react server(it will ask you to start in a different port, allow it).
```
// start express server
yarn app
OR
npm run app

// start the react server
yarn dev
OR
npm run dev
```
During production, you can use the following command to build and run the express and react server both
```
yarn build
OR
npm run build
```
