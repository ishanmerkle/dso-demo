import React, { useState, useMemo } from 'react';

// --- ICONS (as components for easy use) ---
const icons = {
  lightbulb: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 9 2c-1.8 0-3.5.7-4.9 2.1A6 6 0 0 0 9 14v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"/><path d="M9 16v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2h-6z"/></svg>,
  chart: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  search: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  warning: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  wrench: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  measure: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>,
  trophy: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  comments: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3h4v4"/><path d="m21 7-4-4"/><path d="M7 21h4v-4"/><path d="M3 17l4 4"/><path d="M21 17h-4v4"/><path d="m17 21 4-4"/><path d="M7 3H3v4"/><path d="m7 7-4-4"/></svg>,
  robot: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  award: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  book: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  mouse: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/></svg>,
  print: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>,
};
const Icon = ({ name, className }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

// --- INITIAL DATA STORE ---
const initialTrendData = {
  'Consumer Banking': { trend: "Retiring During Recession", type: "Emerging Trend", initialScore: 49, research: { intelligence: 'System identifies a rising volume of searches and conversations around "retiring during recession."', scoring: 'DBS does not consistently rank high in search and GenAI results, indicating a significant visibility gap.' }, implement: { audit: 'Existing DBS content on retirement planning is reviewed for relevance. Public discourse on Reddit and forums shows low association between DBS and this specific topic.', gaps: 'No dedicated content exists on the DBS site for "retiring during recession in Singapore." This is a major content gap.', action: 'Based on the audit, DBS implements technical and content recommendations, including creating a new, structured article optimized for GenAI extraction.' }, measure: { uplift: 'Post-implementation, the system tracks KPIs to quantify the impact of the new content.', metrics: [ { icon: 'chart', text: 'Increased web traffic to the new article.' }, { icon: 'comments', text: 'Growth in GenAI citations and positive mentions.' }, { icon: 'trophy', text: 'Improved Search Authority Score for the topic.' } ] } },
  'SME Banking': { trend: "Low-Interest SME Loans", type: "Established Trend", initialScore: 72, research: { intelligence: 'System identifies "low-interest SME loans" as a high-volume, highly competitive search trend.', scoring: 'DBS has existing content and ranks, but is often outranked by competitors and aggregators. Content is not optimized for GenAI.' }, implement: { audit: 'The existing DBS page is a standard product page, not structured to answer user questions. Competitors offer comprehensive guides and comparison tools.', gaps: 'The content lacks answer-oriented structure (Q&A, tables) and schema markup, making it difficult for GenAI to extract and feature.', action: 'Re-structure the existing page with a Q&A section, add comparison tables against competitors, and implement FAQ schema.' }, measure: { uplift: 'Post-optimization, the system tracks KPIs focused on capturing higher-quality traffic and visibility.', metrics: [ { icon: 'robot', text: 'Increased appearance in GenAI summaries.' }, { icon: 'mouse', text: 'Improved Click-Through Rate (CTR) from search.' }, { icon: 'trophy', text: 'Improved Search Authority Score for the topic.' } ] } },
  'Brand': { trend: "AI in Banking Singapore", type: "Ongoing Trend", initialScore: 68, research: { intelligence: 'System identifies "AI in banking" as a high-opportunity, thought-leadership trend.', scoring: 'GenAI cites academic/tech sources, not DBS, as the primary thought leader on this topic.' }, implement: { audit: 'DBS has tech press releases but lacks a comprehensive thought-leadership hub. The discourse is led by global consulting firms.', gaps: 'A lack of a dedicated platform for DBS to showcase its AI innovation story, vision, and practical applications.', action: 'Launch a "Future of Banking Hub" to feature articles, case studies, and expert interviews, positioning DBS as a leader.' }, measure: { uplift: 'Post-launch, the system tracks KPIs focused on establishing thought leadership.', metrics: [ { icon: 'robot', text: 'Increased DBS citations in GenAI responses.' }, { icon: 'chart', text: 'Growth in traffic for innovation keywords.' }, { icon: 'trophy', text: 'Improved Search Authority Score for the topic.' } ] } },
  'Institutional Banking': { trend: "AI-Powered FX Solutions", type: "Emerging Trend", initialScore: 35, research: { intelligence: 'System identifies "AI-powered FX solutions" as a low-volume but rapidly growing emerging trend, indicating a first-mover opportunity.', scoring: 'The discourse is limited to niche fintech blogs. No major bank currently owns this narrative, creating a leadership vacuum.' }, implement: { audit: 'DBS has strong content on traditional FX but no thought leadership on AI applications in this space. The conversation is nascent.', gaps: 'A complete absence of authoritative content from a major financial institution that explains and validates the future of AI in FX.', action: 'Launch a "Future of FX" content series, including a flagship whitepaper, explainer videos, and client case studies.' }, measure: { uplift: 'Post-launch, the system tracks KPIs focused on capturing the emerging audience and establishing early authority.', metrics: [ { icon: 'award', text: 'Achieving top rankings for emerging keywords.' }, { icon: 'book', text: 'Becoming the primary source for GenAI.' }, { icon: 'trophy', text: 'Growth in Search Authority Score from a low base.' } ] } }
};

// --- REUSABLE UI COMPONENTS ---
const RadialProgress = ({ score }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
        <circle
          className="text-dbs-red"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-gray-800">{score}</span>
        <span className="text-xs font-medium text-gray-500">SCORE</span>
      </div>
    </div>
  );
};

