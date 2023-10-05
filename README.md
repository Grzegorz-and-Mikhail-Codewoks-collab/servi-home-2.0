## Servi Home

Efficiently connecting users to cleaners.

Servi Home addresses the inconvenience and friction traditionally faced by users when booking cleaning services. Traditionally, users have to manually contact businesses, wait for replies, discuss availability, and specify needs. We transition this multi-step, manual, and unpredictable booking method into a seamless, user-friendly, digital experience. Our platform allows cleaners to directly accept user requests, sending immediate email notifications upon confirmation.

## How it looks

<img src='screens/start_page.png' height=400> <img src='screens/service_popup.png' height=200> <img src='screens/order_with_map.png' height=200> <img src='screens/address_popup.png' height=200> 
 






## Getting Started

To set up the Servi Home project on your local machine:

#### Clone the repository

```bash
# Copy code
git clone [repository_link]
Navigate to the project directory and install dependencies
```

#### Install dependencies
```bash
# Copy code
cd servi-home
npm install
#Setup the environment variables

#Ensure you have your own database URL.
#Set up your JWT secret for authentication.
#Configure your email settings for the nodemailer functionality.
#Run the development server
```

#### Set up database and migrate data
```bash
#you need to have your own database postgrs running.
#open .env file and put the DATABASE_URL value with its address.

cd solo-project-servi-home
npx prisma migrate dev

```

#### Run pplication
```bash
npm run dev
#For the server setup, refer to the Server Repository. If you're looking at the server repository, #refer back to the Client Repository.
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to test it

There are some tests for you.

#### Set up test environment

- You need to have [Docker desktop](https://docker.com) downloaded, insatalled and running.
- Open .env file
- Add DATABASE_TEST_URL="postgresql://prisma:prisma@127.0.0.1:5433/tests"
- run 
```bash
npm run test:api
```


## Tech Stack

![Tech Stack](https://skillicons.dev/icons?i=ts,nextjs,react,tailwind,prisma,postgres,jest,docker)

#### Frontend 
+ [TypeScript](https://www.typescriptlang.org/)
+ [Next.js](https://nextjs.org/)
+ [React](https://react.dev/) 
+ [TailwindCSS](https://tailwindcss.com/) 
+ [Zustand](https://github.com/pmndrs/zustand) 
+ [Leaflet](https://leafletjs.com/)

#### Backend 
+ [Prisma](https://www.prisma.io/)
+ [PostgreSQL](https://www.postgresql.org/)
+ [Nodemailer](https://nodemailer.com/)

#### Authentication 
+ [JWT](https://jwt.io/)
+ [Bcrypt](https://www.npmjs.com/package/bcrypt)

#### Testing
+ [Jest](https://jestjs.io/)
+ [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
+ [Cypress](https://www.cypress.io/)
+ [Docker](https://docker.com)

## Contributors: 
+ [Grzegorz Antkiewicz](https://github.com/AntkiewiczGrzegorz1997)
+ [Mikhail Rashkovskiy](https://github.com/miklyx)
+ [Javier Villamizar](https://github.com/jvillamizar18) - original idea and source.
