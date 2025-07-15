import React, { useState, useMemo, useEffect } from 'react';

// --- ICONS (as components for easy use) ---
const icons = {
  lightbulb: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 9 2c-1.8 0-3.5.7-4.9 2.1A6 6 0 0 0 9 14v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"/><path d="M9 16v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2h-6z"/></svg>,
  chart: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  search: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  warning: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  wrench: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  measure: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>,
  robot: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  arrowUp: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  check: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
};
const Icon = ({ name, className }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

// --- MOCKED DATA STORE ---
const trendsData = {
  "AI in Banking": {
    topic: "AI in Banking",
    trendType: "Thought Leadership",
    initialScore: 68,
    internalAudit: "Content exists but is scattered across press releases.",
    externalAudit: "Discourse led by global consulting firms, low DBS association.",
    gap: "No dedicated platform for DBS to showcase its AI innovation story, vision, and practical applications.",
    actions: ["Create 'Future of Banking' expert hub", "Add client case studies", "Apply FAQ & Article schema"],
    postImpact: {
      genAI_citations: "+3",
      traffic_uplift: "+28%",
      score_change: "68 → 82"
    }
  },
  "Retiring During Recession": {
    topic: "Retiring During Recession",
    trendType: "Emerging",
    initialScore: 49,
    internalAudit: "Existing content on retirement planning is too generic.",
    externalAudit: "High anxiety on forums like Reddit with no authoritative voice.",
    gap: "No dedicated guide that addresses specific fears of retiring in a downturn.",
    actions: ["Publish 'Guide to Retiring in a Recession'", "Create FAQ section on market volatility", "Launch targeted social posts"],
    postImpact: {
      genAI_citations: "+5",
      traffic_uplift: "+45%",
      score_change: "49 → 75"
    }
  },
  "Buy Now Pay Later (BNPL)": {
    topic: "Buy Now Pay Later (BNPL)",
    trendType: "Competitive",
    initialScore: 72,
    internalAudit: "DBS has BNPL products but content is not discoverable.",
    externalAudit: "Fintech competitors dominate search results and GenAI summaries.",
    gap: "Lack of comparison content and clear guides on using DBS BNPL features.",
    actions: ["Create 'DBS vs. Competitors' comparison table", "Optimize product pages for 'BNPL' keywords", "Add 'How-To' video guides"],
    postImpact: {
      genAI_citations: "+2",
      traffic_uplift: "+18%",
      score_change: "72 → 80"
    }
  },
    "Sustainable Investing": {
    topic: "Sustainable Investing",
    trendType: "Thought Leadership",
    initialScore: 65,
    internalAudit: "ESG product pages exist but lack a unifying narrative.",
    externalAudit: "Competitors are publishing annual ESG reports that rank well.",
    gap: "No central hub for DBS's sustainability efforts and investment philosophy.",
    actions: ["Develop an interactive 'Sustainable Future' content hub", "Publish expert interviews", "Create downloadable ESG guides"],
    postImpact: {
      genAI_citations: "+4",
      traffic_uplift: "+35%",
      score_change: "65 → 85"
    }
  }
};

// --- UI COMPONENTS ---

const InputPanel = ({ onRun, isLoading }) => {
  const [selectedTopic, setSelectedTopic] = useState("AI in Banking");

  const handleRun = (e) => {
    e.preventDefault();
    onRun(selectedTopic);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-200/80">
      <form onSubmit={handleRun} className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-auto md:flex-grow">
            <label htmlFor="topic-select" className="sr-only">Select a Trend</label>
            <select
              id="topic-select"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-4 bg-gray-100 border-2 border-transparent rounded-2xl text-base text-gray-800 focus:bg-white focus:border-accent transition-colors"
            >
              {Object.keys(trendsData).map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-accent text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-transform active:scale-95"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            'Run System'
          )}
        </button>
      </form>
    </div>
  );
};

const StageColumn = ({ title, children, className }) => (
  <div className={`space-y-6 ${className}`}>
    <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase pl-2">{title}</h2>
    <div className="space-y-6">
        {children}
    </div>
  </div>
);

const InfoCard = ({ title, content, icon, iconBgClass = 'bg-accent/10', iconTextClass = 'text-accent' }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-4 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgClass}`}>
                <Icon name={icon} className={`w-5 h-5 ${iconTextClass}`} />
            </div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
    </div>
);

const ActionsCard = ({ actions }) => (
     <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10">
                <Icon name="wrench" className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-gray-800">Recommended Actions</h3>
        </div>
        <ul className="space-y-3">
            {actions.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                    <Icon name="check" className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{action}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ScoreCard = ({ score }) => (
    <div className="bg-white p-5 rounded-2xl border-2 border-accent shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent/10 text-accent text-3xl font-bold">
            {score}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800">Initial Authority Score</h3>
            <p className="text-sm text-gray-500">Benchmark at start of analysis</p>
        </div>
    </div>
);

const MetricCard = ({ value, label, icon }) => (
    <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm text-center">
        <Icon name={icon} className="w-8 h-8 mx-auto text-accent mb-2" />
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeData, setActiveData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleRunSystem = (topic) => {
    setIsLoading(true);
    setShowResults(false);
    
    // Simulate API call
    setTimeout(() => {
      setActiveData(trendsData[topic]);
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <style>{`
        :root {
          --color-merkle-blue: #12285d;
          --color-dbs-red: #D71E28;
          --color-accent: var(--color-merkle-blue);
        }
        .bg-accent { background-color: var(--color-accent); }
        .text-accent { color: var(--color-accent); }
        .border-accent { border-color: var(--color-accent); }
        .bg-accent\\/10 { background-color: color-mix(in srgb, var(--color-accent) 10%, transparent); }
        .text-dbs-red { color: var(--color-dbs-red); }
        .results-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Trend Response System</h1>
            <p className="text-lg text-gray-600">A demonstration of our strategic analysis engine.</p>
        </header>

        <InputPanel onRun={handleRunSystem} isLoading={isLoading} />

        {showResults && activeData && (
            <div className={`mt-12 results-fade-in`}>
                <div className="text-center mb-10">
                    <p className="font-semibold text-accent">{activeData.trendType}</p>
                    <h2 className="text-3xl font-bold text-gray-800">Analysis for: "{activeData.topic}"</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Stage 1: Research */}
                    <StageColumn title="Research">
                        <ScoreCard score={activeData.initialScore} />
                        <InfoCard title="Internal Content Review" content={activeData.internalAudit} icon="search" />
                        <InfoCard title="External Mentions" content={activeData.externalAudit} icon="comments" />
                    </StageColumn>

                    {/* Stage 2: Implement */}
                    <StageColumn title="Implement">
                        <InfoCard title="Identified Gap" content={activeData.gap} icon="warning" iconBgClass="bg-red-100" iconTextClass="text-red-600" />
                        <ActionsCard actions={activeData.actions} />
                    </StageColumn>
                    
                    {/* Stage 3: Measure */}
                    <StageColumn title="Measure">
                        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                            <h3 className="font-semibold text-gray-800 text-center mb-4">Post-Launch Impact</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <MetricCard value={activeData.postImpact.genAI_citations} label="GenAI Citations" icon="robot" />
                                <MetricCard value={activeData.postImpact.traffic_uplift} label="Traffic Uplift" icon="chart" />
                                <MetricCard value={activeData.postImpact.score_change} label="Score Change" icon="arrowUp" />
                            </div>
                        </div>
                    </StageColumn>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
