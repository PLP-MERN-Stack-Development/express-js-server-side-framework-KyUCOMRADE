# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

# 🚂 Express.js RESTful API Assignment

This assignment focuses on building a **RESTful API** using Express.js, implementing proper routing, middleware, error handling, and advanced features like filtering, pagination, and search.

---

## 📘 1. Getting Started

### Prerequisites

- Node.js (v18 or higher)  
- npm or yarn  
- Postman, Insomnia, or curl for API testing  

### Installation

1. Clone your GitHub Classroom repository:  
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. Install dependencies:  
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:  
```bash
cp .env.example .env
```
You can optionally change the `AUTH_TOKEN` in `.env`.

4. Run the server:  
```bash
npm start
```

By default, the server runs on `http://localhost:3000`.

---

## 🔑 2. Authentication

Protected routes (`POST`, `PUT`, `DELETE`) require a Bearer token:

```
Authorization: Bearer <AUTH_TOKEN>
```

Default token (from `.env.example`):  
```
secret123
```

---

## 🧩 3. API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| GET | `/api/products` | Get all products (supports filtering, search, pagination) | ❌ |
| GET | `/api/products/:id` | Get a specific product by ID | ❌ |
| POST | `/api/products` | Create a new product | ✅ |
| PUT | `/api/products/:id` | Update a product | ✅ |
| DELETE | `/api/products/:id` | Delete a product | ✅ |
| GET | `/api/products/stats` | Get product statistics by category | ❌ |

---

## 📜 4. Examples of Requests and Responses

### 4.1 Get All Products

**Request:**  
```bash
GET /api/products
```

**Response:**  
```json
{
  "total": 3,
  "page": 1,
  "limit": 2,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    },
    {
      "id": "2",
      "name": "Smartphone",
      "description": "Latest model with 128GB storage",
      "price": 800,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 4.2 Filter or Search Products

**Filter by category:**  
```bash
GET /api/products?category=electronics
```

**Search by name:**  
```bash
GET /api/products?search=laptop
```

**Response:**  
```json
{
  "total": 1,
  "page": 1,
  "limit": 2,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 4.3 Create a New Product (Protected)

**Request:**  
```bash
POST /api/products
Authorization: Bearer secret123
Content-Type: application/json
```

**Body:**  
```json
{
  "name": "Tablet",
  "description": "Android tablet with 10-inch display",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

**Response:**  
```json
{
  "id": "b2a94b2e-7f23-4f9f-9a2b-34b23567f000",
  "name": "Tablet",
  "description": "Android tablet with 10-inch display",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

---

### 4.4 Update a Product (Protected)

**Request:**  
```bash
PUT /api/products/1
Authorization: Bearer secret123
Content-Type: application/json
```

**Body:**  
```json
{
  "price": 1300,
  "inStock": false
}
```

**Response:**  
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1300,
  "category": "electronics",
  "inStock": false
}
```

---

### 4.5 Delete a Product (Protected)

**Request:**  
```bash
DELETE /api/products/1
Authorization: Bearer secret123
```

**Response:**  
```json
{
  "message": "Product deleted successfully",
  "deleted": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### 4.6 Product Statistics

**Request:**  
```bash
GET /api/products/stats
```

**Response:**  
```json
{
  "electronics": 2,
  "kitchen": 1
}
```

---

## 📚 5. Resources

- [Express.js Documentation](https://expressjs.com/)  
- [RESTful API Design Best Practices](https://restfulapi.net/)  
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)  

---

## ✅ 6. Notes

- Ensure `.env` file is created with your secret token before testing protected routes.  
- Use Postman, Insomnia, or curl to test your endpoints.  
- All CRUD operations, filtering, search, pagination, and statistics endpoints are included for grading.
