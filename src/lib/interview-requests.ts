export interface InterviewRequest {
  id: string;
  candidateName: string;
  candidateId?: string | number;
  clientName: string;
  clientEmail: string;
  companyName: string;
  phoneNumber: string;
  message: string;
  projectName?: string;
  requestDate: string;
  status: 'pending' | 'contacted' | 'closed';
}

const STORAGE_KEY = 'capaciti_interview_requests';

export const getInterviewRequests = (): InterviewRequest[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return []; // Return empty array - no mock data
  }
  
  return JSON.parse(stored);
};

export const addInterviewRequest = (request: Omit<InterviewRequest, 'id' | 'requestDate' | 'status'>): InterviewRequest => {
  const newRequest: InterviewRequest = {
    ...request,
    id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    requestDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  
  const requests = getInterviewRequests();
  requests.unshift(newRequest); // Add to beginning of array
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  
  return newRequest;
};

export const updateInterviewRequestStatus = (id: string, status: InterviewRequest['status']): void => {
  const requests = getInterviewRequests();
  const index = requests.findIndex(req => req.id === id);
  
  if (index !== -1) {
    requests[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }
};