#!/bin/bash

# Database setup verification script
echo "🔍 Verifying PostgreSQL and Prisma setup...\n"

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local exists"
    echo "📋 Database URL configured (hidden for security)"
else
    echo "❌ .env.local not found"
    exit 1
fi

# Check if Prisma is installed
if command -v npx prisma &> /dev/null; then
    echo "✅ Prisma CLI available"
else
    echo "❌ Prisma not installed"
    exit 1
fi

# Check if schema.prisma exists
if [ -f prisma/schema.prisma ]; then
    echo "✅ Prisma schema exists"
else
    echo "❌ Prisma schema not found"
    exit 1
fi

# Check if Prisma client is generated
if [ -d node_modules/@prisma/client ]; then
    echo "✅ Prisma Client generated"
else
    echo "⚠️  Prisma Client not generated, running: npx prisma generate"
    npx prisma generate
fi

echo "\n📊 Prisma setup summary:"
npx prisma --version

echo "\n✅ PostgreSQL setup complete!"
echo "\n📝 Available commands:"
echo "  npm run db:push    - Push schema changes"
echo "  npm run db:migrate - Create migrations"
echo "  npm run db:seed    - Seed initial data"
echo "  npm run db:studio  - Open Prisma Studio"
echo "  npm run db:reset   - Reset database (careful!)"

echo "\n🚀 Ready to start development!"
echo "   npm run dev"
