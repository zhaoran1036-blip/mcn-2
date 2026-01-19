
import { Creator, CaseStudy } from './types';

export const MOCK_CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Elena Rossi',
    slogan: 'Capturing every morning of the world.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    bio: 'Luxury travel filmmaker focusing on high-net-worth European destinations and mindful luxury.',
    platform: 'Instagram',
    followers: '1.2M',
    engagementRate: 8.4,
    conversionPower: 92,
    country: 'Italy',
    tags: ['#LuxuryLife', '#Minimalist', '#BoutiqueHotels', '#Cinematic'],
    audienceDemographics: [
      { category: '25-34', value: 45 },
      { category: '35-44', value: 30 },
      { category: '45+', value: 25 },
    ],
    stats: {
      reach: 95,
      engagement: 88,
      roi: 82,
      consistency: 98,
      cooperation: 90,
      vitIndex: 9.2
    },
    styles: ['Cinematic', 'Documentary', 'Aesthetic'],
    scenes: ['Luxury Hotel', 'Alpine Skiing', 'Art Museums'],
    targetAudience: 'High-Net-Worth Parents',
    representativeWorks: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&h=600&q=80',
      'https://images.unsplash.com/photo-1502791444994-479603502c48?auto=format&fit=crop&w=400&h=600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&h=600&q=80',
    ]
  },
  {
    id: '2',
    name: 'Kenzo Chen',
    slogan: 'Adventures beyond the map.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Ex-advertising pro turned adventure vlogger. Specialist in wild camping and extreme expedition storytelling.',
    platform: 'TikTok',
    followers: '2.5M',
    engagementRate: 12.1,
    conversionPower: 85,
    country: 'Thailand',
    tags: ['#WildCamping', '#ExtremeSports', '#TechSavvy', '#Hardcore'],
    audienceDemographics: [
      { category: '18-24', value: 60 },
      { category: '25-34', value: 30 },
      { category: 'Others', value: 10 },
    ],
    stats: {
      reach: 90,
      engagement: 95,
      roi: 78,
      consistency: 85,
      cooperation: 92,
      vitIndex: 8.8
    },
    styles: ['Vlog', 'Aerial', 'Action'],
    scenes: ['Wild Camping', 'Mountains', 'Deserts'],
    targetAudience: 'Gen-Z Adventurers',
    representativeWorks: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&h=600&q=80',
      'https://images.unsplash.com/photo-1533580905137-d734436d451a?auto=format&fit=crop&w=400&h=600&q=80',
      'https://images.unsplash.com/photo-1526491109672-7474bd61c41f?auto=format&fit=crop&w=400&h=600&q=80',
    ]
  },
  {
    id: '3',
    name: 'Sarah & Jack',
    slogan: 'Traveling with three under five.',
    avatar: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=800&q=80',
    bio: 'The ultimate family travel guide. Helping parents navigate the world with children effortlessly.',
    platform: 'YouTube',
    followers: '800K',
    engagementRate: 6.5,
    conversionPower: 95,
    country: 'United Kingdom',
    tags: ['#FamilyTravel', '#BabyFriendly', '#ParentingTips', '#HighROI'],
    audienceDemographics: [
      { category: 'Parents', value: 85 },
      { category: 'Educators', value: 10 },
      { category: 'Others', value: 5 },
    ],
    stats: {
      reach: 82,
      engagement: 80,
      roi: 96,
      consistency: 92,
      cooperation: 98,
      vitIndex: 9.5
    },
    styles: ['Warm', 'Educational', 'Authentic'],
    scenes: ['Resorts', 'Theme Parks', 'Cruises'],
    targetAudience: 'Pre-school Parents',
    representativeWorks: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&h=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=600&q=80',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=400&h=600&q=80',
    ]
  }
];

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'swiss-winter',
    client: 'Switzerland Tourism',
    clientLogo: 'https://www.myswitzerland.com/static/images/logo.svg',
    title: 'Redefining the Winter Narrative',
    subtitle: 'Beyond the Slopes',
    image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    tag: 'Destination Branding',
    results: 'Reached 3M+ HNW travelers with 40% search lift.',
    roi: '1:5',
    exposure: '15M+'
  },
  {
    id: 'rosewood-quiet',
    client: 'Rosewood Hotels',
    clientLogo: 'https://images.squarespace-cdn.com/content/v1/568be9c0bfe873658273645b/1452296767699-5H6N8H7G6O8Y/Rosewood+Logo.png',
    title: 'Reclaiming Quiet Luxury',
    subtitle: 'In a Noisy Feed',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    tag: 'Hospitality',
    results: '12 "Old Money" creators generating 1:8 ROI.',
    roi: '1:8',
    exposure: '5M+'
  },
  {
    id: 'qatar-global',
    client: 'Qatar Airways',
    clientLogo: 'https://logos-world.net/wp-content/uploads/2023/01/Qatar-Airways-Logo.png',
    title: 'Global Stories',
    subtitle: 'For a World-Class Journey',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&w=1200&q=80',
    tag: 'Global Campaign',
    results: '65% completion rate across Middle East & China markets.',
    roi: '1:6',
    exposure: '50M+'
  }
];

export const BRANDS = [
  'Emirates', 'Marriott', 'Switzerland Tourism', 'Rimowa', 'Aman Resorts', 'Cathay Pacific'
];
