const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const contentEmbeddings = {
  "personalization-ai-scale": {
    id: "personalization-ai-scale",
    title: "Personalization at AI Scale",
    description: "Delivering tailored, individual experiences efficiently at scale",
    content: "Personalization at AI Scale. Delivering tailored, individual experiences efficiently at scale through advanced AI-driven personalization that adapts in real-time to user behavior and preferences. Our platform leverages machine learning algorithms to create unique experiences for every visitor. Key Benefits: Real-time Adaptation, Enterprise Scale, Predictive Intelligence, Cross-channel Consistency. Implementation Strategy: Data Collection, AI Processing, Content Orchestration, Continuous Learning.",
    embedding: null,
    type: "hot_topic",
    image: "/images/ai-scale-personalization.webp"
  },
  "content-transformation": {
    id: "content-transformation",
    title: "Content Transformation",
    description: "Dynamically adapting content for multiple contexts and channels",
    content: "Content Transformation. Dynamically adapting content for multiple contexts and channels to ensure maximum impact and relevance across all touchpoints. Core Capabilities: Multi-format Adaptation, Context-aware Delivery, Real-time Optimization, Brand Consistency. Use Cases: Cross-channel Marketing, Localization, Device Optimization, Audience Segmentation.",
    embedding: null,
    type: "hot_topic",
    image: "/images/dynamic-content.webp"
  },
  "conversational-ux": {
    id: "conversational-ux",
    title: "Conversational UX",
    description: "Creating natural, engaging user interactions through chat and voice",
    content: "Conversational UX. Revolutionize how users interact with your digital platforms through natural language processing and conversational AI interfaces. Core Components: Natural Language Understanding, Context Awareness, Multi-modal Interactions, Emotional Intelligence. Use Cases: Customer Support, Product Discovery, Content Navigation, Accessibility.",
    embedding: null,
    type: "hot_topic",
    image: "/images/conversational-ux.webp"
  },
  "future-of-search": {
    id: "future-of-search",
    title: "Future of Search",
    description: "Reimagining search through intent-driven, AI-powered experiences",
    content: "The future of search: How marketers can get ahead of the AI disruption. Search is changing fast. AI is arbitrating the brand experience. Zero-click results dominate, generative AI tools like ChatGPT and Perplexity are shaping brand perception. Goodbye SEO and SEM as you knew them. Generative Engine Optimization (GEO). AI advertising: A new frontier. People may not visit your website. Their agents might.",
    embedding: null,
    type: "hot_topic",
    image: "/images/future-of-search.webp"
  },
  "generative-ads": {
    id: "generative-ads",
    title: "Generative Ads",
    description: "AI-driven creation, optimization, and personalization of advertising",
    content: "Generative Ads. AI-driven creation, optimization, and personalization of advertising that automatically generates high-performing ad content at scale. AI-Powered Creation: Dynamic Copy Generation, Visual Asset Creation, Multi-variant Production, Brand-consistent Output. Intelligent Optimization: Performance-based Learning, Audience Adaptation, Channel Optimization, Real-time Adjustments.",
    embedding: null,
    type: "hot_topic",
    image: "/images/generative-ads.webp"
  },
  "experience-agents": {
    id: "experience-agents",
    title: "Experience Agents",
    description: "Proactive AI agents autonomously enhancing digital experiences",
    content: "Experience Agents. Autonomous AI agents that orchestrate, optimize, and personalize digital experiences without human intervention. Agent Capabilities: Experience Orchestration, Real-time Optimization, Proactive Engagement, Cross-channel Coordination. Agent Types: Personalization Agents, Optimization Agents, Support Agents, Analytics Agents.",
    embedding: null,
    type: "hot_topic",
    image: "/images/experience-agents.webp"
  },
  "liz-nelson-ai-cms": {
    id: "liz-nelson-ai-cms",
    title: "Liz Nelson on AI-Powered CMS",
    description: "How AI transforms content management and digital experiences",
    content: "AI-Powered Content Management Systems. Liz Nelson discusses how artificial intelligence is revolutionizing content management, enabling automated content creation, intelligent tagging, personalized delivery, and dynamic optimization. The future of CMS lies in AI-driven workflows that understand content context, user intent, and business objectives.",
    embedding: null,
    type: "visionary",
    image: "/images/liz-nelson.webp"
  },
  "ru-barry-ai-revolution": {
    id: "ru-barry-ai-revolution",
    title: "Ru Barry on the AI Revolution in Marketing",
    description: "Transforming marketing strategies through artificial intelligence",
    content: "AI Revolution in Marketing. Ru Barry explores how artificial intelligence is fundamentally changing marketing strategies, from predictive analytics and automated campaigns to real-time personalization and customer journey optimization. The integration of AI tools enables marketers to create more effective, data-driven campaigns that resonate with individual customers.",
    embedding: null,
    type: "visionary",
    image: "/images/ru-barry.webp"
  }
};

function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

async function getEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error getting embedding:', error);
    throw error;
  }
}

async function initializeEmbeddings() {
  for (const [key, content] of Object.entries(contentEmbeddings)) {
    if (!content.embedding) {
      console.log(`Computing embedding for ${content.title}`);
      try {
        content.embedding = await getEmbedding(content.content);
      } catch (error) {
        console.error(`Failed to compute embedding for ${content.title}:`, error);
      }
    }
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { query, limit = 5, threshold = 0.7 } = body;

    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query is required' })
      };
    }

    console.log('Semantic search query:', query);

    await initializeEmbeddings();
    const queryEmbedding = await getEmbedding(query);
    const results = [];

    for (const [key, content] of Object.entries(contentEmbeddings)) {
      if (content.embedding) {
        const similarity = cosineSimilarity(queryEmbedding, content.embedding);

        if (similarity >= threshold) {
          results.push({
            id: content.id,
            title: content.title,
            description: content.description,
            content: {
              text: content.content,
              video: '',
              podcast: ''
            },
            image: content.image,
            type: content.type,
            similarity: similarity,
            source: 'Semantic Search'
          });
        }
      }
    }

    results.sort((a, b) => b.similarity - a.similarity);
    const limitedResults = results.slice(0, limit);

    console.log(`Found ${limitedResults.length} semantic matches for query: "${query}"`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        query,
        results: limitedResults,
        total: limitedResults.length,
        method: 'semantic_search'
      })
    };

  } catch (error) {
    console.error('Semantic search error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
