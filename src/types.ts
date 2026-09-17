export type ViewMode = 'public' | 'demo';

export type DemoTab = 
  | 'overview'
  | 'data-entry'
  | 'orders'
  | 'production'
  | 'risk-center'
  | 'quality'
  | 'forecast'
  | 'capacity'
  | 'copilot'
  | 'trust'
  | 'inventory'
  | 'procurement'
  | 'logistics'
  | 'finance'
  | 'hr-payroll'
  | 'settings';

export interface OrderItem {
  id: string;
  orderNumber: string;
  buyer: string;
  style: string;
  category: 'Knitwear' | 'Woven' | 'Denim' | 'Outerwear' | 'Activewear';
  quantity: number;
  completedUnits: number;
  startDate: string;
  targetShipDate: string;
  status: 'In Production' | 'At Risk' | 'QC Inspection' | 'Ready to Ship' | 'Completed';
  riskScore: number; // 0-100
  riskLevel: 'High' | 'Medium' | 'Low';
  riskReason?: string;
  assignedLines: string[];
  fabricStatus: 'In Stock' | 'Delayed' | 'Partially Received';
}

export interface ProductionLine {
  id: string;
  name: string;
  type: string;
  targetHourly: number;
  currentHourly: number;
  efficiency: number;
  activeOrder: string;
  status: 'Running' | 'Bottleneck' | 'Maintenance' | 'Idle';
  operators: number;
  defectRate: number;
}

export interface DefectItem {
  id: string;
  type: string;
  garmentArea: string;
  confidence: number;
  severity: 'Critical' | 'Major' | 'Minor';
  detectedAt: string;
  lineId: string;
  line?: string;
  orderNumber?: string;
  status: 'Needs Review' | 'Verified' | 'False Positive';
  imageUrl?: string;
  boundingBox: { x: number; y: number; width: number; height: number };
}

export interface CapacityPartner {
  id: string;
  alias: string; // e.g. "Verified Partner #BD-017"
  realName?: string;
  location: string;
  specialization: string;
  availableUnits: number;
  availableFrom: string;
  compatibilityScore: number;
  verificationStatus: string;
  certifications: string[];
  smvRating: number;
  minOrderQty: number;
  isUnlocked?: boolean;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: string;
  orderNumber: string;
  actor: string;
  details: string;
  verificationStatus: string;
  txHash: string;
  blockNumber: number;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  structuredData?: {
    type: 'risk-summary' | 'capacity-match' | 'order-detail' | 'defect-alert';
    title: string;
    items: Array<{ label: string; value: string; badge?: string; badgeColor?: string }>;
    recommendation?: string;
    actions?: Array<{ label: string; actionType: string; payload?: any }>;
  };
}

export interface PilotFormData {
  fullName: string;
  companyName: string;
  role: string;
  email: string;
  phone: string;
  factorySize: string;
  interestedModules: string[];
  message: string;
}
