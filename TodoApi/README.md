# Todo API (ASP.NET Core + EF Core + SQL Server)

A simple Todo REST API built with:
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Ready to connect with a React frontend

## Features
- Create, read, update, delete todos
- CORS enabled for frontend
- EF Core migrations for database versioning

## How to Run
1. Clone the repo
2. Update `appsettings.json` with your connection string
3. Run:
   ```bash
   dotnet ef database update
   dotnet run