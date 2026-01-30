# Backend API

A production-ready Node.js/TypeScript REST API with comprehensive testing, logging, and monitoring.

## 🚀 Features

- ✅ **TypeScript** - Full type safety with strict mode
- ✅ **Layered Architecture** - Controller → Service → Repository pattern
- ✅ **Dependency Injection** - Centralized DI container
- ✅ **Structured Logging** - Winston logger with correlation IDs
- ✅ **Comprehensive Testing** - Unit and integration tests with Jest
- ✅ **Security** - Environment-based secrets, secure cookies, password validation
- ✅ **Monitoring** - Health, readiness, and liveness endpoints
- ✅ **API Documentation** - Swagger/OpenAPI integration
- ✅ **Error Handling** - Custom error classes with proper status codes

## 📋 Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 12.x
- npm or yarn

## 🔧 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate up
```

## 🏃 Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run all tests in watch mode
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - System architecture and design patterns
- [Folder Structure](./docs/FOLDER_STRUCTURE.md) - Detailed folder organization
- [Coding Standards](./docs/CODING_STANDARDS.md) - Code conventions and best practices
- [Testing Guide](./docs/TESTING.md) - Testing strategy and guidelines
- [API Documentation](http://localhost:3001/api-docs) - Swagger UI (when running)

## 🌐 API Endpoints

### Health & Monitoring

- `GET /health` - Basic health check
- `GET /ready` - Readiness check (DB connectivity)
- `GET /alive` - Liveness check

### Authentication

- `POST /api/user/signup` - Register new user
- `POST /api/user/signin` - User login
- `POST /api/user/signout` - User logout
- `GET /api/user/currentuser` - Get current user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 📁 Project Structure

```
src/
├── config/          # Configuration files (logger, database)
├── container/       # Dependency injection container
├── controllers/     # HTTP request handlers
├── dtos/           # Data Transfer Objects
├── errors/         # Custom error classes
├── interfaces/     # TypeScript interfaces
├── middleware/     # Express middleware
├── repos/          # Data access layer
├── routes/         # API route definitions
├── services/       # Business logic layer
├── test/           # Test utilities and helpers
├── types/          # TypeScript type definitions
└── index.ts        # Application entry point
```

## 🔐 Environment Variables

```env
NODE_ENV=development
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=30d

# Cookie Configuration
COOKIE_EXPIRES_DAYS=30

# Logging
LOG_LEVEL=info
```

## 🏗️ Architecture

This application follows a **layered architecture** pattern:

1. **Controllers** - Handle HTTP requests/responses
2. **Services** - Contain business logic
3. **Repositories** - Handle data access
4. **DTOs** - Define data transfer objects

### Key Design Patterns

- **Repository Pattern** - Abstract data access
- **Service Layer** - Separate business logic
- **Dependency Injection** - Loose coupling
- **DTO Pattern** - Consistent API responses

## 🛡️ Security Features

- Environment-based configuration
- JWT authentication with secure cookies
- Password hashing with scrypt
- Strong password validation
- HTTP-only, secure, SameSite cookies
- Request validation with express-validator
- SQL injection protection (parameterized queries)

## 📊 Logging

- Winston logger with multiple transports
- Correlation IDs for request tracing
- Structured JSON logs for production
- Colorized console logs for development
- Automatic password redaction
- Error and exception handling

## 🧪 Testing Strategy

- **Unit Tests** - Service and business logic
- **Integration Tests** - API endpoints
- **Test Coverage** - 70% threshold
- **Mocks & Fixtures** - Test data generators
- **CI/CD Ready** - Automated test scripts

## 🚀 Deployment

```bash
# Build the application
npm run build

# Run migrations
npm run migrate up

# Start the server
NODE_ENV=production npm start
```

## 📈 Monitoring

The application exposes health check endpoints for Kubernetes/Docker:

- `/health` - Returns 200 if service is running
- `/ready` - Returns 200 if service is ready (DB connected)
- `/alive` - Returns 200 if service is alive

## 🤝 Contributing

1. Follow the [Coding Standards](./docs/CODING_STANDARDS.md)
2. Write tests for new features
3. Ensure all tests pass
4. Update documentation

## 📝 License

ISC

## 👤 Author

Sunip

---

**Built with ❤️ using Node.js, TypeScript, and PostgreSQL**
