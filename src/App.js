import React, { useState, useMemo } from 'react';

// --- DATA STORE ---
// This object holds all the data for the different scenarios.
// In a real application, this would come from an API.
const trendData = {
  'Consumer Banking': {
    trend: "Retiring During Recession",
    type: "Emerging Trend",
    initialScore: 49,
    research: {
      intelligence: 'System identifies a rising volume of searches and conversations around "retiring during recession."',
      scoring: 'DBS does not consistently rank high in search and GenAI results, indicating a significant visibility gap.'
    },
    implement: {
      audit: 'Existing DBS content on retirement planning is reviewed for relevance. Public discourse on Reddit and forums shows low association between DBS and this specific topic.',
      gaps: 'No dedicated content exists on the DBS site for "retiring during recession in Singapore." This is a major content gap.',
      action: 'Based on the audit, DBS implements technical and content recommendations, including creating a new, structured article optimized for GenAI extraction.'
    },
    measure: {
      uplift: 'Post-implementation, the system tracks KPIs to quantify the impact of the new content.',
      metrics: [
        { icon: 'fas fa-arrow-trend-up', text: 'Increased web traffic to the new article.' },
        { icon: 'fas fa-comments', text: 'Growth in GenAI citations and positive mentions.' },
        { icon: 'fas fa-trophy', text: 'Improved Search Authority Score for the topic.' }
      ]
    }
  },
  'SME Banking': {
    trend: "Low-Interest SME Loans",
    type: "Established Trend",
    initialScore: 72,
    research: {
      intelligence: 'System identifies "low-interest SME loans" as a high-volume, highly competitive search trend.',
      scoring: 'DBS has existing content and ranks, but is often outranked by competitors and aggregators. Content is not optimized for GenAI.'
    },
    implement: {
      audit: 'The existing DBS page is a standard product page, not structured to answer user questions. Competitors offer comprehensive guides and comparison tools.',
      gaps: 'The content lacks answer-oriented structure (Q&A, tables) and schema markup, making it difficult for GenAI to extract and feature.',
      action: 'Re-structure the existing page with a Q&A section, add comparison tables against competitors, and implement FAQ schema.'
    },
    measure: {
      uplift: 'Post-optimization, the system tracks KPIs focused on capturing higher-quality traffic and visibility.',
      metrics: [
        { icon: 'fas fa-robot', text: 'Increased appearance in GenAI summaries.' },
        { icon: 'fas fa-mouse-pointer', text: 'Improved Click-Through Rate (CTR) from search.' },
        { icon: 'fas fa-trophy', text: 'Improved Search Authority Score for the topic.' }
      ]
    }
  },
  'Brand': {
    trend: "AI in Banking Singapore",
    type: "Ongoing Trend",
    initialScore: 68,
    research: {
      intelligence: 'System identifies "AI in banking" as a high-opportunity, thought-leadership trend.',
      scoring: 'GenAI cites academic/tech sources, not DBS, as the primary thought leader on this topic.'
    },
    implement: {
      audit: 'DBS has tech press releases but lacks a comprehensive thought-leadership hub. The discourse is led by global consulting firms.',
      gaps: 'A lack of a dedicated platform for DBS to showcase its AI innovation story, vision, and practical applications.',
      action: 'Launch a "Future of Banking Hub" to feature articles, case studies, and expert interviews, positioning DBS as a leader.'
    },
    measure: {
      uplift: 'Post-launch, the system tracks KPIs focused on establishing thought leadership.',
      metrics: [
        { icon: 'fas fa-robot', text: 'Increased DBS citations in GenAI responses.' },
        { icon: 'fas fa-arrow-trend-up', text: 'Growth in traffic for innovation keywords.' },
        { icon: 'fas fa-trophy', text: 'Improved Search Authority Score for the topic.' }
      ]
    }
  },
  'Institutional Banking': {
    trend: "AI-Powered FX Solutions",
    type: "Emerging Trend",
    initialScore: 35,
    research: {
      intelligence: 'System identifies "AI-powered FX solutions" as a low-volume but rapidly growing emerging trend, indicating a first-mover opportunity.',
      scoring: 'The discourse is limited to niche fintech blogs. No major bank currently owns this narrative, creating a leadership vacuum.'
    },
    implement: {
      audit: 'DBS has strong content on traditional FX but no thought leadership on AI applications in this space. The conversation is nascent.',
      gaps: 'A complete absence of authoritative content from a major financial institution that explains and validates the future of AI in FX.',
      action: 'Launch a "Future of FX" content series, including a flagship whitepaper, explainer videos, and client case studies.'
    },
    measure: {
      uplift: 'Post-launch, the system tracks KPIs focused on capturing the emerging audience and establishing early authority.',
      metrics: [
        { icon: 'fas fa-award', text: 'Achieving top rankings for emerging keywords.' },
        { icon: 'fas fa-book-open', text: 'Becoming the primary source for GenAI.' },
        { icon: 'fas fa-trophy', text: 'Growth in Search Authority Score from a low base.' }
      ]
    }
  }
};

