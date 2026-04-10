# Database Setup Instructions

## Option 1: Local PostgreSQL (Development)

### Prerequisites
- PostgreSQL installed locally
- psql CLI available

### Steps

1. **Create local database:**
   ```bash
   createdb trixenora
   ```

2. **Verify connection:**
   ```bash
   psql -U postgres -d trixenora -c "SELECT 1;"
   ```

3. **Push schema to database:**
   ```bash
   npx prisma db push
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

---

## Option 2: Neon PostgreSQL (Cloud Database)

### Prerequisites
- Neon account (https://console.neon.tech)
- Free tier available

### Steps

1. **Create Neon project:**
   - Go to https://console.neon.tech
   - Create a new project
   - Copy the connection string

2. **Update `.env.local`:**
   ```bash
   # In .env.local, replace:
   DATABASE_URL="your-neon-connection-string-here"
   ```

3. **Push schema to database:**
   ```bash
   npx prisma db push
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

---

## Option 3: Docker PostgreSQL

### Prerequisites
- Docker installed

### Steps

1. **Run PostgreSQL container:**
   ```bash
   docker run --name trixenora-postgres \
     -e POSTGRES_DB=trixenora \
     -e POSTGRES_PASSWORD=password \
     -p 5432:5432 \
     -d postgres:latest
   ```

2. **Push schema:**
   ```bash
   npx prisma db push
   ```

---

## Troubleshooting

### If you get "Connection refused"
- Check if PostgreSQL is running
- Verify DATABASE_URL is correct
- For Docker: `docker ps` to confirm container is running

### If you get "database does not exist"
- Change DATABASE_URL to create database automatically:
  ```
  DATABASE_URL="postgresql://postgres:password@localhost:5432/trixenora?schema=public"
  ```

### Reset database
```bash
npx prisma migrate reset
```

---

## Next Steps

After setting up the database:

1. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open Prisma Studio (optional):**
   ```bash
   npx prisma studio
   ```
