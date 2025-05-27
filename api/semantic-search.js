const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const contentEmbeddings = {
  // Hot Topics with detailed content
  "personalization-ai-scale": {
    id: "personalization-ai-scale",
    title: "Personalization at AI Scale",
    description: "Delivering tailored, individual experiences efficiently at scale",
    content: "Personalization at AI Scale represents the evolution from basic segmentation to true 1:1 personalization through artificial intelligence AI machine learning ML. Advanced machine learning algorithms analyze user behavior, preferences, and context in real-time to deliver unique experiences for every visitor. Implementation involves sophisticated data collection across touchpoints, AI-powered processing engines that understand user intent, dynamic content orchestration systems, and continuous learning mechanisms that improve over time. Key benefits include real-time adaptation to user behavior, enterprise-scale deployment capabilities, predictive intelligence that anticipates user needs, and cross-channel consistency. Modern personalization platforms leverage vector embeddings, knowledge graphs, and multimodal AI to create experiences that feel intuitive and relevant. The technology enables dynamic content assembly, contextual recommendations, behavioral prediction, automated optimization, marketing automation, customer experience CX, user experience UX across all digital touchpoints. AI personalization engines, intelligent personalization, smart personalization, automated personalization, dynamic personalization, contextual AI, behavioral AI, predictive AI, recommendation AI, content AI.",
    embedding: null,
    type: "hot_topic",
    image: "/images/ai-scale-personalization.webp"
  },
  "content-transformation": {
    id: "content-transformation",
    title: "Content Transformation",
    description: "Dynamically adapting content for multiple contexts and channels",
    content: "Content Transformation AI content AI revolutionizes how organizations create, manage, and deliver content across multiple channels and contexts. This approach involves breaking content into atomic, reusable components that can be dynamically assembled based on user context, device capabilities, and business objectives. Advanced AI systems automatically adapt content format, tone, length, and presentation to match the specific channel and audience. Core capabilities include multi-format adaptation that transforms content for web, mobile, email, and social platforms, context-aware delivery that considers user location and behavior, real-time optimization based on performance data, and brand consistency enforcement across all touchpoints. Implementation strategies focus on modular content architecture, AI-powered transformation engines, automated workflow systems, and intelligent content routing. Use cases span cross-channel marketing campaigns, localization for global audiences, device optimization for various screen sizes, and audience segmentation for targeted messaging. Content AI, intelligent content, smart content, automated content, dynamic content, adaptive content, generative content AI, content generation AI, content optimization AI, content management AI, content automation.",
    embedding: null,
    type: "hot_topic",
    image: "/images/dynamic-content.webp"
  },
  "conversational-ux": {
    id: "conversational-ux",
    title: "Conversational UX",
    description: "Creating natural, engaging user interactions through chat and voice",
    content: "Conversational UX transforms digital interactions by enabling natural language communication between users and systems. This paradigm shift moves beyond traditional form-based interfaces to create more intuitive, accessible, and engaging experiences. Advanced natural language processing enables systems to understand context, intent, and emotional nuance in user communications. Core components include sophisticated natural language understanding that interprets complex queries, contextual awareness that maintains conversation state, multi-modal interactions supporting text, voice, and visual inputs, and emotional intelligence that responds appropriately to user sentiment. Implementation involves training conversational AI models, designing dialogue flows, creating knowledge bases, and integrating with existing systems. Use cases include intelligent customer support that resolves issues quickly, product discovery through natural conversation, intuitive content navigation, and accessibility features for users with disabilities. Modern conversational systems leverage large language models, voice synthesis, and multimodal AI to create seamless interactions across channels.",
    embedding: null,
    type: "hot_topic",
    image: "/images/conversational-ux.webp"
  },
  "future-of-search": {
    id: "future-of-search",
    title: "Future of Search",
    description: "Reimagining search through intent-driven, AI-powered experiences",
    content: "The Future of Search AI search intelligent search smart search represents a fundamental shift from keyword-based retrieval to intent-driven, AI-powered experiences. Traditional SEO and SEM strategies are being disrupted by generative AI tools like ChatGPT and Perplexity that provide direct answers rather than link lists. Zero-click results now dominate search behavior, with AI arbitrating the brand experience. This transformation requires marketers to adopt Generative Engine Optimization (GEO) strategies that focus on providing authoritative, structured content that AI systems can understand and reference. The emergence of AI advertising creates new opportunities for contextual brand placement within AI-generated responses. Organizations must prepare for a future where people may not visit websites directly, but their AI agents will access and evaluate content on their behalf. Success requires optimizing for semantic search, creating authoritative content hubs, developing AI-friendly structured data, and building relationships with AI platforms. The shift demands new metrics, measurement approaches, and content strategies designed for AI consumption and interpretation. Search AI, AI-powered search, intelligent search engines, conversational search, voice search AI, visual search AI, semantic search AI, contextual search, personalized search AI, predictive search, automated search optimization.",
    embedding: null,
    type: "hot_topic",
    image: "/images/future-of-search.webp"
  },
  "generative-ads": {
    id: "generative-ads",
    title: "Generative Ads",
    description: "AI-driven creation, optimization, and personalization of advertising",
    content: "Generative Ads revolutionize advertising through AI-driven creation, optimization, and personalization at unprecedented scale. Advanced machine learning systems automatically generate high-performing ad content that adapts to audience preferences, platform requirements, and performance data. AI-powered creation capabilities include dynamic copy generation that tailors messaging to specific audiences, visual asset creation that produces relevant imagery and graphics, multi-variant production that creates thousands of ad variations, and brand-consistent output that maintains visual and voice guidelines. Intelligent optimization features include performance-based learning that improves results over time, audience adaptation that personalizes content for different segments, channel optimization that adjusts for platform-specific requirements, and real-time adjustments based on campaign performance. Implementation involves training generative models on brand assets, creating automated workflow systems, establishing performance metrics, and integrating with existing advertising platforms. The technology enables advertisers to scale creative production, improve relevance and engagement, reduce production costs, and accelerate campaign deployment across multiple channels and audiences.",
    embedding: null,
    type: "hot_topic",
    image: "/images/generative-ads.webp"
  },
  "experience-agents": {
    id: "experience-agents",
    title: "Experience Agents",
    description: "Proactive AI agents autonomously enhancing digital experiences",
    content: "Experience Agents represent the next evolution in autonomous AI systems that orchestrate, optimize, and personalize digital experiences without human intervention. These intelligent agents continuously monitor user behavior, system performance, and business objectives to make real-time improvements to digital experiences. Agent capabilities include sophisticated experience orchestration that coordinates multiple touchpoints, real-time optimization that adjusts experiences based on performance data, proactive engagement that anticipates user needs, and cross-channel coordination that maintains consistency across platforms. Different types of agents serve specific functions: Personalization Agents that tailor content and experiences, Optimization Agents that improve performance metrics, Support Agents that provide assistance and resolve issues, and Analytics Agents that gather insights and provide recommendations. Implementation requires advanced machine learning infrastructure, robust data collection systems, automated decision-making frameworks, and integration with existing experience platforms. Experience Agents enable organizations to scale personalization, improve user satisfaction, reduce operational costs, and accelerate innovation in digital experiences. They represent a fundamental shift toward autonomous operation and continuous improvement.",
    embedding: null,
    type: "hot_topic",
    image: "/images/experience-agents.webp"
  },

  // Digital Visionaries with expanded content
  "liz-nelson-ai-cms": {
    id: "liz-nelson-ai-cms",
    title: "Liz Nelson on AI-Powered CMS",
    description: "How AI transforms content management and digital experiences",
    content: "Liz Nelson, VP of Product at Sitecore, discusses the transformative impact of AI on content management systems and digital experiences. AI-Powered Content Management Systems represent a paradigm shift from traditional content workflows to intelligent, automated processes that understand content context, user intent, and business objectives. Nelson emphasizes how artificial intelligence revolutionizes content management through automated content creation that generates relevant, on-brand materials, intelligent tagging systems that categorize and organize content automatically, personalized delivery mechanisms that serve appropriate content to specific users, and dynamic optimization that improves content performance over time. The future of CMS lies in AI-driven workflows that leverage natural language processing, computer vision, and machine learning to create, manage, and deliver content more effectively. These systems enable content creators to focus on strategy and creativity while AI handles routine tasks, optimization, and personalization. Nelson highlights the importance of maintaining human oversight while embracing AI capabilities to create more engaging, relevant, and effective digital experiences. The integration of AI into CMS platforms enables organizations to scale content operations, improve user experiences, and achieve better business outcomes through data-driven content strategies.",
    embedding: null,
    type: "visionary",
    image: "/images/liz-nelson.webp"
  },
  "ru-barry-ai-revolution": {
    id: "ru-barry-ai-revolution",
    title: "Ru Barry on the AI Revolution in Marketing",
    description: "Transforming marketing strategies through artificial intelligence",
    content: "Ru Barry, Marketing Innovation Leader at Sitecore, explores how artificial intelligence fundamentally transforms marketing strategies and customer engagement approaches. The AI Revolution in Marketing encompasses predictive analytics that forecast customer behavior and preferences, automated campaign management that optimizes performance in real-time, advanced personalization that creates unique experiences for each customer, and customer journey optimization that guides users through ideal paths to conversion. Barry emphasizes that AI integration enables marketers to create more effective, data-driven campaigns that resonate with individual customers at scale. Modern AI-powered marketing platforms leverage machine learning algorithms to analyze vast amounts of customer data, identify patterns and opportunities, automate routine tasks, and provide actionable insights for strategic decision-making. The technology enables sophisticated segmentation, dynamic content optimization, predictive modeling, and real-time campaign adjustments. Barry highlights the importance of balancing automation with human creativity and strategic thinking. Successful AI implementation requires proper data foundation, clear objectives, continuous learning, and ethical considerations. The future of marketing lies in intelligent systems that augment human capabilities while delivering personalized, relevant experiences that drive business growth and customer satisfaction.",
    embedding: null,
    type: "visionary",
    image: "/images/ru-barry.webp"
  },

  // Key AI Concepts with comprehensive content
  "semantic-search": {
    id: "semantic-search",
    title: "Semantic Search",
    description: "Search that understands context, meaning, and intent—not just keywords",
    content: "Semantic Search AI semantic AI intelligent search smart search represents a fundamental advancement in information retrieval that understands context, meaning, and intent rather than relying solely on keyword matching. This technology leverages natural language processing NLP, machine learning ML, and knowledge graphs to interpret the full meaning behind search queries and deliver more relevant results. Key characteristics include context understanding that interprets queries within broader conversational or situational contexts, intent recognition that identifies what users are actually seeking to accomplish, relationship mapping that understands connections between concepts and entities, and natural language processing that handles conversational, long-tail queries effectively. Digital experience applications include improved site search accuracy that returns more relevant results, conversational search interfaces that allow natural language queries, content recommendation engines that suggest related materials, knowledge discovery systems that help users explore related topics, and intelligent chatbot responses that provide helpful information. Implementation involves creating semantic data models, training machine learning algorithms, building knowledge graphs, and integrating natural language processing capabilities. Modern semantic search systems use vector embeddings, transformer models, and large language models LLMs to understand query intent and content relationships, enabling more intuitive and effective search experiences. Search AI, AI search, intelligent search, contextual search, semantic AI, search algorithms, search optimization AI, AI-powered search engines.",
    embedding: null,
    type: "ai_concept",
    image: "/images/semantic-search.webp"
  },
  "knowledge-graphs": {
    id: "knowledge-graphs",
    title: "Knowledge Graphs",
    description: "Structured representations of relationships between data, enabling richer content discovery",
    content: "Knowledge Graphs provide structured representations of relationships between data entities, enabling richer content discovery, personalization, and intelligent automation. These graph-based data structures model real-world entities and their interconnections, creating a semantic layer that AI systems can understand and navigate. Core components include entities representing people, places, things, and concepts, relationships that define connections between entities, attributes that describe properties and characteristics, and context that provides situational information and metadata. Digital experience applications include enhanced content recommendations based on entity relationships, personalized user journeys that follow logical content paths, intelligent content tagging that automatically categorizes materials, cross-platform data unification that connects information across systems, and dynamic content assembly that creates relevant experiences. Implementation involves data modeling, entity extraction, relationship mapping, and graph database management. Modern knowledge graphs leverage machine learning for automatic entity recognition, relationship discovery, and graph completion. They serve as the foundation for semantic search, recommendation systems, and AI-powered content management, enabling organizations to create more intelligent, connected digital experiences that understand and respond to user needs and business contexts.",
    embedding: null,
    type: "ai_concept",
    image: "/images/knowledge-graphs.webp"
  },
  "vector-embeddings": {
    id: "vector-embeddings",
    title: "Vector Embeddings",
    description: "Mathematical representations of content that power similarity search and recommendations",
    content: "Vector Embeddings are mathematical representations of content that convert text, images, and other media into numerical vectors, enabling AI systems to understand and compare content similarity, relevance, and relationships. These high-dimensional representations capture semantic meaning and enable sophisticated search, recommendation, and personalization capabilities. Technical features include numerical representation that converts diverse content types into comparable vector formats, similarity calculation methods that measure relatedness between content pieces using mathematical operations, dimensional space mapping that positions concepts in multi-dimensional space for relationship analysis, and machine learning integration that enables AI systems to understand content relationships and patterns. Digital experience applications include content similarity matching that finds related articles and materials, personalized recommendations that suggest relevant content based on user preferences, semantic search capabilities that understand query intent and context, content clustering and organization that automatically groups related materials, and intent-based user experiences that adapt to user goals and behaviors. Implementation involves training embedding models, creating vector databases, implementing similarity search algorithms, and integrating with content management systems. Modern vector embedding systems use transformer models, large language models, and specialized neural networks to create rich, meaningful representations that power intelligent digital experiences.",
    embedding: null,
    type: "ai_concept",
    image: "/images/vector-embeddings.webp"
  },
  "atomic-content": {
    id: "atomic-content",
    title: "Atomic Content",
    description: "Modular, reusable content pieces that can be dynamically assembled across channels",
    content: "Atomic Content revolutionizes content management by breaking content into modular, reusable pieces that can be dynamically assembled and personalized across channels and contexts. This approach enables organizations to create more flexible, scalable, and efficient content operations while maintaining consistency and quality. Design principles include modularity that creates small, independent content units that serve specific purposes, reusability that allows the same content to be used across multiple contexts and channels, flexibility that enables dynamic assembly based on user needs and preferences, and consistency that maintains unified brand voice and messaging across all touchpoints. Digital experience applications include omnichannel content delivery that adapts content for different platforms, personalized content assembly that creates unique experiences for individual users, efficient content management that reduces duplication and maintenance overhead, A/B testing at the component level for optimization, and rapid content iteration that enables quick updates and experiments. Implementation involves content modeling, component libraries, assembly engines, and workflow management systems. Modern atomic content systems leverage AI for automatic content tagging, intelligent assembly, and performance optimization, enabling organizations to scale content operations while improving relevance and engagement across all digital touchpoints.",
    embedding: null,
    type: "ai_concept",
    image: "/images/atomic-content.webp"
  },
  "multimodal-ai": {
    id: "multimodal-ai",
    title: "Multimodal AI",
    description: "AI systems that process multiple input types—text, image, video, and audio",
    content: "Multimodal AI represents advanced artificial intelligence systems that process and generate content across multiple input types—text, image, video, and audio—to deliver richer, more comprehensive digital experiences. These sophisticated systems understand and work with different modalities simultaneously, enabling more natural and effective human-computer interactions. Modality types include text processing for natural language understanding and generation, image analysis for visual recognition and creation, audio processing for speech recognition and synthesis, and video understanding for motion and temporal analysis. Digital experience applications include rich content generation that creates multimedia experiences automatically, accessible content alternatives that provide multiple ways to consume information, interactive media experiences that respond to user inputs across modalities, cross-modal content search that finds relevant content regardless of format, and unified content creation workflows that streamline multimedia production. Implementation involves training multimodal models, integrating different processing systems, creating unified interfaces, and managing complex data pipelines. Modern multimodal AI systems leverage transformer architectures, vision-language models, and neural networks designed for cross-modal understanding, enabling organizations to create more engaging, accessible, and effective digital experiences that meet diverse user needs and preferences.",
    embedding: null,
    type: "ai_concept",
    image: "/images/multimodal-ai.webp"
  },

  // Reports and Insights with detailed content
  "content-to-experience-report": {
    id: "content-to-experience-report",
    title: "From Content to Experience: How AI is Shaping the Future of Marketing",
    description: "Explore how AI is transforming marketing through scalable innovation with our full report and industry specific briefs",
    content: "From Content to Experience: How AI is Shaping the Future of Marketing provides comprehensive insights into the transformative impact of artificial intelligence on marketing strategies, customer engagement, and digital experiences. This research explores how organizations are leveraging AI technologies to move beyond traditional content marketing toward experience-driven approaches that prioritize customer value and engagement. The report examines key areas including AI-powered personalization that creates unique experiences for individual customers, automated content generation that scales creative production, predictive analytics that anticipate customer needs and behaviors, and intelligent optimization that improves campaign performance in real-time. Industry-specific briefs provide actionable insights for retail, financial services, healthcare, technology, and manufacturing sectors, highlighting best practices, implementation strategies, and success metrics. Research findings reveal that organizations implementing AI-driven marketing strategies achieve higher customer engagement, improved conversion rates, and better return on marketing investment. The report also addresses challenges including data privacy considerations, ethical AI implementation, and the balance between automation and human creativity. Key recommendations focus on building proper data foundations, investing in AI capabilities, training marketing teams, and developing governance frameworks for responsible AI use in marketing contexts.",
    embedding: null,
    type: "report",
    image: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/5e3963e061f24c04b2f905226b72c732?t=sc700x700"
  },
  "websites-2025-report": {
    id: "websites-2025-report",
    title: "Websites 2025: How Marketers are Adapting to Changing Digital Trends",
    description: "This report examines how global organizations are evolving their websites using AI, personalization, and scalable CMS platforms to meet rising customer expectations",
    content: "Websites 2025: How Marketers are Adapting to Changing Digital Trends examines the evolution of websites and digital platforms in response to changing customer expectations, technological capabilities, and market dynamics. This comprehensive research analyzes how global organizations are transforming their web presence using artificial intelligence, advanced personalization, and scalable content management systems. The report reveals that modern websites are becoming intelligent, adaptive platforms that understand user intent, deliver personalized experiences, and optimize continuously based on performance data. Key trends include the integration of AI-powered chatbots and virtual assistants, implementation of semantic search capabilities, adoption of headless and composable architectures, and the use of machine learning for content optimization and user experience enhancement. Research findings highlight the importance of mobile-first design, accessibility considerations, and cross-channel integration in modern website strategies. The study examines successful implementations across industries, providing insights into technology selection, implementation approaches, and measurement strategies. Organizations are investing in scalable CMS platforms that support rapid content deployment, A/B testing, and personalization at scale. The report also addresses emerging challenges including privacy regulations, security concerns, and the need for sustainable digital practices. Recommendations focus on adopting user-centric design principles, implementing robust analytics and optimization frameworks, and building flexible technology stacks that can adapt to future requirements.",
    embedding: null,
    type: "report",
    image: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/8bcb1dbbd8044281b33d05cc07a5b238?t=sc700x700"
  },

  // Comprehensive AI terminology and concepts entry
  "artificial-intelligence-overview": {
    id: "artificial-intelligence-overview",
    title: "Artificial Intelligence in Digital Experience",
    description: "Comprehensive overview of AI applications in marketing, content, and digital experiences",
    content: "Artificial Intelligence AI artificial intelligence machine learning ML deep learning neural networks natural language processing NLP computer vision generative AI large language models LLMs AI-powered AI-driven intelligent automation smart technology cognitive computing predictive analytics behavioral AI conversational AI recommendation AI content AI marketing AI experience AI personalization AI optimization AI analytics AI insights AI agents AI assistants AI chatbots AI search semantic AI contextual AI adaptive AI autonomous AI augmented intelligence automated intelligence machine intelligence digital intelligence business intelligence customer intelligence user intelligence data intelligence algorithmic intelligence computational intelligence cognitive AI emotional AI social AI collaborative AI explainable AI responsible AI ethical AI fair AI transparent AI trustworthy AI human-centered AI AI transformation digital transformation AI innovation AI strategy AI implementation AI adoption AI integration AI platforms AI solutions AI tools AI applications AI use cases AI benefits AI capabilities AI technologies AI trends AI future AI evolution AI disruption AI revolution marketing automation customer experience user experience digital experience omnichannel experience personalized experience intelligent experience adaptive experience dynamic experience contextual experience data-driven experience AI-enhanced experience machine-generated content automated content intelligent content dynamic content personalized content contextual content adaptive content responsive content smart content AI content generation AI content optimization AI content management AI content delivery AI content strategy.",
    embedding: null,
    type: "ai_overview",
    image: "/images/ai-overview.webp"
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
    const { query, limit = 5, threshold = 0.4 } = body;

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
