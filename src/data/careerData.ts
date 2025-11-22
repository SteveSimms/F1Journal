export interface CareerStep {
  id: string;
  title: string;
  ageRange: string;
  description: string;
  costEstimate: string;
  requirements: string[];
  tips: string[];
  category: 'Karting' | 'Single Seater' | 'Professional';
}

export const careerPath: CareerStep[] = [
  {
    id: 'karting-bambino',
    title: 'Karting: Bambino / Kid Karts',
    ageRange: '5-8 years',
    description: 'The absolute beginning. Focus is on safety, basic controls (gas/brake), and learning track rules. Speeds are low (top ~30-40mph).',
    costEstimate: '$1,500 - $5,000 / year (Club Level)',
    requirements: [
      'Age 5-8',
      'Safety Gear (Helmet, Neck Brace, Suit)',
      'Club Membership'
    ],
    tips: [
      'Start with "Arrive & Drive" sessions to test interest.',
      'Join a local club for structured practice.',
      'Focus on fun and safety over winning initially.'
    ],
    category: 'Karting'
  },
  {
    id: 'karting-cadet',
    title: 'Karting: Cadet / Mini Class',
    ageRange: '8-12 years',
    description: 'The first true competitive step. Drivers race 60cc engines. This is where future champions learn racecraft, overtaking, and lines.',
    costEstimate: '$10,000 - $50,000+ / year',
    requirements: [
      'National Competition License',
      'Own Kart (60cc)',
      'Mechanic/Support (often family)'
    ],
    tips: [
      'Seat time is king—practice every weekend.',
      'Enter regional championships.',
      'Data analysis starts here (MyChron/Alfano gauges).'
    ],
    category: 'Karting'
  },
  {
    id: 'karting-junior',
    title: 'Karting: OK-Junior / Junior Rotax',
    ageRange: '12-15 years',
    description: 'Serious international competition. Karts are faster (125cc), grippier, and physical. Drivers race in Europe (WSK, CIK-FIA) against the world\'s best.',
    costEstimate: '$100,000 - $200,000+ / year',
    requirements: [
      'International C-Junior License',
      'Professional Team Affiliation',
      'Homeschooling often required for travel'
    ],
    tips: [
      'Move to Europe (Italy) if serious about F1.',
      'Physical fitness becomes mandatory.',
      'Start scouting for management.'
    ],
    category: 'Karting'
  },
  {
    id: 'f4',
    title: 'Formula 4 (F4)',
    ageRange: '15+ years',
    description: 'First step in single-seaters. Slicks and wings. The car is a "spec" car to highlight driver talent. Series like Italian F4 and British F4 are most competitive.',
    costEstimate: '$150,000 - $450,000 / season',
    requirements: [
      'FIA International Grade D License',
      'Minimum Age 15',
      'Completion of Karting Career'
    ],
    tips: [
      'Test extensively before the season starts.',
      'Choose a top team (Prema, Van Amersfoort, Carlin) if budget allows.',
      'Win or podium consistently to get noticed.'
    ],
    category: 'Single Seater'
  },
  {
    id: 'f3',
    title: 'FIA Formula 3',
    ageRange: '16-19 years',
    description: 'Global series supporting F1 races. High downforce, DRS, and massive pressure. 30 cars on the grid, very aggressive racing.',
    costEstimate: '$1.2M - $2M / season',
    requirements: [
      'FIA International Grade C License',
      'Success in F4 or Formula Regional'
    ],
    tips: [
      'Qualifying is everything—overtaking is hard.',
      'Learn tire management (Pirelli rubber degrades fast).',
      'You need to be in a top academy (Red Bull, Ferrari, Alpine, etc.) by now.'
    ],
    category: 'Single Seater'
  },
  {
    id: 'f2',
    title: 'FIA Formula 2',
    ageRange: '18-22 years',
    description: 'The final hurdle. Cars are nearly as fast as F1 cars in corners. Complex strategy, pit stops, and carbon brakes.',
    costEstimate: '$2M - $4M / season',
    requirements: [
      'FIA International Grade B License',
      'Success in F3'
    ],
    tips: [
      'Consistency wins championships.',
      'You need 40 Super License points to race in F1.',
      'Networking in the F1 paddock is crucial.'
    ],
    category: 'Single Seater'
  },
  {
    id: 'f1',
    title: 'Formula 1 Driver',
    ageRange: '20+ years',
    description: 'The pinnacle. 20 seats. The fastest circuit racers on Earth.',
    costEstimate: 'Earns $1M - $50M+ / year',
    requirements: [
      'FIA Super License (40 Points)',
      'Valid F1 Contract',
      'Age 18+'
    ],
    tips: [
      'Be ready for the media storm.',
      'Deliver immediately—you don\'t get much time.',
      'Outperform your teammate.'
    ],
    category: 'Professional'
  }
];
