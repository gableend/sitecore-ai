const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Precomputed embeddings for hot topics and digital visionaries
const contentEmbeddings = [
  {
    title: "The Future of Search: From Keywords to Conversations",
    type: "hot-topic",
    description: "Explore how AI is transforming search from traditional keyword matching to intelligent, conversational experiences that understand context and intent.",
    tags: ["AI", "Search", "Conversational UI", "Natural Language"],
    embedding: [-0.02, 0.15, -0.08, 0.25, -0.12, 0.09, 0.18, -0.05, 0.22, -0.14]
  },
  {
    title: "Experience Agents: Your Digital Workforce",
    type: "hot-topic", 
    description: "Discover how autonomous AI agents are revolutionizing customer experiences by handling complex tasks, providing personalized recommendations, and creating seamless digital journeys.",
    tags: ["AI Agents", "Automation", "Customer Experience", "Personalization"],
    embedding: [0.11, -0.07, 0.19, -0.03, 0.16, -0.21, 0.08, 0.13, -0.09, 0.24]
  },
  {
    title: "Dynamic Content at Scale",
    type: "hot-topic",
    description: "Learn how AI enables real-time content generation and adaptation, creating personalized experiences for millions of users simultaneously.",
    tags: ["Content Generation", "Scalability", "Real-time", "Personalization"],
    embedding: [-0.06, 0.23, -0.11, 0.17, -0.04, 0.19, -0.15, 0.07, 0.21, -0.18]
  },
  {
    title: "AI-Scale Personalization",
    type: "hot-topic",
    description: "Understand how machine learning algorithms create hyper-personalized experiences by analyzing user behavior, preferences, and context in real-time.",
    tags: ["Machine Learning", "Personalization", "User Behavior", "Analytics"],
    embedding: [0.08, -0.14, 0.26, -0.09, 0.12, -0.07, 0.20, -0.16, 0.05, 0.18]
  },
  {
    title: "Conversational UX Design",
    type: "hot-topic",
    description: "Master the principles of designing intuitive conversational interfaces that feel natural and provide value through AI-powered interactions.",
    tags: ["UX Design", "Conversational AI", "Interface Design", "User Experience"],
    embedding: [-0.13, 0.09, -0.05, 0.21, -0.17, 0.14, -0.08, 0.25, -0.11, 0.06]
  },
  {
    title: "Generative Advertising Revolution",
    type: "hot-topic",
    description: "Explore how AI generates personalized advertisements in real-time, optimizing for individual preferences and contextual relevance.",
    tags: ["Generative AI", "Advertising", "Marketing", "Personalization"],
    embedding: [0.15, -0.19, 0.08, -0.12, 0.23, -0.06, 0.11, -0.07, 0.19, -0.14]
  },
  {
    title: "Sarah Chen",
    type: "visionary",
    role: "Chief AI Officer at TechNova",
    description: "Pioneer in conversational AI and natural language processing. Sarah has led breakthrough research in making AI interactions more human-like and intuitive.",
    expertise: ["Conversational AI", "NLP", "Human-Computer Interaction"],
    embedding: [0.12, -0.08, 0.17, -0.04, 0.21, -0.13, 0.09, 0.16, -0.11, 0.07]
  },
  {
    title: "Marcus Rodriguez",
    type: "visionary",
    role: "VP of Digital Innovation at GlobalRetail",
    description: "Transformation leader who has revolutionized e-commerce through AI-powered personalization and predictive analytics.",
    expertise: ["E-commerce AI", "Predictive Analytics", "Digital Transformation"],
    embedding: [-0.09, 0.24, -0.15, 0.08, -0.06, 0.19, -0.12, 0.14, 0.05, -0.18]
  },
  {
    title: "Dr. Amara Okafor",
    type: "visionary",
    role: "Director of AI Research at FutureScience Labs",
    description: "Renowned researcher in generative AI and autonomous systems, pioneering ethical AI frameworks for enterprise applications.",
    expertise: ["Generative AI", "Autonomous Systems", "AI Ethics"],
    embedding: [0.07, -0.16, 0.22, -0.11, 0.15, -0.08, 0.18, -0.05, 0.12, 0.09]
  },
  {
    title: "James Kim",
    type: "visionary",
    role: "Head of Experience Design at NextGen Media",
    description: "Creative technologist specializing in immersive digital experiences and AI-driven content personalization.",
    expertise: ["Experience Design", "Content Personalization", "Immersive Technology"],
    embedding: [-0.14, 0.11, -0.07, 0.20, -0.09, 0.16, -0.13, 0.08, 0.23, -0.12]
  }
];

// Cosine similarity function
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return 0;
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'OpenAI API key not configured',
          results: contentEmbeddings.slice(0, 3) // Return some sample results
        })
      };
    }

    const { query } = JSON.parse(event.body || '{}');
    
    if (!query) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Query is required' })
      };
    }

    // Get embedding for the query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Calculate similarities and rank results
    const results = contentEmbeddings.map(item => ({
      ...item,
      similarity: cosineSimilarity(queryEmbedding, item.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map(({ embedding, ...item }) => item); // Remove embedding from response

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ results })
    };

  } catch (error) {
    console.error('Semantic search error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};