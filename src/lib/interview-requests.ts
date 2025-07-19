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
    // Initialize with mock data if no requests exist
    const mockRequests: InterviewRequest[] = [
      {
        id: 'mock-1',
        candidateName: "Sarah Johnson",
        clientName: "John Doe",
        clientEmail: "john.doe@techcorp.com",
        companyName: "TechCorp Solutions",
        phoneNumber: "+27 11 123 4567",
        projectName: "EcoTracker Mobile App",
        requestDate: "2024-01-15",
        status: "pending",
        message: "Impressed with Sarah's frontend development skills. Would like to discuss potential React Developer position."
      },
      {
        id: 'mock-2',
        candidateName: "Michael Chen",
        clientName: "Jane Smith",
        clientEmail: "hiring@dataflow.com",
        companyName: "DataFlow Inc",
        phoneNumber: "+27 21 987 6543",
        projectName: "SmartFinance Dashboard",
        requestDate: "2024-01-14",
        status: "contacted",
        message: "Michael's work on the dashboard backend is excellent. Interested in discussing backend engineer role."
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRequests));
    return mockRequests;
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