// --- REUSABLE COMPONENTS ---

// InfoCard: A generic card for displaying information chunks.
const InfoCard = ({ icon, title, children, colorClass = 'merkle-blue' }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-200 h-full">
    <div className="flex items-center mb-3">
      <i className={`${icon} text-${colorClass} text-xl mr-3 w-6 text-center`}></i>
      <h3 className={`font-bold text-lg text-gray-800`}>{title}</h3>
    </div>
    <div className="text-sm text-gray-600 pl-9">
      {children}
    </div>
  </div>
);

// ScoreCard: A specific card for displaying the authority score.
const ScoreCard = ({ score }) => (
  <div className="bg-white p-5 rounded-lg border-2 border-dbs-red">
    <div className="flex items-center mb-3">
      <i className="fas fa-tachometer-alt text-dbs-red text-xl mr-3 w-6 text-center"></i>
      <h3 className="font-bold text-lg text-dbs-red">Initial Authority Score</h3>
    </div>
    <p className="text-6xl font-extrabold text-dbs-red text-center my-3">{score}</p>
  </div>
);

// StageColumn: A column for each stage of the process.
const StageColumn = ({ title, bgColor, children }) => (
  <div className="flex flex-col space-y-5">
    <div className="text-center">
      <div className={`inline-block ${bgColor} text-white font-bold py-2 px-8 rounded-md shadow-md`}>
        {title}
      </div>
    </div>
    {children}
  </div>
);


// --- MAIN APP COMPONENT ---

export default function App() {
  const [selectedBU, setSelectedBU] = useState('Consumer Banking');
  const activeData = useMemo(() => trendData[selectedBU], [selectedBU]);

  const businessUnits = Object.keys(trendData);

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-8">
      <style>{`
        /* Custom Brand Colors */
        .bg-merkle-blue { background-color: #12285d; }
        .text-merkle-blue { color: #12285d; }
        .border-merkle-blue { border-color: #12285d; }
        .bg-dbs-red { background-color: #D71E28; }
        .text-dbs-red { color: #D71E28; }
        .border-dbs-red { border-color: #D71E28; }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="w-full max-w-7xl mx-auto bg-white p-6 sm:p-10 rounded-xl border border-gray-200">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Trend Response System</h1>
          <p className="text-lg sm:text-xl text-gray-500">Interactive Demo</p>
        </header>

        {/* Control Panel */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {businessUnits.map(bu => (
              <button
                key={bu}
                onClick={() => setSelectedBU(bu)}
                className={`py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${selectedBU === bu ? 'bg-merkle-blue text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {bu}
              </button>
            ))}
          </div>
        </div>
        
        {/* Dynamic Trend Header */}
        <div className="text-center mb-12 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-semibold text-merkle-blue">{activeData.type}</p>
            <h2 className="text-2xl font-bold text-dbs-red">"{activeData.trend}"</h2>
        </div>


        {/* Main Grid for Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Stage 1: Research */}
          <StageColumn title="1. Research" bgColor="bg-merkle-blue">
            <InfoCard icon="fas fa-lightbulb" title="Trend Intelligence" colorClass="merkle-blue">
              <p>{activeData.research.intelligence}</p>
            </InfoCard>
            <ScoreCard score={activeData.initialScore} />
             <InfoCard icon="fas fa-magnifying-glass-chart" title="Finding" colorClass="dbs-red">
              <p>{activeData.research.scoring}</p>
            </InfoCard>
          </StageColumn>

          {/* Stage 2: Implement */}
          <StageColumn title="2. Implement" bgColor="bg-merkle-blue">
            <InfoCard icon="fas fa-search-plus" title="Content & Perception Audit" colorClass="merkle-blue">
              <p>{activeData.implement.audit}</p>
            </InfoCard>
            <InfoCard icon="fas fa-exclamation-triangle" title="Identified Gaps" colorClass="dbs-red">
              <p>{activeData.implement.gaps}</p>
            </InfoCard>
            <InfoCard icon="fas fa-wrench" title="Action & Optimization" colorClass="merkle-blue">
              <p>{activeData.implement.action}</p>
            </InfoCard>
          </StageColumn>

          {/* Stage 3: Measure */}
          <StageColumn title="3. Measure" bgColor="bg-dbs-red">
            <InfoCard icon="fas fa-chart-line" title="Measure Uplift" colorClass="dbs-red">
              <p className="mb-4">{activeData.measure.uplift}</p>
              <div className="space-y-3">
                {activeData.measure.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center">
                    <i className={`${metric.icon} fa-lg mr-3 text-dbs-red w-6 text-center`}></i>
                    <p className="font-semibold text-gray-700">{metric.text}</p>
                  </div>
                ))}
              </div>
            </InfoCard>
          </StageColumn>

        </div>
      </div>
    </div>
  );
}
