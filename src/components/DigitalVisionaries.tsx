import { Link } from 'react-router-dom';

interface VisionaryConversation {
  id: string;
  title: string;
  guest: string;
  description: string;
  episode: string;
  image: string;
  content: {
    video: string;
    podcast: string;
    text: string;
  };
}

const conversations: VisionaryConversation[] = [
  {
    id: 'liz-nelson-ai-cms',
    title: 'AI and the future of CMS',
    guest: 'Liz Nelson',
    description: 'How AI is transforming the future of CMS.',
    episode: 'Episode 1',
    image: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/242920d7d34c4c5aaf80a2adea23bdff?t=sc800',
    content: {
      video: 'https://webinars.sitecore.com/64968576/111460093/96f098177df90f545d9b87228c45b32c/video_hd/digital-visionaries-liz-nelson-7-video.mp4?referer=&uuid=968baaae-eff0-0acf-8f7c-db31a94fcc67',
      podcast: '',
      text: `# AI and the Future of CMS with Liz Nelson

## How AI is transforming the future of CMS.

**Sean Broderick (Sean)**: Hey everybody, welcome to Digital Visionaries, a brand-new video series from Sitecore that seeks to shine a light on how brands, marketers, and technologists are building for a new area in digital experience. I'm so delighted to be joined by Liz Nelson, our Senior Director of Product Management for the XM Cloud Group at Sitecore. She is not just one of the greatest voices in CMS market, but in martech as well. Liz, thanks so much for joining me.

**Liz Nelson**: Thank you, Sean.

**Sean**: It's wonderful to have you here in Dublin. I know that you're a recent transplant to Dublin. Tell us a little bit about your product management journey and your journey to where you are in Sitecore today.

**Liz Nelson**: Incredibly new to Dublin. Two weeks now. I joined Sitecore very recently actually, about a year and a half ago as a headless CMS consultant. From there, I joined the product group as a developer experience product manager. And in April [of 2024] I took over the XM Cloud group.

**Sean**: I think your experience in AI is particularly relevant in the age we're in today. How do you see that journey from a CMS perspective from someone who is intricately knowledgeable in that space?

**Liz Nelson**: When we look at AI, first and foremost you start to think about content generation. We see AI and we see models that are phenomenal at generating content. So, the first place we go is content generation, but we've been thinking so much about how this is going to affect the way we store content, retrieve content, discover our own content. From a content management perspective, we think about our customers who have huge stores of their enterprise's content that oftentimes lies undiscovered. They lose sight of their content over time because there's just too much of it. It's a reservoir of their own value that is oftentimes lost to the depth of that lake.

> **"We're thinking about how we can build a content management system when it isn't just used by humans, but AI. It's not just about who's creating the content, but who's finding the content, who's building the content, who's personalizing it, and who's analyzing it. We're trying to get down to the heart of a world in which humans and AI agents are working together in a connected way."**
>
> — **Liz Nelson**

What I do know is that this world we're headed into is a world where AI is a deep part of our lives. You're going to be leveraging AI in your content management systems. You're going to be leveraging AI to build content, to find content, to create content out in all of your channels, to run your campaigns in your workflows.

**Sean**: When you're talking to customers and I know you've done many, both onsite visits with customers and virtual all over the USA, all over Europe, and APAC, what are they saying to you in terms of their requirements?

**Liz Nelson**: I think like they're dreaming along with all of us. They're dreaming of a world in which they can personalize to their audiences more, where they can discover and find their content, where they can tap into their own enterprise knowledge in a better, more efficient way, and where they can do more with less for their marketing teams. I think where they can differentiate in their industry and be the visionary in their space comes with being creative, thinking first, and trying things out and experimenting.

**Sean**: XM Cloud is Sitecore's fastest selling product ever, due in no small part to the phenomenal work that you and the team have been doing. How do you see the product evolving, knowing all of what your customers are asking you on a day-to-day basis?

**Liz Nelson**: We have a few strategies regarding AI, and regarding the future of content management. The first point we have honed in on is marketer owned technology. I also see the evolution of what we would call headless, where headless technology is a philosophy of delivery that allows for greater speed to market and better performance on the internet. But one of the challenges is that it kind of centers control to developers. That can be really powerful when you have a great IT team–if you're the kind of enterprise that is fully staffed with a strong development team – that's excellent. A lot of marketing teams don't have an organization like that, and their marketing team wants to have more power to make changes and push their brand without having to coordinate with developers to make changes all the time. They want to be empowered to change more and push more. Obviously, there's space for when and how to work and coordinate with developers–there are things you can't do without software and code.

> **"We see a future in which there is greater coordination between marketers and developers, powered by AI, but fundamentally the marketer owns the technology."**
>
> — **Liz Nelson**

**Sean**: That's a big shift for a lot of teams and organizations, right?

**Liz Nelson**: Yes. It's a big shift. And we think it can be done in a way that is still a lovely developer experience–because of AI. That's been a big focus of our developer experience and our philosophy of marketing in general is that the marketer should be the center of control. XM Cloud is a place where a marketer can feel empowered to drive their brand vision.

**Sean**: Talk about how important embedded personalization is inside of a CMS, whether that's with XM Cloud, or otherwise.

**Liz Nelson**: This is a key initiative for us. It's really hard for a lot of marketers to get started with personalization for a lot of reasons. We've talked to tons and tons of customers, and we've engaged with so many folks. Sometimes it's because you have a certain budget to get your site running, and personalization is the thing that gets descoped. You put that off and then you've lost the digital strategy team that you've engaged to help you. And so, the marketer is left on their own with no strategy team to assist them toward a first engagement with personalization products. That's been a primary goal for us recently–how to take those first steps into personalization.

> **"Our vision for AI inside of XM Cloud is that it serves as your marketing copilot. You set your site goals, you set your audiences, and AI knows your brand, your tone of voice, the goals for your channel, your audiences, the components that are most engaged with. This allows it to make incredibly nuanced suggestions for a great personalization experience. AI isn't going to do your job for you, but it can get you started."**
>
> — **Liz Nelson**

**Sean**: Yeah. I think that's the key point here as well. One of our esteemed colleagues, Jacqueline Baxter, our Director of Content here at Sitecore, talks about approvals being where great stuff goes to die. Whereas if you have all these personalization options, you can figure out which works best and you're taking it beyond the realm of opinion and then into something that has hard data behind it. I think that's really key.

**Liz Nelson**: This is a really great point for two reasons. So, one is we've recently launched A/B testing in XM Cloud. All of our AI suggestions automatically can deploy A/B testing, so you can test out whether or not any of these suggestions are valid or not and, get some data behind it very quickly, make sure that any of these things are worth investing in and, roll on. Talking about approvals, this brings me to Sitecore Stream. One of my favorite things about Sitecore Stream is Sitecore Stream Orchestrate, which is a set of campaign management, task and project management capabilities, as well as workflow management capabilities. These capabilities actually have a deep integration with XM Cloud, including collaboration capabilities. If you need human governance, it's right there. There are tons of enterprises who are absolutely going to need human oversight into anything generated with AI. And so, if you need workflows set up so that AI creation always has human eyes on it with flows and approvals, that's in place. User collaboration, great task management tools, all of that comes with XM Cloud and these lovely ways that are AI empowered for human and AI agents to work in great collaboration. We've been just so excited about this nonstop collaboration with the Sitecore Stream team.

**Sean**: What are you most excited about? You've outlined how the workflow is going to integrate with XM Cloud. When it comes to Sitecore Stream, how is that going to augment XM Cloud and the overall CMS experience at Sitecore?

**Liz Nelson**: Sitecore Stream is deeply integrated into XM Cloud. One of the things that will be released quite soon is content generation and brand intelligence, and specifically variant improvement features. With Sitecore Stream, I now have all that intelligence about my brand. All of that content generation is now super rooted in that learn service. One of the strengths of Sitecore Stream is this notion of enterprise intelligence, brand intelligence, code intelligence. And as these intelligence services are being built in Stream and they surface through into XM Cloud, you can leverage the knowledge of your own enterprise, directly inside of XM Cloud. Sitecore Stream's Orchestrate application has a native integration in XM Cloud. All of the collaboration tooling, task management and campaign management–I love how that orchestrate aspect goes across all of our products.

**Sean**: Liz, you lead the XM Cloud group at Sitecore, maybe give a plug for some of the new things that you're thinking about for XM Cloud.

**Liz Nelson**: I have so many favorite new things, it's hard to decide. I want to say something I think is foundational and interesting about the design library. In the realm of content management, we have thought about content and digital assets. But the way we think about design library is that there's this third top level domain, and that is what we call the design asset. And we are treating it with the respect that it deserves as a third top level asset, where it is this odd combination of things–where it's a design file, design presentation asset, and part content and part code, and because it's these three things and that triad of designer and marketer and developer, it has a unique domain. We've created a whole application and interface and space for it to elevate it to the third realm of a content management system. And we've been talking to our customers about this. And I think one of our customers said, "I feel seen", which was a really validating comment in general. I think it's resonating with people, and we're really excited for the launch of it. In our page building application, we are about to launch a series of analytics and personalization tooling that's built in. Our goal with the pages application is to make it the best experience and optimization building tool on the market. I think we're really hitting that. And lastly, we have a really cool set of developer frameworks that are coming out. We call them Leaner Modern Starter Kits. It's an expansion of framework support, all kinds of new modern meta frameworks. The way in which our developer customers have responded to it has been really incredible.

**Sean**: I love hearing how you break it down. We are marketer focused, but continuing to deliver for our developer audience as well. I love that.

**Sean**: This has been the Digital Visionary series. Liz, thanks so much for joining me on the couch today.

**Liz Nelson**: Thank you so much, Sean.`
    }
  },
  {
    id: 'ru-barry-ai-revolution',
    title: 'Navigating the AI revolution with Sitecore',
    guest: 'Ru Barry',
    description: 'Navigating the AI revolution with Sitecore',
    episode: 'Episode 2',
    image: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/759db48545d94680aea064a4ccf160e9?t=sc800',
    content: {
      video: 'https://webinars.sitecore.com/64968568/111959869/9e19dc990e5c6c1aa207451a278c39bf/video_hd/navigating-the-ai-revolution-with-7-video.mp4?referer=&uuid=968baaae-eff0-0acf-8f7c-db31a94fcc67',
      podcast: '',
      text: `# Navigating the AI Revolution with Sitecore

## Navigating the AI revolution with Sitecore

**Sean Broderick (Sean)**: Hi everybody. Welcome to Digital Visionaries. My name is Sean Broderick. Today I'm delighted to be joined by Ru Barry, who's the Senior Director of Product Management at Sitecore. Ru is one of the foremost AI thinkers in Ireland today. He brings a great knowledge of product management, [and] a great sense of where the market is going. Ru, thanks for joining me today.

**Ruadhán (Ru) Barry**: Thanks for having me, Sean. Lovely to be here.

**Sean**: It's great to be here in Dublin recording this. Let's take it back a couple of months, back to Nashville and Sitecore Symposium where we launched Sitecore Stream. Tell us a little bit about that launch and the impact that's made on Sitecore.

**Ru Barry**: I think it's been big. We needed to have that point of view around Stream. We needed to be able to communicate very clearly, and that takes a lot of work in the background. Launching Nestle there as well was important for us, having co-developed a lot of those capabilities. It's great to have that as a turning point for us from a product perspective, a marketing perspective, and a wider business perspective. We got a real chance to put our mark out and say 'this is where we're going. This is where we believe the market is going.'

**Sean**: I think you saw the splash that was made in Nashville, the kind of impact that it's had online, and how much it resonated with marketing teams. Tell us a little bit more about that vision: what was launched in November and how that evolves into 2025 and that winter release for Sitecore.

**Ru Barry**: Absolutely. We said on the stage that Stream is three things. Stream is brand-aware AI, it is generative co-pilots, and it is AI-enhanced workflows. What do those mean? For anyone who hasn't seen the demos or the collateral, brand-aware AI is about supporting our customers to generate content and enabling them to generate content that is aligned to their brand.

Users can create a brand kit, which is the foundation of knowledge for content creation. It provides a safe space for the user of the AI, the corporation, and our customers to be able to say, 'you know what? People who are building AI within our business? That's fully aligned to our brand.' Brand-aware AI is important. That'll evolve over time - right now it's very focused on brand because most of our customers are in the CMS space.

The second one is generative co-pilots. These are everywhere, all over the place in the industry. And they will continue to be. We've spent a lot of time thinking about our end users and how we can provide AI that enables them to be efficient and collaborative in the work that they're doing. The co-pilots are there interspersed across all the Sitecore products. Whether you're a Content Hub customer, an XM Cloud customer, XP, XM, CDP, Personalize, Search. There will be copilots available to your users to help them.

The first [co-pilot] that we released was the brand assistant with Nestle. As I said, they helped us co-develop that. That's an important first co-pilot for us, because it allows our users to interact with chat and really be able to ground that chat in the details of the brand. [It] helps them reference details, make sure things are in the right tone of voice, that the content created is aligned to the content that their business wants to create.

The third was AI-enhanced workflows. We had a demo for anyone who was at Symposium and wanted to get hands-on experience. The winter release will be the first general availability announcement of the capabilities. AI-enhanced workflows are about enabling marketers and technologists to be able to build, collaborate and deliver in Sitecore. The first part of that will be around creating tasks, being able to create projects, create campaigns, collaborate, comment. It'll be about understanding end-to-end content delivery and marketing plans and how you're going to manage those across products. But eventually that'll expand over time. Today, a lot of those tasks are done by humans. Over time we do see agentic AI taking over. You'll start to see humans approving agentic workflows.

An agentic is essentially an AI capability that is doing a piece of work and coming back to you and saying, 'this is what I've done. Is that okay? Can we move on?' It's the ability for humans to offload some of those redundant tasks to an LLM, an agent, a co-pilot. Eventually I think those will chain together and we'll have maybe workflows that are being done by agents for content creation, aligning that content to your brand make sure the tone of voice is correct, and then coming back to the human and saying, 'Here's the version, here's three versions. Does this work? Do you like it or not?'

Stream is those three things.

**Sean**: Let's dive into the brand-aware AI piece, because for me that is crucial to this. As a marketer myself, you look at what Chat GPT and different LLMs and Perplexity provide you and in the main, it's getting better, but it's homogenous content. It doesn't really reflect your brand, and it's the wild west out there. It's not really that safe. You have people throwing reams of corporate data into these LLMs, and that is being used to train these models.

Talk about that security aspect where you upload your brand kits, all your brand heritage, all your content, and your knowledge into this brand-aware AI and the security that gives you as a brand?

**Ru Barry**: I think one of the main roadblocks to deploying AI in enterprise today is trust and trusted outcomes. Brand-aware AI is important. It grounds the models. When you're rolling out an AI into your organization, you want to be able to understand what people are doing and where the source material is.

The source material is critical. Sometimes, I'll use Chat GPT, or a copilot, and I'll ask it to give me some data points. It will give me stats, and then I'll say, 'where did that stat come from?' And it'll say, 'oh, that's a hypothetical stat. I'm sorry about that. I apologize.' That's not acceptable for enterprise level content creation.

> **"Brand-aware AI is important for our customers for two reasons. One is that it ensures that the outcomes are aligned to your brand. You create a brand kit from many documents: your brand guidelines, your tone of voice, your color palettes. Our brand-aware AI consumes that [and] generates a reference data set and no matter what it comes out with it must be grounded [in this data]."**
>
> — **Ruadhán Barry**

Sitecore will never train an LLM model on your data. Your data is your data. That's critical for all our customers. They don't want their brand guidelines, their internal confidential data, being used in the open. That's not acceptable for them. Your brand data doesn't leave Sitecore. It doesn't go anywhere else. It's not shared with any other customer. It's not available on the open internet. It's...for your use only. I think that's a big step forward for trust. Once customers understand that we're not there to harvest that data, we're not there to use that data for our own purposes.

**Sean**: What are some of those copilots that are going to be specific to the people interested in XM Cloud or Content Hub? What are those things that are going to augment those existing Sitecore products today and make them attractive to our existing base and prospects?

**Ru Barry**: The first release will be the initial steps. Some of those will be around content creation and content alignment. Then you'll see code block creation, full variant creation, hypothesis and AB testing as part of that expansion to meet XM Cloud users where they are. Enable them to build components, forms, pages, sites and really start to think about the user experience. I think you had Liz here recently talking about the future of CMS. Liz is super focused on how we can enable those users.

> **"When we look at Content Hub, we're talking about things like image tagging, attribute tagging, semantic search. And you'll see that expand over time; we'll start to look at content creation, asset creation, brand adherence work. And importantly, the vast majority of our customers are XM and XP customers. Stream will also be available to them. Those capabilities that we've talked about for XM Cloud are also available for XP and XM customers. They're very much included in what we're doing."**
>
> — **Ruadhán Barry**

**Sean**: The type of enterprises and the type of companies that Sitecore are working with in this space, the volume of data that they have is insane. They need to be able to work fast and to utilize all those existing brand assets and reference those when it comes to creating new material and new assets.

**Ru Barry**: I think the important part of Stream is content creation and content adherence. But the other part of that is collaboration. We've focused on that: how do we bring teams together to work better? Most of the time, we're on a laptop in our homes or we're dispersed. Those collaboration features built into the products critical.

**Sean**: Let's talk about the kind of conversations that you are having with some of our existing customers today. What kind of reaction are you getting to the new features that are being developed inside of Sitecore Stream at Sitecore?

**Ru Barry**: Early access has been open since Symposium. We have customers and partners jumping all over brand assistant and the brand assistant chat interface. What we showed at Symposium has evolved into this winter release. You're going to see more collaborative working spaces within the chat.

Most of the feedback has been around the ease of implementation. We've been talking to partners and customers and see the blogs they're creating now that are brand-aware, that are aligned to their brand. We have case studies being generated [that show] real value in that content creation space. When we think about making efficiency gains for those customers it's critical and they've been excited.

**Sean**: What are our customers doing to get ready for AI?

**Ru Barry**: That's been one of the interesting aspects of early access. People want to get their hands on AI, and they want to get involved in it. They come up against internal blockers around AI adoption. They haven't done the groundwork on policies. They don't have governance in place. They don't have a company policy on how they're going to approach AI. A lot of those customers are now starting to think about those things.

We've worked hard on making sure that the adoption of Sitecore Stream is as easy as possible.

The second thing is investment. Not investment in AI, but investment in people. A lot of people will talk about AI but not a lot of people are curious enough about it, and even more people aren't even enabled on it. Investing in people is critical. [AI]'s not going anywhere. The last thing is investment in the infrastructure and that comes once you've chosen the platform.

**Sean**: If we turn the camera a little bit towards the back end of 2025, what does that vision look like for Sitecore Stream in the future? How is this going to evolve over the course of the next 12 or 18 months, in your view?

**Ru Barry**: I think there will be a tipping point at some point this year - work will be fundamentally different than it's today. Marketers and those technologists need the power to build. We can create space for marketing teams to do the things that humans do well. Humans love human connection. They wanted crafted storytelling. They want impressive experiences. That can only be delivered right now by human thought, human creativity. To make that space, we need to remove the redundant tasks. The majority of think of marketers today, they spend probably about 80% of their time on approvals and publishing and maybe 20% on the creative part. When we talk to customers, they're looking for that fun element. They want to be on whiteboards, they want to brainstorm. They want to be talking about their brand and what it means and what the ideas are and then be able to execute much quicker.

**Sean**: You and I have been working in the marketing space long enough to know that the promise of personalization has always been out there and talked about for many years now. To be able to create these variances for different audiences, that's where you're going to see a massive boost in conversion.

**Ru Barry**: For I think for the past four years we've been talking about this concept of marketing technologists being the real linchpin of a highly efficient marketing team. And one of the things that I'm quite excited about is code creation. That really changes the game. The enablement of those marketers and those technologists to build with Sitecore is a huge opportunity and something that I'm particularly passionate about.

**Sean**: Ru, it's been amazing talking to you this morning. Thanks so much for joining me today.

**Ru Barry**: Thanks very much for having me, Sean.`
    }
  }
];

// Export the conversations data so it can be used by the Agentic Experience page
export { conversations as digitalVisionariesData };

export default function DigitalVisionaries() {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
          In conversation with visionaries
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Real-world insights from leaders navigating AI's impact on content and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
          >
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-red-100 relative overflow-hidden">
              <img
                src={conversation.image}
                alt={`${conversation.guest} conversation`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to a gradient background with guest name
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                  {conversation.episode}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {conversation.title}
              </h3>
              <p className="text-purple-600 font-medium mb-3">
                with {conversation.guest}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {conversation.description}
              </p>

              {/* CTAs */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">
                  Explore this conversation
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/agentic-experience?topic=${conversation.id}&mode=article`}
                    className="inline-flex items-center px-3 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Read</span>
                  </Link>
                  <Link
                    to={`/agentic-experience?topic=${conversation.id}&mode=video`}
                    className="inline-flex items-center px-3 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
                    </svg>
                    <span>Watch</span>
                  </Link>
                  <Link
                    to={`/agentic-experience?topic=${conversation.id}&mode=podcast`}
                    className="inline-flex items-center px-3 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <span>Listen</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
