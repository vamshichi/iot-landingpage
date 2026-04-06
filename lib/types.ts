export interface FormSubmissionData {
  name: string;
  company: string;
  email: string;
  phone: string;
  interestType: 'attend' | 'sponsor' | 'partner' | 'speak' | 'media' | 'other';
  message?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: FormSubmissionData;
}
