import { useState } from 'react';

interface Report {
  id: string;
  title: string;
  description: string;
  image: string;
  pdfUrl: string;
}

const reports: Report[] = [
  {
    id: 'content-to-experience',
    title: 'From content to experience: How AI is shaping the future of marketing',
    description: 'Explore how AI is transforming marketing through scalable innovation with our full report and industry specific briefs.',
    image: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/5e3963e061f24c04b2f905226b72c732?t=sc700x700',
    pdfUrl: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/450023cd283f4b16a045ceb782837688?v=78ff2068'
  },
  {
    id: 'websites-2025',
    title: 'Websites 2025 report: How marketers are adapting to changing digital trends',
    description: 'This report explores the evolution of websites, revealing how global organizations are leveraging AI, personalization, and scalable CMS platforms to deliver unmatched user experiences and meet rising customer expectations.',
    image: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/8bcb1dbbd8044281b33d05cc07a5b238?t=sc700x700',
    pdfUrl: 'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/36b4155047a249ea9437cc8f0a3adbb2?v=d63fcb2e'
  }
];

export default function ReportsAndInsights() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (report: Report) => {
    setDownloadingId(report.id);

    try {
      // Open PDF in new tab for direct download from Sitecore Content Hub
      const link = document.createElement('a');
      link.href = report.pdfUrl;
      link.download = `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track download (you can add analytics here)
      console.log(`Downloaded report: ${report.title}`);
      console.log(`PDF URL: ${report.pdfUrl}`);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab if download fails
      window.open(report.pdfUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reports and Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dive deeper into key experience and AI related topics
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-fadeInUp"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Report Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    📄 PDF Report
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-left leading-tight">
                  {report.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left">
                  {report.description}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(report)}
                  disabled={downloadingId === report.id}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {downloadingId === report.id ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Report</span>
                    </>
                  )}
                </button>
              </div>

              {/* Report Footer */}
              <div className="px-8 py-4 bg-gradient-to-r from-purple-50 to-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">Sitecore Research</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    Free Download
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Stay updated with the latest insights.{' '}
            <a href="#newsletter" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
              Subscribe to our newsletter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