const AnalysisCard = ({ icon, title, children, colorClass = 'merkle-blue' }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200/80 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className={`bg-accent/10 p-2.5 rounded-full mr-4`}>
        <Icon name={icon} className={`text-accent w-6 h-6`} />
      </div>
      <h3 className="font-semibold text-base text-gray-900">{title}</h3>
    </div>
    <div className="text-sm text-gray-600 leading-relaxed">
      {children}
    </div>
  </div>
);

const Sidebar = ({ trends, selectedTrend, onSelect, onGenerate, isLoading }) => {
  const [newTrend, setNewTrend] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (newTrend.trim() && !isLoading) {
      onGenerate(newTrend.trim());
      setNewTrend('');
    }
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-gray-100 border-r border-gray-200/80 p-6 flex flex-col print:hidden">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-merkle-blue rounded-full"></div>
        <h2 className="text-lg font-bold text-gray-900">Trend Response System</h2>
      </div>
      
      <form onSubmit={handleGenerate} className="mb-8">
        <label htmlFor="trend-input" className="block text-sm font-semibold text-gray-600 mb-2">Generate New Trend Analysis</p>
        <div className="flex gap-2">
          <input
            id="trend-input"
            type="text"
            value={newTrend}
            onChange={(e) => setNewTrend(e.target.value)}
            placeholder="e.g., Digital Trade Financing"
            className="flex-grow p-3 bg-white border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-accent text-white w-12 h-12 rounded-full font-semibold hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
            disabled={isLoading || !newTrend.trim()}
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
          </button>
        </div>
      </form>

      <h3 className="text-sm font-semibold text-gray-600 mb-3 px-3">Example Scenarios</h3>
      <div className="flex-grow overflow-y-auto -mr-3 pr-3 space-y-1">
        {Object.values(trends).map(t => (
          <button
            key={t.trend}
            onClick={() => onSelect(t.trend)}
            className={`w-full text-left p-3 rounded-xl transition-all duration-200 text-sm ${selectedTrend === t.trend ? 'bg-accent/10 text-accent' : 'hover:bg-gray-200/60 text-gray-600'}`}
          >
            <span className="block font-semibold text-gray-800">{t.trend}</span>
            <span className="text-xs text-gray-500">{t.type}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [trends, setTrends] = useState(initialTrendData);
  const [selectedTrend, setSelectedTrend] = useState("Retiring During Recession");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeData = useMemo(() => Object.values(trends).find(t => t.trend === selectedTrend), [trends, selectedTrend]);
  
  const handleGenerateTrend = async (userInput) => {
    setIsLoading(true);
    setError(null);

    const prompt = `Analyze the banking trend "${userInput}" for DBS Bank in Singapore. Provide a detailed analysis. The tone should be professional and strategic. The initialScore should be a number between 30 and 80. The metrics icons should be chosen from this list: 'chart', 'comments', 'trophy', 'robot', 'mouse', 'award', 'book'.`;
    
    const generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          trend: { type: "STRING" },
          type: { type: "STRING", enum: ["Emerging Trend", "Established Trend", "Ongoing Trend"] },
          initialScore: { type: "NUMBER" },
          research: { type: "OBJECT", properties: { intelligence: { type: "STRING" }, scoring: { type: "STRING" } } },
          implement: { type: "OBJECT", properties: { audit: { type: "STRING" }, gaps: { type: "STRING" }, action: { type: "STRING" } } },
          measure: { type: "OBJECT", properties: { uplift: { type: "STRING" }, metrics: { type: "ARRAY", items: { type: "OBJECT", properties: { icon: { type: "STRING" }, text: { type: "STRING" } } } } } }
        }
      }
    };

    try {
      const apiKey = ""; // Left empty as per instructions
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        const newTrendData = JSON.parse(generatedText);
        const uniqueTrendName = newTrendData.trend || userInput;
        
        setTrends(prev => ({ ...prev, [uniqueTrendName]: { ...newTrendData, trend: uniqueTrendName } }));
        setSelectedTrend(uniqueTrendName);
      } else {
        throw new Error("No content generated. The response may have been blocked.");
      }
    } catch (e) {
      console.error("Error generating trend:", e);
      setError("Failed to generate analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Trend Data...</h2>
          <p>If this persists, please refresh the page.</p>
        </div>
      </div>
    );
  }

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
        .bg-accent\\/10 { background-color: color-mix(in srgb, var(--color-accent) 10%, transparent); }
        .ring-accent { ring-color: var(--color-accent); }
        .text-dbs-red { color: var(--color-dbs-red); }
        
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-hidden { display: none; }
          .print-container { box-shadow: none !important; border: none !important; }
          .print-break-inside-avoid { break-inside: avoid; }
        }
      `}</style>
      
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar 
          trends={trends}
          selectedTrend={selectedTrend}
          onSelect={setSelectedTrend}
          onGenerate={handleGenerateTrend}
          isLoading={isLoading}
        />
        
        <main className="flex-grow p-6 sm:p-10">
          <header className="flex flex-wrap justify-between items-center gap-4 mb-10 print-hidden">
            <div>
              <p className="text-sm font-semibold text-accent">{activeData.type}</p>
              <h1 className="text-3xl font-bold text-gray-900">"{activeData.trend}"</h1>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full font-semibold hover:bg-gray-200/60 transition-colors"
            >
              <Icon name="print" className="w-5 h-5" />
              Generate Report
            </button>
          </header>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">{error}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Stage 1: Research */}
            <div className="space-y-8 print-break-inside-avoid">
              <h2 className="text-lg font-bold text-gray-500 tracking-wider uppercase">1. Research</h2>
              <AnalysisCard icon="lightbulb" title="Trend Intelligence" colorClass="accent">
                <p>{activeData.research.intelligence}</p>
              </AnalysisCard>
              <div className="text-center bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
                <h3 className="font-semibold text-base text-gray-900 mb-4">Initial Authority Score</h3>
                <RadialProgress score={activeData.initialScore} />
                <p className="text-sm text-gray-600 mt-4">{activeData.research.scoring}</p>
              </div>
            </div>

            {/* Stage 2: Implement */}
            <div className="space-y-8 print-break-inside-avoid">
              <h2 className="text-lg font-bold text-gray-500 tracking-wider uppercase">2. Implement</h2>
              <AnalysisCard icon="search" title="Content & Perception Audit" colorClass="accent">
                <p>{activeData.implement.audit}</p>
              </AnalysisCard>
              <AnalysisCard icon="warning" title="Identified Gaps" colorClass="dbs-red">
                <p>{activeData.implement.gaps}</p>
              </AnalysisCard>
              <AnalysisCard icon="wrench" title="Action & Optimization" colorClass="accent">
                <p>{activeData.implement.action}</p>
              </An>
            </div>

            {/* Stage 3: Measure */}
            <div className="space-y-8 print-break-inside-avoid">
              <h2 className="text-lg font-bold text-gray-500 tracking-wider uppercase">3. Measure</h2>
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 h-full shadow-sm">
                 <div className="flex items-center mb-4">
                    <div className="bg-accent/10 p-2.5 rounded-full mr-4">
                        <Icon name="measure" className="text-accent w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-base text-gray-900">Measure Uplift</h3>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-6">{activeData.measure.uplift}</p>
                    <div className="space-y-4">
                      {activeData.measure.metrics.map((metric, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 mr-3 text-center">
                            <Icon name={metric.icon} className="text-accent w-6 h-6" />
                          </div>
                          <p className="font-medium text-gray-700 text-sm">{metric.text}</p>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
