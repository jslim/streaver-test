# Assumptions

# Next.js and Tailwind Setup
## Next.js Installation
- **framework**: The project uses Next.js as the framework for building the application. If Next.js is not already installed, you can add it with the following command:
  ```bash
    npx create-next-app@latest
  ```
  - 
- **tailwind**: Already comes within Next.js installation if selected. If not, you can adding with the following command:
  ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
  ```

## Prisma Configuration

### Environment Variables
- **`.env` file**: The project requires a `.env` file at the root level.
- **Database URL**:
  - The `.env` file must include the `DATABASE_URL` variable pointing to the database connection string.
  - Example:
    ```env
    DATABASE_URL="file:./dev.db"
    ```

### Database Provider
- The project uses **SQLite** as the database provider.
- The database connection is defined in the `schema.prisma` file:
  ```prisma
  datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
  }
  ```

### Database Initialization
- If the `dev.db` file does not exist, Prisma will automatically create it during the first migration.
- Run the following commands to set up the database:
  ```bash
  npx prisma format         # Format the schema
  npx prisma migrate dev --name init  # Create initial migration
  npx prisma generate       # Generate Prisma Client
  ```

### Validation and Debugging
- Use Prisma Studio to verify the database contents and relationships:
  ```bash
  npx prisma studio
  ```

## Dependencies

### Required Packages
- The project relies on `prisma` and `@prisma/client`.
- Ensure both packages are installed and use the same version.
  ```bash
  npm install prisma @prisma/client
  ```

### Reinstalling Dependencies
- If issues arise, delete `node_modules` and reinstall all dependencies:
  ```bash
  rm -rf node_modules
  npm install
  ```

## General Notes
- Always ensure migrations are properly formatted and applied before running queries.
- Prisma uses the configuration in `schema.prisma` and `.env` to interact with the database.

