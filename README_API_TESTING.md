# API Testing Guide

This guide explains how to test all APIs in the Green City project.

## Quick Start

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The server should be running on `http://localhost:5000`

2. **Run the automated test script:**
   ```bash
   node test-api.js
   ```

## Prerequisites

- Node.js 18 or higher (for built-in `fetch` support)
- MongoDB running locally or accessible
- Backend server running on port 5000

## Test Script Features

The `test-api.js` script automatically tests:

### Authentication APIs
- ✅ User Signup
- ✅ User Login
- ✅ Organization Signup
- ✅ Organization Login

### Issue APIs
- ✅ Get All Issues
- ✅ Get User Issues (requires user signup first)

### Transport APIs
- ✅ Create Transport Entry
- ✅ Get All Transport Entries
- ✅ Query Transport

### Ranking APIs
- ✅ Get User Rankings
- ✅ Get Organization Rankings

## What the Script Does

1. Creates test users and organizations with unique IDs
2. Tests authentication endpoints
3. Tests data retrieval endpoints
4. Provides a summary of all test results

## Understanding Test Results

### ✅ Passed
The endpoint is working correctly and returned the expected response.

### ❌ Failed
The endpoint returned an error or unexpected response. Check:
- Is the backend server running?
- Is MongoDB connected?
- Are there any errors in the server console?

### ⚠️ Skipped
The test was skipped because a prerequisite wasn't met (e.g., no user ID available).

## Manual Testing

For manual testing, you can use:

1. **Postman** - Import the API collection
2. **cURL** - Use the examples in `API_DOCUMENTATION.md`
3. **Browser** - Use the frontend application
4. **JavaScript** - Use fetch API in browser console

## Troubleshooting

### "fetch is not available"
- **Solution:** Upgrade to Node.js 18+ or install `node-fetch`:
  ```bash
  npm install node-fetch
  ```
  Then modify `test-api.js` to import fetch:
  ```javascript
  import fetch from 'node-fetch';
  ```

### "Connection refused"
- **Solution:** Make sure the backend server is running on port 5000

### "MongoDB connection error"
- **Solution:** 
  - Check if MongoDB is running
  - Verify the connection string in `.env` or `server.js`
  - Default: `mongodb://127.0.0.1:27017/greencity_project`

### Tests fail but server seems fine
- Check the server console for error messages
- Verify MongoDB has the required collections
- Ensure CORS is properly configured

## Testing Specific Endpoints

### Test User Signup Only
```javascript
const result = await apiRequest('POST', '/user/signup', {
  firstName: 'Test',
  lastName: 'User',
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
});
console.log(result);
```

### Test Issue Reporting (requires image file)
Use Postman or the frontend application, as it requires multipart/form-data with file upload.

## Next Steps

After running tests:
1. Review the test output
2. Check `API_DOCUMENTATION.md` for detailed endpoint information
3. Use the frontend application to test the full user flow
4. Report any issues found during testing

---

**Note:** The test script creates test data that may remain in your database. You can manually clean it up if needed.

