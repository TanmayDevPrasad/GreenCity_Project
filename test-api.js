/**
 * API Testing Script for Green City Project
 * 
 * This script tests all API endpoints to ensure they are working correctly.
 * Run with: node test-api.js
 * 
 * Note: Make sure the backend server is running on http://localhost:5000
 */

const BASE_URL = 'http://localhost:5000';

// Test data
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  username: `testuser_${Date.now()}`,
  email: `test_${Date.now()}@example.com`,
  password: 'TestPassword123!'
};

const testOrganization = {
  organizationName: 'Test Organization',
  address: '123 Test Street',
  organizationId: `ORG_${Date.now()}`,
  email: `org_${Date.now()}@example.com`,
  phone: '+1234567890',
  password: 'OrgPassword123!'
};

let createdUserId = null;
let createdOrgId = null;
let createdIssueCode = null;

// Helper function to make API requests
async function apiRequest(method, endpoint, data = null, isFormData = false) {
  try {
    const options = {
      method,
      headers: {}
    };

    if (data && !isFormData) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    } else if (data && isFormData) {
      options.body = data;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const result = await response.json();
    
    return {
      status: response.status,
      ok: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

// Test functions
async function testUserSignup() {
  console.log('\n📝 Testing User Signup...');
  const result = await apiRequest('POST', '/user/signup', testUser);
  
  if (result.ok && result.data.user) {
    createdUserId = result.data.user._id;
    console.log('✅ User Signup: PASSED');
    console.log('   Created User ID:', createdUserId);
    return true;
  } else {
    console.log('❌ User Signup: FAILED');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

async function testUserLogin() {
  console.log('\n🔐 Testing User Login...');
  const result = await apiRequest('POST', '/user/login', {
    email: testUser.email,
    password: testUser.password
  });
  
  if (result.ok && result.data.user) {
    console.log('✅ User Login: PASSED');
    return true;
  } else {
    console.log('❌ User Login: FAILED');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

async function testOrgSignup() {
  console.log('\n📝 Testing Organization Signup...');
  const result = await apiRequest('POST', '/organization/signup', testOrganization);
  
  if (result.ok && result.data.organization) {
    createdOrgId = result.data.organization.organizationId;
    console.log('✅ Organization Signup: PASSED');
    console.log('   Created Org ID:', createdOrgId);
    return true;
  } else {
    console.log('❌ Organization Signup: FAILED');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

async function testOrgLogin() {
  console.log('\n🔐 Testing Organization Login...');
  const result = await apiRequest('POST', '/organization/login', {
    organizationId: testOrganization.organizationId,
    password: testOrganization.password
  });
  
  if (result.ok && result.data.organization) {
    console.log('✅ Organization Login: PASSED');
    return true;
  } else {
    console.log('❌ Organization Login: FAILED');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

async function testGetAllIssues() {
  console.log('\n📋 Testing Get All Issues...');
  const result = await apiRequest('GET', '/issue/issues');
  
  if (result.ok && Array.isArray(result.data)) {
    console.log('✅ Get All Issues: PASSED');
    console.log('   Found', result.data.length, 'issues');
    return true;
  } else {
    console.log('❌ Get All Issues: FAILED');
    console.log('   Status:', result.status);
    return false;
  }
}

async function testGetUserIssues() {
  console.log('\n👤 Testing Get User Issues...');
  if (!createdUserId) {
    console.log('⚠️  Skipped: No user ID available');
    return false;
  }
  
  const result = await apiRequest('GET', `/issue/issues/user/${createdUserId}`);
  
  if (result.ok && Array.isArray(result.data)) {
    console.log('✅ Get User Issues: PASSED');
    console.log('   Found', result.data.length, 'issues for user');
    return true;
  } else {
    console.log('❌ Get User Issues: FAILED');
    console.log('   Status:', result.status);
    return false;
  }
}

async function testCreateTransportEntry() {
  console.log('\n🚌 Testing Create Transport Entry...');
  const transportData = {
    agencyName: 'Test Transit Co',
    transportType: 'Bus',
    from: 'Downtown Station',
    to: 'Airport Terminal',
    departureTimes: ['08:00', '10:00', '12:00'],
    frequency: '3',
    fare: 25,
    contactInfo: '+1234567890'
  };
  
  const result = await apiRequest('POST', '/entry/submit', transportData);
  
  if (result.ok && result.data.data) {
    console.log('✅ Create Transport Entry: PASSED');
    return true;
  } else {
    console.log('❌ Create Transport Entry: FAILED');
    console.log('   Status:', result.status);
    console.log('   Response:', result.data);
    return false;
  }
}

async function testGetAllTransports() {
  console.log('\n🚍 Testing Get All Transports...');
  const result = await apiRequest('GET', '/entry/all');
  
  if (result.ok && Array.isArray(result.data)) {
    console.log('✅ Get All Transports: PASSED');
    console.log('   Found', result.data.length, 'transport entries');
    return true;
  } else {
    console.log('❌ Get All Transports: FAILED');
    console.log('   Status:', result.status);
    return false;
  }
}

async function testQueryTransport() {
  console.log('\n🔍 Testing Query Transport...');
  const result = await apiRequest('POST', '/query/transport', {
    from: 'Downtown Station',
    to: 'Airport Terminal'
  });
  
  if (result.ok) {
    console.log('✅ Query Transport: PASSED');
    if (result.data.data && result.data.data.length > 0) {
      console.log('   Found', result.data.data.length, 'matching routes');
    } else {
      console.log('   No matching routes found (this is OK if no data exists)');
    }
    return true;
  } else {
    console.log('❌ Query Transport: FAILED');
    console.log('   Status:', result.status);
    return false;
  }
}

async function testGetUserRankings() {
  console.log('\n🏆 Testing Get User Rankings...');
  const result = await apiRequest('GET', '/userrank/rankings');
  
  if (result.ok && Array.isArray(result.data)) {
    console.log('✅ Get User Rankings: PASSED');
    console.log('   Found', result.data.length, 'ranked users');
    return true;
  } else {
    console.log('❌ Get User Rankings: FAILED');
    console.log('   Status:', result.status);
    return false;
  }
}

async function testGetOrgRankings() {
  console.log('\n🏢 Testing Get Organization Rankings...');
  const result = await apiRequest('GET', '/organizationrank/rankings');
  
  if (result.ok && Array.isArray(result.data)) {
    console.log('✅ Get Organization Rankings: PASSED');
    console.log('   Found', result.data.length, 'ranked organizations');
    return true;
  } else {
    console.log('❌ Get Organization Rankings: FAILED');
    console.log('   Status:', result.status);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting API Tests for Green City Project');
  console.log('=' .repeat(50));
  
  const results = {
    passed: 0,
    failed: 0,
    skipped: 0
  };
  
  // Authentication tests
  const userSignup = await testUserSignup();
  results[userSignup ? 'passed' : 'failed']++;
  
  const userLogin = await testUserLogin();
  results[userLogin ? 'passed' : 'failed']++;
  
  const orgSignup = await testOrgSignup();
  results[orgSignup ? 'passed' : 'failed']++;
  
  const orgLogin = await testOrgLogin();
  results[orgLogin ? 'passed' : 'failed']++;
  
  // Issue tests
  const getAllIssues = await testGetAllIssues();
  results[getAllIssues ? 'passed' : 'failed']++;
  
  const getUserIssues = await testGetUserIssues();
  results[getUserIssues ? 'passed' : 'failed']++;
  
  // Transport tests
  const createTransport = await testCreateTransportEntry();
  results[createTransport ? 'passed' : 'failed']++;
  
  const getAllTransports = await testGetAllTransports();
  results[getAllTransports ? 'passed' : 'failed']++;
  
  const queryTransport = await testQueryTransport();
  results[queryTransport ? 'passed' : 'failed']++;
  
  // Ranking tests
  const getUserRankings = await testGetUserRankings();
  results[getUserRankings ? 'passed' : 'failed']++;
  
  const getOrgRankings = await testGetOrgRankings();
  results[getOrgRankings ? 'passed' : 'failed']++;
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary:');
  console.log('   ✅ Passed:', results.passed);
  console.log('   ❌ Failed:', results.failed);
  console.log('   ⚠️  Skipped:', results.skipped);
  console.log('   Total Tests:', results.passed + results.failed + results.skipped);
  console.log('='.repeat(50));
  
  if (results.failed === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above.');
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ Error: fetch is not available. Please use Node.js 18+ or install node-fetch.');
  process.exit(1);
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

