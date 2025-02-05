export interface Message {
  type: 'user' | 'bot';
  content: string;
  options?: string[];
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  emergencyContacts: {
    police: string;
    floodControl: string;
    emergencyServices: string;
  };
}