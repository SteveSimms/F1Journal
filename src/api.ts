const API_URL = 'http://localhost:8000/api';

export interface SearchResult {
  id?: string;
  title: string;
  description: string;
  age_range?: string;
  cost_estimate?: string;
  requirements?: string[];
  category?: string;
  relevance: number;
}

export interface CareerStep {
  step: string;
  cost: string;
  note?: string;
}

export interface CareerPathResponse {
  profile: {
    age: number;
    budget: number;
    location: string;
  };
  suggested_path: CareerStep[];
  ai_insight: string;
}

export const searchCareerInfo = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching career info:', error);
    return [];
  }
};

export const generateCareerPath = async (age: number, budget: number, location: string): Promise<CareerPathResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/generate-path`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age, budget, location }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.path;
  } catch (error) {
    console.error('Error generating career path:', error);
    return null;
  }
};
