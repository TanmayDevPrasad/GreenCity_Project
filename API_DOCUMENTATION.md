# Green City API Documentation

**Base URL:** `http://localhost:5000`

This document provides comprehensive API documentation for the Green City project, including all endpoints, request/response formats, and example data.

---

## Table of Contents

1. [Authentication APIs](#authentication-apis)
   - [User Signup](#user-signup)
   - [User Login](#user-login)
   - [Organization Signup](#organization-signup)
   - [Organization Login](#organization-login)

2. [Issue APIs](#issue-apis)
   - [Report Issue](#report-issue)
   - [Get All Issues](#get-all-issues)
   - [Get User Issues](#get-user-issues)

3. [Transport APIs](#transport-apis)
   - [Create Transport Entry](#create-transport-entry)
   - [Get All Transport Entries](#get-all-transport-entries)
   - [Query Transport](#query-transport)

4. [Ranking APIs](#ranking-apis)
   - [Get User Rankings](#get-user-rankings)
   - [Get Organization Rankings](#get-organization-rankings)

5. [Issue Solved API](#issue-solved-api)
   - [Mark Issue as Solved](#mark-issue-as-solved)

---

## Authentication APIs

### User Signup

Create a new user account.

**Endpoint:** `POST /user/signup`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john.doe@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "User already exists"
}
```

**Error Response (500):**
```json
{
  "error": "Internal server error"
}
```

---

### User Login

Authenticate a user and get user information.

**Endpoint:** `POST /user/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john.doe@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Invalid credentials"
}
```

---

### Organization Signup

Create a new organization account.

**Endpoint:** `POST /organization/signup`

**Request Body:**
```json
{
  "organizationName": "Green Solutions Inc",
  "address": "123 Eco Street, Green City, 10001",
  "organizationId": "ORG001",
  "email": "contact@greensolutions.com",
  "phone": "+1234567890",
  "password": "OrgSecurePass123!"
}
```

**Success Response (201):**
```json
{
  "message": "Organization registered successfully",
  "organization": {
    "_id": "507f1f77bcf86cd799439012",
    "organizationName": "Green Solutions Inc",
    "organizationId": "ORG001",
    "email": "contact@greensolutions.com",
    "phone": "+1234567890"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Organization already exists"
}
```

---

### Organization Login

Authenticate an organization and get organization information.

**Endpoint:** `POST /organization/login`

**Request Body:**
```json
{
  "organizationId": "ORG001",
  "password": "OrgSecurePass123!"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "organization": {
    "_id": "507f1f77bcf86cd799439012",
    "organizationName": "Green Solutions Inc",
    "organizationId": "ORG001",
    "email": "contact@greensolutions.com",
    "phone": "+1234567890"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Organization not found"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## Issue APIs

### Report Issue

Report a new city issue with an image.

**Endpoint:** `POST /issue/issue`

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**
```
username: johndoe
title: Broken Street Light
description: The street light at Main Street and 5th Avenue is broken and needs repair.
location: Main Street and 5th Avenue, Downtown
image: [File Upload - Image]
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/issue/issue \
  -F "username=johndoe" \
  -F "title=Broken Street Light" \
  -F "description=The street light at Main Street and 5th Avenue is broken and needs repair." \
  -F "location=Main Street and 5th Avenue, Downtown" \
  -F "image=@/path/to/image.jpg"
```

**Success Response (201):**
```json
{
  "message": "Issue reported successfully",
  "issue": {
    "_id": "507f1f77bcf86cd799439013",
    "username": "johndoe",
    "title": "Broken Street Light",
    "description": "The street light at Main Street and 5th Avenue is broken and needs repair.",
    "location": "Main Street and 5th Avenue, Downtown",
    "image": "/uploads/1234567890-987654321.jpg",
    "issueCode": "123456"
  }
}
```

**Error Response (400):**
```json
{
  "error": "All fields are required"
}
```

**Error Response (400):**
```json
{
  "error": "Image is required"
}
```

**Error Response (404):**
```json
{
  "error": "User not found"
}
```

---

### Get All Issues

Retrieve all reported issues.

**Endpoint:** `GET /issue/issues`

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "username": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    },
    "title": "Broken Street Light",
    "description": "The street light at Main Street and 5th Avenue is broken and needs repair.",
    "location": "Main Street and 5th Avenue, Downtown",
    "image": "/uploads/1234567890-987654321.jpg",
    "issueCode": "123456",
    "createdAt": "2025-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "username": {
      "_id": "507f1f77bcf86cd799439015",
      "username": "janedoe",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com"
    },
    "title": "Pothole on Highway",
    "description": "Large pothole on Highway 101 near exit 5.",
    "location": "Highway 101, Exit 5",
    "image": "/uploads/1234567891-987654322.jpg",
    "issueCode": "234567",
    "createdAt": "2025-01-15T11:00:00.000Z"
  }
]
```

---

### Get User Issues

Retrieve all issues reported by a specific user.

**Endpoint:** `GET /issue/issues/user/:userId`

**URL Parameters:**
- `userId` (string, required): The MongoDB ObjectId of the user

**Example Request:**
```
GET /issue/issues/user/507f1f77bcf86cd799439011
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "username": "507f1f77bcf86cd799439011",
    "title": "Broken Street Light",
    "description": "The street light at Main Street and 5th Avenue is broken and needs repair.",
    "location": "Main Street and 5th Avenue, Downtown",
    "image": "/uploads/1234567890-987654321.jpg",
    "issueCode": "123456",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
]
```

**Error Response (500):**
```json
{
  "error": "Error fetching user issues",
  "details": "Error message details"
}
```

---

## Transport APIs

### Create Transport Entry

Add a new transport route entry.

**Endpoint:** `POST /entry/submit`

**Request Body:**
```json
{
  "agencyName": "Green Transit Co",
  "transportType": "Bus",
  "from": "Downtown Station",
  "to": "Airport Terminal",
  "departureTimes": ["08:00", "10:00", "12:00", "14:00", "16:00"],
  "frequency": "5",
  "fare": 25,
  "contactInfo": "+1234567890 or info@greentransit.com"
}
```

**Success Response (201):**
```json
{
  "message": "Transport option created successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "agencyName": "Green Transit Co",
    "transportType": "Bus",
    "from": "Downtown Station",
    "to": "Airport Terminal",
    "departureTimes": ["08:00", "10:00", "12:00", "14:00", "16:00"],
    "frequency": "5",
    "fare": 25,
    "contactInfo": "+1234567890 or info@greentransit.com",
    "createdAt": "2025-01-15T12:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Please provide all required fields."
}
```

**Error Response (400):**
```json
{
  "message": "departureTimes must be a non-empty array."
}
```

---

### Get All Transport Entries

Retrieve all transport route entries.

**Endpoint:** `GET /entry/all`

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439016",
    "agencyName": "Green Transit Co",
    "transportType": "Bus",
    "from": "Downtown Station",
    "to": "Airport Terminal",
    "departureTimes": ["08:00", "10:00", "12:00", "14:00", "16:00"],
    "frequency": "5",
    "fare": 25,
    "contactInfo": "+1234567890 or info@greentransit.com",
    "createdAt": "2025-01-15T12:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439017",
    "agencyName": "Eco Metro",
    "transportType": "Metro",
    "from": "Central Station",
    "to": "University Campus",
    "departureTimes": ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
    "frequency": "6",
    "fare": 15,
    "contactInfo": "+1234567891",
    "createdAt": "2025-01-15T13:00:00.000Z"
  }
]
```

---

### Query Transport

Search for transport options between two locations.

**Endpoint:** `POST /query/transport`

**Request Body:**
```json
{
  "from": "Downtown Station",
  "to": "Airport Terminal"
}
```

**Success Response (200):**
```json
{
  "message": "Transport options found.",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "agencyName": "Green Transit Co",
      "transportType": "Bus",
      "from": "Downtown Station",
      "to": "Airport Terminal",
      "departureTimes": ["08:00", "10:00", "12:00", "14:00", "16:00"],
      "frequency": "5",
      "fare": 25,
      "contactInfo": "+1234567890 or info@greentransit.com"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "message": "Both \"from\" and \"to\" fields are required."
}
```

**Error Response (404):**
```json
{
  "message": "No transport options found for the given route."
}
```

---

## Ranking APIs

### Get User Rankings

Get leaderboard of all users ranked by their contribution score.

**Endpoint:** `GET /userrank/rankings`

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "points": 150,
    "issuecount": 5,
    "score": 120.0,
    "rank": 1
  },
  {
    "_id": "507f1f77bcf86cd799439015",
    "username": "janedoe",
    "points": 100,
    "issuecount": 4,
    "score": 82.0,
    "rank": 2
  },
  {
    "_id": "507f1f77bcf86cd799439018",
    "username": "bobsmith",
    "points": 50,
    "issuecount": 2,
    "score": 41.0,
    "rank": 3
  }
]
```

**Note:** Score is calculated as: `(points * 0.7) + (issuecount * 0.3)`

**Error Response (500):**
```json
{
  "message": "Error fetching rankings",
  "error": "Error message details"
}
```

---

### Get Organization Rankings

Get leaderboard of all organizations ranked by issues solved.

**Endpoint:** `GET /organizationrank/rankings`

**Success Response (200):**
```json
[
  {
    "rank": 1,
    "organizationName": "Green Solutions Inc",
    "organizationId": "ORG001",
    "issuesolved": 25,
    "email": "contact@greensolutions.com",
    "phone": "+1234567890"
  },
  {
    "rank": 2,
    "organizationName": "Eco Clean Services",
    "organizationId": "ORG002",
    "issuesolved": 18,
    "email": "info@ecoclean.com",
    "phone": "+1234567891"
  },
  {
    "rank": 3,
    "organizationName": "City Maintenance Corp",
    "organizationId": "ORG003",
    "issuesolved": 12,
    "email": "contact@citymaintenance.com",
    "phone": "+1234567892"
  }
]
```

**Error Response (500):**
```json
{
  "message": "Failed to fetch organization rankings",
  "error": "Error message details"
}
```

---

## Issue Solved API

### Mark Issue as Solved

Mark an issue as solved by an organization. This will:
- Create an IssueSolved entry
- Delete the issue from the Issue collection
- Increment the organization's issuesolved count
- Award 50 points to the user who reported the issue

**Endpoint:** `POST /issuesolved/solve`

**Request Body:**
```json
{
  "issueCode": "123456",
  "solvedBy": "ORG001",
  "IssueSolved": true
}
```

**Success Response (200):**
```json
{
  "message": "Issue marked as solved, user rewarded, and issue deleted",
  "issueSolved": {
    "_id": "507f1f77bcf86cd799439019",
    "issueCode": "123456",
    "solvedBy": "ORG001",
    "username": "507f1f77bcf86cd799439011",
    "IssueSolved": true,
    "createdAt": "2025-01-15T14:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "issueCode and organizationId (solvedBy) are required"
}
```

**Error Response (404):**
```json
{
  "message": "Issue not found"
}
```

**Error Response (404):**
```json
{
  "message": "Organization not found"
}
```

**Error Response (400):**
```json
{
  "message": "Issue already marked as solved."
}
```

---

## Image Upload

### Image Requirements

- **Format:** JPEG, PNG, GIF, or any image format
- **Max Size:** 5MB
- **Field Name:** `image`
- **Content-Type:** `multipart/form-data`

### Accessing Uploaded Images

Uploaded images are served statically at:
```
http://localhost:5000/uploads/{filename}
```

**Example:**
```
http://localhost:5000/uploads/1234567890-987654321.jpg
```

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input or missing required fields |
| 401 | Unauthorized - Invalid credentials |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Testing APIs

### Using cURL

**User Signup:**
```bash
curl -X POST http://localhost:5000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }'
```

**Report Issue:**
```bash
curl -X POST http://localhost:5000/issue/issue \
  -F "username=johndoe" \
  -F "title=Broken Street Light" \
  -F "description=The street light is broken" \
  -F "location=Main Street" \
  -F "image=@/path/to/image.jpg"
```

**Get All Issues:**
```bash
curl -X GET http://localhost:5000/issue/issues
```

### Using Postman

1. Import the collection (if available)
2. Set base URL to `http://localhost:5000`
3. For file uploads, use form-data with key `image` and type `File`

### Using JavaScript (Fetch API)

**User Login Example:**
```javascript
fetch('http://localhost:5000/user/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'SecurePassword123!'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**Report Issue Example:**
```javascript
const formData = new FormData();
formData.append('username', 'johndoe');
formData.append('title', 'Broken Street Light');
formData.append('description', 'The street light is broken');
formData.append('location', 'Main Street');
formData.append('image', fileInput.files[0]);

fetch('http://localhost:5000/issue/issue', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## Notes

1. **CORS:** The API is configured to accept requests from `http://localhost:5173` (Vite dev server) and `http://localhost:3000`.

2. **Authentication:** Currently, the API does not use JWT tokens. User/organization data is managed on the frontend using localStorage.

3. **Image Storage:** Images are stored in the `backend/uploads` directory and served statically.

4. **Database:** MongoDB is used as the database. Ensure MongoDB is running before starting the server.

5. **Environment Variables:** 
   - `PORT`: Server port (default: 5000)
   - `MONGO_URI`: MongoDB connection string (default: `mongodb://127.0.0.1:27017/greencity_project`)

---

## Testing APIs

### Automated Testing

A test script is provided to verify all API endpoints are working correctly.

**Prerequisites:**
- Node.js 18+ (for built-in fetch support)
- Backend server running on `http://localhost:5000`
- MongoDB running and connected

**Run the test script:**
```bash
node test-api.js
```

The script will:
- Test all authentication endpoints (user & organization signup/login)
- Test issue endpoints (get all, get user issues)
- Test transport endpoints (create, get all, query)
- Test ranking endpoints (user & organization rankings)
- Provide a summary of passed/failed tests

**Expected Output:**
```
🚀 Starting API Tests for Green City Project
==================================================

📝 Testing User Signup...
✅ User Signup: PASSED
   Created User ID: 507f1f77bcf86cd799439011

🔐 Testing User Login...
✅ User Login: PASSED

...

📊 Test Summary:
   ✅ Passed: 11
   ❌ Failed: 0
   ⚠️  Skipped: 0
   Total Tests: 11

🎉 All tests passed!
```

### Manual Testing Checklist

- [ ] User Signup - Create a new user account
- [ ] User Login - Authenticate with email and password
- [ ] Organization Signup - Create a new organization
- [ ] Organization Login - Authenticate with organizationId and password
- [ ] Report Issue - Submit an issue with image (requires user to be logged in)
- [ ] Get All Issues - Retrieve all reported issues
- [ ] Get User Issues - Get issues for a specific user
- [ ] Create Transport Entry - Add a new transport route
- [ ] Get All Transports - Retrieve all transport entries
- [ ] Query Transport - Search for routes between locations
- [ ] Get User Rankings - View leaderboard
- [ ] Get Organization Rankings - View organization leaderboard
- [ ] Mark Issue as Solved - Resolve an issue (requires organization login)

---

## Support

For issues or questions, please check the project repository or contact the development team.

**Last Updated:** January 2025

