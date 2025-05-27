const handler = require('./api/semantic-search.cjs');

// Mock request and response objects
const mockReq = {
  method: 'POST',
  body: {
    query: 'AI personalization',
    limit: 3
  }
};

const mockRes = {
  setHeader: (key, value) => console.log('Header set:', key, '=', value),
  status: (code) => ({
    json: (data) => {
      console.log('Response status:', code);
      console.log('Response data:', JSON.stringify(data, null, 2));
      return mockRes;
    },
    end: () => {
      console.log('Response ended with status:', code);
      return mockRes;
    }
  })
};

async function testSemanticSearch() {
  console.log('Testing semantic search function...');
  console.log('Environment check:');
  console.log('- OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
  console.log('- OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
  console.log('- Node version:', process.version);
  
  try {
    await handler(mockReq, mockRes);
  } catch (error) {
    console.error('Handler error:', error);
    console.error('Stack trace:', error.stack);
  }
}

testSemanticSearch();
EOF  
cd /home/project && cd sitecore-ai && cat > test-semantic-search.cjs << 'EOF'
const handler = require('./api/semantic-search.cjs');

// Mock request and response objects
const mockReq = {
  method: 'POST',
  body: {
    query: 'AI personalization',
    limit: 3
  }
};

const mockRes = {
  setHeader: (key, value) => console.log('Header set:', key, '=', value),
  status: (code) => ({
    json: (data) => {
      console.log('Response status:', code);
      console.log('Response data:', JSON.stringify(data, null, 2));
      return mockRes;
    },
    end: () => {
      console.log('Response ended with status:', code);
      return mockRes;
    }
  })
};

async function testSemanticSearch() {
  console.log('Testing semantic search function...');
  console.log('Environment check:');
  console.log('- OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
  console.log('- OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
  console.log('- Node version:', process.version);
  
  try {
    await handler(mockReq, mockRes);
  } catch (error) {
    console.error('Handler error:', error);
    console.error('Stack trace:', error.stack);
  }
}

testSemanticSearch();
