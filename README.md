# Cache Services

A simple Express REST API for managing products using an in-memory caching layer. The API supports TTL-based cache expiry and automatically clears the cache whenever product data is modified.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express v5
* **Database:** JSON file (`db.json`) using `fs/promises`
* **Development Tool:** Nodemon

## Project Structure

```text
├── server.js                  # Application entry point
├── db.json                    # JSON-based database
├── routes/
│   └── productRoutes.js       # Route and middleware configuration
├── controllers/
│   └── productController.js   # Handles requests and responses
├── services/
│   └── productService.js      # Contains business logic
├── database/
│   └── db.js                  # Database file operations
└── middleware/
    ├── cache.js               # In-memory cache with TTL support
    └── invalidateCache.js     # Clears cache after data changes
```

## Request Flow

All requests follow a layered architecture:

```text
Route → Middleware → Controller → Service → Database
```

This keeps routing, request handling, business logic, database operations, and caching responsibilities separated.

## Caching Behaviour

The API uses an in-memory cache for product GET requests.

* Cache hits return responses with the `X-Cache: HIT` header.
* Cache misses return responses with the `X-Cache: MISS` header.
* Cached entries remain valid for **1 minute**.
* Expired entries are removed and fetched again from the database.
* Any successful `POST`, `PUT`, `PATCH`, or `DELETE` request clears the entire cache.
* Every cache entry stores a `createdAt` timestamp to track its age.

## API Endpoints

| Method   | Endpoint        | Description                 |
| -------- | --------------- | --------------------------- |
| `GET`    | `/products`     | Get all products            |
| `GET`    | `/products/:id` | Get a product by ID         |
| `POST`   | `/products`     | Create a new product        |
| `PUT`    | `/products/:id` | Replace an existing product |
| `PATCH`  | `/products/:id` | Update part of a product    |
| `DELETE` | `/products/:id` | Delete a product            |

## Requirements Checklist

| Requirement                                                                          | Status | Implementation                               |
| ------------------------------------------------------------------------------------ | ------ | -------------------------------------------- |
| Organize code into `routes`, `controllers`, `services`, `database`, and `middleware` | ✅      | Complete project structure                   |
| Cache `GET /products` and `GET /products/:id`                                        | ✅      | `middleware/cache.js` and product routes     |
| Implement caching as middleware                                                      | ✅      | `cacheMiddleware`                            |
| Invalidate cache after successful writes                                             | ✅      | `middleware/invalidateCache.js`              |
| Add `X-Cache: HIT` and `X-Cache: MISS` headers                                       | ✅      | `middleware/cache.js`                        |
| Set cache TTL to 1 minute                                                            | ✅      | `TTL_MS = 60 * 1000`                         |
| Store `createdAt` for cached values                                                  | ✅      | Cache entry timestamp                        |
| Check cached entries for expiry                                                      | ✅      | `isExpired()`                                |
| Re-fetch and refresh expired entries                                                 | ✅      | Controller fetches from DB and updates cache |
| Follow Route → Middleware → Controller → Service → Database flow                     | ✅      | Implemented throughout the API               |

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the server:

```bash
npm run server
```

The API will be available at:

```text
http://localhost:3000
```