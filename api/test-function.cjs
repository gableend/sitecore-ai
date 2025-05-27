module.exports = async function handler(req, res) {
  console.log('Test function called with method:', req.method);
  console.log('Test function environment check:', {
    nodeVersion: process.version,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    openAIKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({
      message: 'Test function is working!',
      timestamp: new Date().toISOString(),
      method: req.method,
      nodeVersion: process.version,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      environment: process.env.NODE_ENV || 'unknown'
    });
  } catch (error) {
    console.error('Test function error:', error);
    return res.status(500).json({
      error: 'Test function failed',
      message: error.message
    });
  }
};