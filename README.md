# Sitecore.ai Launch Site

A modern, interactive website showcasing Sitecore's Agentic Experience platform with AI-powered features, built for the Symposium 2025 event.

## 🚀 Features

- **Flowing Light Waves Background**: Custom animated background with Sitecore brand colors
- **AI Chat Integration**: Interactive AI assistant powered by OpenAI GPT-3.5-turbo
- **Synthesia Video Integration**: AI-generated keynote video
- **Multi-page Navigation**: Home, Agentic Experience, and Symposium 2025 pages
- **Countdown Timer**: Live countdown to Symposium 2025 (November 3rd, 2025)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Newsletter Signup**: Email collection with validation
- **Social Sharing**: Easy social media sharing functionality

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router Dom
- **AI Integration**: OpenAI API with conversation history
- **Deployment**: Netlify with serverless functions
- **Package Manager**: Bun

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sitecore-ai-launch
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Create .env.local file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
```

4. Start the development server:
```bash
bun run dev
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI chat functionality | Yes |

## 🚀 Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `bun run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `api`
3. Add environment variables in Netlify dashboard
4. Deploy!

### Build Commands

```bash
# Development
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint

# Format code
bun run format
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── AIChat.tsx              # AI chat component with OpenAI integration
│   ├── CardSection.tsx         # Feature cards component
│   ├── CountdownTimer.tsx      # Countdown timer for Symposium 2025
│   ├── Navigation.tsx          # Site navigation with mobile menu
│   ├── NewsletterSignup.tsx    # Email signup form
│   ├── SocialShare.tsx         # Social media sharing buttons
│   └── StarryBackground.tsx    # Animated light waves background
├── pages/
│   ├── AgenticExperience.tsx   # Agentic Experience details page
│   └── Symposium2025.tsx       # Symposium event details page
├── App.tsx                     # Main homepage component
├── main.tsx                    # App entry point with routing
└── index.css                   # Global styles and Tailwind imports

api/
└── chat.js                     # Serverless function for OpenAI API

public/
├── _redirects                  # Netlify SPA routing configuration
├── cta-arrow.svg              # CTA button arrow icon
└── favicon.svg                # Site favicon
```

## 🎨 Design Features

- **Sitecore Brand Colors**: Official red (#EB001A) and purple (#6A1B9A) color scheme
- **Custom Animations**: Flowing light waves with aurora-like effects
- **Typography**: DM Sans font family for modern, clean aesthetics
- **Responsive Layout**: Mobile-first design that scales beautifully

## 🤖 AI Chat Features

- **Conversation History**: Maintains context throughout the chat session
- **Markdown Support**: Rich text formatting in AI responses
- **Feedback System**: Thumbs up/down for response quality
- **Suggested Prompts**: Quick-start questions about AI experiences
- **Contextual Responses**: AI trained on Sitecore.ai and Symposium 2025 information

## 📅 Event Information

- **Event**: Sitecore Symposium 2025
- **Date**: November 3rd, 2025, 12:00 PM EDT
- **Location**: Walt Disney World Dolphin Resort, Orlando, Florida
- **Focus**: Launch of the Agentic Experience platform

## 🔗 Links

- **Live Site**: [Your deployed URL]
- **Symposium Info**: [Symposium details]
- **Sitecore**: [https://www.sitecore.com](https://www.sitecore.com)

## 📝 License

This project is created for Sitecore and the Symposium 2025 event.

## 🤝 Contributing

This is a showcase project. For issues or suggestions, please open an issue in the repository.

---

Built with ❤️ for the future of AI-powered digital experiences.
