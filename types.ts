
export interface Creator {
  id: string;
  name: string;
  slogan: string;
  avatar: string;
  bio: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Xiaohongshu';
  followers: string;
  engagementRate: number;
  conversionPower: number;
  tags: string[];
  audienceDemographics: {
    category: string;
    value: number;
  }[];
  stats: {
    reach: number;
    engagement: number;
    roi: number;
    consistency: number;
    cooperation: number;
    vitIndex: number; // Visibility, Influence, Trust
  };
  styles: string[];
  scenes: string[];
  targetAudience: string;
  representativeWorks: string[];
  country?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  clientLogo: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  results: string;
  roi: string;
  exposure: string;
}

export interface AISearchResult {
  creators: Creator[];
  aiReasoning: string;
  confidence: number;
}
