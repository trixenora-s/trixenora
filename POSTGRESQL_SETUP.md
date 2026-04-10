# PostgreSQL Setup Guide

## ✅ Setup Status

Your PostgreSQL and Prisma setup is **complete and ready to use**!

### What's Configured:
- ✅ PostgreSQL database connection via Prisma ORM
- ✅ Prisma schema with user models
- ✅ Database seeding script
- ✅ Database commands in package.json
- ✅ Prisma Client generated

---

## 🚀 Quick Start

### 1. **Verify Setup**
```bash
npm run db:push
```
This pushes your Prisma schema to the database.

### 2. **Optional: Seed Database**
```bash
npm run db:seed
```
This creates demo users for testing.

### 3. **Start Development**
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Create a new migration |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |
| `npm run db:reset` | ⚠️ Reset entire database |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

---

## 🗄️ Database Connection

Your database configuration is in `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/trixenora?schema=public"
```

### Using Different Database Providers:

**PostgreSQL Local:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

**PostgreSQL Neon (Cloud):**
```
postgresql://user@region.neon.tech:5432/database?sslmode=require
```

**PostgreSQL Railway:**
```
postgresql://user:password@railway.app:5432/database
```

---

## 🔧 Prisma Features

### View Database in Prisma Studio
```bash
npm run db:studio
```
Opens a browser interface to view and edit database records.

### Create a Migration
```bash
npm run db:migrate
```
Use when you modify `prisma/schema.prisma`.

### Reset Database (Warning: Deletes All Data)
```bash
npm run db:reset
```

---

## 📊 Database Schema

Current models in `prisma/schema.prisma`:

- **User** - User accounts with authentication
- **Account** - OAuth/authentication providers
- **Session** - User sessions
- **VerificationToken** - Email verification tokens
- **Chat** - Chat conversations
- **Message** - Chat messages
- **ApiKey** - API keys for integrations

---

## 🐛 Troubleshooting

### "Connection refused"
- Check if your PostgreSQL service is running
- Verify `DATABASE_URL` in `.env.local`
- For local PostgreSQL:
  ```bash
  sudo systemctl start postgresql
  ```

### "Database does not exist"
- Prisma will create it automatically with `npm run db:push`
- Or manually:
  ```bash
  createdb trixenora
  ```

### "Migration failed"
- Check for syntax errors in `prisma/schema.prisma`
- Reset with caution:
  ```bash
  npm run db:reset
  ```

---

## 📚 Learning Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [Prisma Best Practices](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/working-with-prismaclient)

---

## ✨ Next Steps

1. ✅ Database setup complete
2. 🚀 Run `npm run dev` to start development
3. 📝 Modify `prisma/schema.prisma` for your models
4. 🔄 Run `npm run db:migrate` after schema changes
5. 🌱 Create seed data in `prisma/seed.ts`

**Happy coding!** 🎉
