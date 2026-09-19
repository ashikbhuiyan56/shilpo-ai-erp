import React, { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { ProblemSection } from './components/public/ProblemSection';
import { WhyAiSection } from './components/public/WhyAiSection';
import { SolutionSection } from './components/public/SolutionSection';
import { HowItWorks } from './components/public/HowItWorks';
import { ErpModulesShowcase } from './components/public/ErpModulesShowcase';
import { CompetitionSection } from './components/public/CompetitionSection';
import { MarketSection } from './components/public/MarketSection';
import { BusinessModel } from './components/public/BusinessModel';
import { GoToMarket } from './components/public/GoToMarket';
import { TractionStatus } from './components/public/TractionStatus';
import { TeamSection } from './components/public/TeamSection';
import { RoadmapSection } from './components/public/RoadmapSection';
import { WhyNowSection } from './components/public/WhyNowSection';
import { PilotSection } from './components/public/PilotSection';
import { PilotModal } from './components/public/PilotModal';
import { Footer } from './components/public/Footer';

// Demo components
import { DemoHeader } from './components/demo/DemoHeader';
import { DemoSidebar } from './components/demo/DemoSidebar';
import { DemoOverview } from './components/demo/views/DemoOverview';
import { DemoFactoryDataEntry } from './components/demo/views/DemoFactoryDataEntry';
import { DemoAiRiskCenter } from './components/demo/views/DemoAiRiskCenter';
import { DemoQualityIntelligence } from './components/demo/views/DemoQualityIntelligence';
import { DemoProductionForecast } from './components/demo/views/DemoProductionForecast';
import { DemoCapacityNetwork, SubcontractRequestPayload } from './components/demo/views/DemoCapacityNetwork';
import { DemoCopilot } from './components/demo/views/DemoCopilot';
import { DemoTrustAudit } from './components/demo/views/DemoTrustAudit';
import { DemoSecondaryModules } from './components/demo/views/DemoSecondaryModules';
import { PresentationModeOverlay } from './components/demo/PresentationModeOverlay';

import { DemoTab } from './types';
import { 
  FactoryDataInput, 
  AiAnalysisResult, 
  calculateFactoryRisk 
} from './utils/factoryAiEngine';
import { ThemeProvider, useOfficeTheme } from './context/ThemeContext';

const INITIAL_FACTORY_DATA: FactoryDataInput = {
  orderNumber: 'BD-2048',
  buyerName: 'Nordic Apparel Co.',
  category: 'Knitwear',
  orderQuantity: 45000,
  daysRemaining: 14,
  currentProduction: 18500,
  dailyCapacity: 607,
  inventoryTrimsPercent: 45,
  fabricStatus: 'In Transit / Delayed',
  defectRate: 3.5,
  majorDefects: ['Skipped Stitch', 'Shade Variation'],
  shipmentStatus: 'Port Feeder at Risk',
};

function MainApp() {
  const [currentView, setCurrentView] = useState<'website' | 'demo'>('website');
  const [demoTab, setDemoTab] = useState<DemoTab>('overview');
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [selectedFactory, setSelectedFactory] = useState('Apex Horizon Apparels - Unit 2');
  const [subcontractRequest, setSubcontractRequest] = useState<SubcontractRequestPayload | null>(null);

  // Global shared state for Factory Data Entry <-> AI Risk Center
  const [factoryDataInput, setFactoryDataInput] = useState<FactoryDataInput>(INITIAL_FACTORY_DATA);
  const [activeAnalysisResult, setActiveAnalysisResult] = useState<AiAnalysisResult>(() => 
    calculateFactoryRisk(INITIAL_FACTORY_DATA)
  );

  // Handle URL hash changes or back buttons if applicable
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleOpenDemo = (tab?: string) => {
    if (tab && ['overview', 'data-entry', 'orders', 'production', 'inventory', 'procurement', 'risk-center', 'quality', 'forecast', 'capacity', 'logistics', 'finance', 'hr-payroll', 'copilot', 'trust', 'settings'].includes(tab)) {
      setDemoTab(tab as DemoTab);
    } else {
      setDemoTab('overview');
    }
    setCurrentView('demo');
  };

  const handleBackToPublic = () => {
    setCurrentView('website');
  };

  const { theme } = useOfficeTheme();

  const websiteBg = theme === 'purple'
    ? 'bg-[#170329] text-[#FAF5FF]'
    : theme === 'slate'
    ? 'bg-[#0B1120] text-[#F8FAFC]'
    : theme === 'navy'
    ? 'bg-[#071326] text-[#F8FAFC]'
    : 'bg-[#F5F8FC] text-[#172033]';

  return (
    <div className={`min-h-screen selection:bg-purple-500/20 selection:text-purple-300 ${websiteBg}`}>
      {currentView === 'website' ? (
        /* ================= PUBLIC SAAS WEBSITE ================= */
        <div className="relative overflow-x-hidden">
          <Navbar
            onOpenDemo={() => handleOpenDemo('overview')}
            onOpenPilot={() => setIsPilotModalOpen(true)}
            onOpenPresentation={() => setIsPresentationOpen(true)}
          />

          <main id="main-content">
            <Hero
              onOpenDemo={() => handleOpenDemo('overview')}
              onOpenPilot={() => setIsPilotModalOpen(true)}
            />

            <ProblemSection />

            <WhyAiSection />

            <SolutionSection onOpenDemo={handleOpenDemo} />

            <HowItWorks onOpenDemo={handleOpenDemo} />

            <ErpModulesShowcase onOpenDemo={handleOpenDemo} />

            <CompetitionSection />

            <MarketSection />

            <BusinessModel />

            <GoToMarket />

            <TractionStatus onOpenPilot={() => setIsPilotModalOpen(true)} />

            <TeamSection />

            <RoadmapSection />

            <WhyNowSection />

            <PilotSection onOpenDemo={() => handleOpenDemo('overview')} />
          </main>

          <Footer
            onOpenDemo={() => handleOpenDemo('overview')}
            onOpenPilot={() => setIsPilotModalOpen(true)}
          />
        </div>
      ) : (
        /* ================= INTERACTIVE PRODUCT DEMO (COMMAND CENTER) ================= */
        <div className="h-screen flex flex-col overflow-hidden bg-[#F5F8FC] text-[#172033]">
          <DemoHeader
            activeTab={demoTab}
            onTabChange={setDemoTab}
            onBackToPublic={handleBackToPublic}
            onStartPresentation={() => setIsPresentationOpen(true)}
            selectedFactory={selectedFactory}
            onFactoryChange={setSelectedFactory}
          />

          <div className="flex-1 flex overflow-hidden">
            <DemoSidebar
              activeTab={demoTab}
              onTabChange={setDemoTab}
            />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F5F8FC] text-[#172033]">
              {demoTab === 'overview' && (
                <DemoOverview
                  onNavigate={setDemoTab}
                  selectedFactory={selectedFactory}
                />
              )}

              {demoTab === 'data-entry' && (
                <DemoFactoryDataEntry
                  onNavigate={setDemoTab}
                  currentDataInput={factoryDataInput}
                  onUpdateDataInput={setFactoryDataInput}
                  onUpdateAnalysisResult={setActiveAnalysisResult}
                  onSelectCapacityMatch={(payload) => {
                    setSubcontractRequest(payload);
                    setDemoTab('capacity');
                  }}
                />
              )}

              {demoTab === 'risk-center' && (
                <DemoAiRiskCenter
                  onNavigate={setDemoTab}
                  activeAnalysisResult={activeAnalysisResult}
                  activeDataInput={factoryDataInput}
                  onUpdateDataInput={(updated) => {
                    setFactoryDataInput(updated);
                    setActiveAnalysisResult(calculateFactoryRisk(updated));
                  }}
                  onSelectCapacityMatch={(payload) => {
                    setSubcontractRequest(payload);
                    setDemoTab('capacity');
                  }}
                />
              )}

              {demoTab === 'quality' && (
                <DemoQualityIntelligence
                  onNavigate={setDemoTab}
                  currentDefectRate={factoryDataInput.defectRate}
                  activeOrderNumber={factoryDataInput.orderNumber}
                  activeBuyer={factoryDataInput.buyerName}
                  onUpdateDefectRate={(newRate) => {
                    const updatedInput = { ...factoryDataInput, defectRate: newRate };
                    setFactoryDataInput(updatedInput);
                    setActiveAnalysisResult(calculateFactoryRisk(updatedInput));
                  }}
                />
              )}

              {demoTab === 'forecast' && (
                <DemoProductionForecast
                  onNavigate={setDemoTab}
                />
              )}

              {demoTab === 'capacity' && (
                <DemoCapacityNetwork
                  onNavigate={setDemoTab}
                  subcontractRequest={subcontractRequest}
                />
              )}

              {demoTab === 'copilot' && (
                <DemoCopilot
                  onNavigate={setDemoTab}
                />
              )}

              {demoTab === 'trust' && (
                <DemoTrustAudit
                  onNavigate={setDemoTab}
                />
              )}

              {['orders', 'production', 'inventory', 'procurement', 'logistics', 'finance', 'hr-payroll', 'settings'].includes(demoTab) && (
                <DemoSecondaryModules
                  tab={demoTab}
                  onNavigate={setDemoTab}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Floating Schedule a Call Widget (Matching SAP Reference Design from photo) */}
      {currentView === 'website' && (
        <button
          onClick={() => setIsPilotModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-white hover:bg-slate-50 text-purple-700 font-bold px-4 py-2.5 rounded-full shadow-2xl shadow-purple-950/40 border border-purple-200 flex items-center gap-2 text-xs sm:text-sm hover:shadow-purple-900/50 hover:scale-105 transition-all cursor-pointer"
          title="Schedule a Call with RMG Consultant"
        >
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
            <PhoneCall className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <span>Schedule a Call</span>
        </button>
      )}

      {/* Pilot Request Modal */}
      <PilotModal
        isOpen={isPilotModalOpen}
        onClose={() => setIsPilotModalOpen(false)}
      />

      {/* Executive Presentation Pitch Mode Carousel */}
      <PresentationModeOverlay
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        onSelectTab={(tab) => {
          setDemoTab(tab);
          setCurrentView('demo');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

