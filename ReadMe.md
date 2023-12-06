![Rare Form Roasting Logo](RFRLogoCircle.png)

_Rare Form Roasting Co._ is a proof-of-concept e-commerce website for my personal coffee roasting company.

## Tech Stack

- Front-end: [React.js](https://react.dev/), styled with some heavily-modified [Reactstrap](https://github.com/reactstrap/reactstrap)
- APIs & database interfacing: [C#/.NET](https://dotnet.microsoft.com/en-us/languages/csharp) [(ASP.NET Core)](https://dotnet.microsoft.com/en-us/apps/aspnet), [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- Database: [PostgreSQL](https://www.postgresql.org/)

Developed using [VSCode](https://code.visualstudio.com/), [GitHub](github.com), [Create React App](https://create-react-app.dev/), and [Postman API](https://www.postman.com/).

## Demonstration

View a quick demonstration of _Rare Form Roasting Co._ here:
[![Rare Form Roasting Video](RFRThumbnail.png)](https://youtu.be/o-PwQQVBHhk?si=44_NIQUjhpj7eQAa)

## Some fun features:

- Custom-built backend with ASP.NET Core MVC controllers for API endpoints, securely connected to a PostgreSQL database for persistent storage
- UI login functionality integrated via ASP.NET Core Identity, with different views and privileges available depending on the logged-in user's role
- Full CRUD operations on multiple fronts: customer users can customize and place orders, admin users can manage orders and inventory
- Development managed using agile methodology; created an ERD, wireframe, and user stories; planned sprints; managed tasks via GitHub Issue Tracker & Projects tool
- A well-thought-through UI and vibe: friendly for multiple viewports; custom graphic design and branding

## Wireframe

![Rare Form Roasting Wireframe](RFRWireframe.png)

## ERD

![Rare Form Roasting ERD](RFRERD.png)

## Install

- In your terminal, run `git clone` + this repo's SSH while in your target directory.
- `cd` into the directory.

### Client front-end

- Ensure you have [Node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.
- navigate to client folder: `cd client`
- install dependencies: `npm install`

### Back-end

- Ensure you have [PostgreSQL](https://www.postgresql.org/download/) and [.NET](https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net80) installed.
- `cd` to the main project directory
- run `dotnet restore` to install dependencies
- run `dotnet user-secrets init` to initialize user secrets
- run the following, replacing YOURPASSWORDHERE with your PostgreSQL password. This will save the connection string to user secrets.
  - `dotnet user-secrets set RareFormRoastingDbConnectionString "Host=localhost;Port=5432;Username=postgres;Password=YOURPASSWORDHERE>;Database=RareFormRoasting"`
- create the database migration: `dotnet ef migrations add InitialCreate`
- create the database: `dotnet ef database update`

### Run the app

- In one terminal instance and while in the main project directory, run `dotnet run` (or, start the C# debugger in VSCode)
- In another terminal instance and while in the `client` directory, run `npm start`
- Admin user's login info:
  - david@rareformroasting.comx
  - roastingpassword
