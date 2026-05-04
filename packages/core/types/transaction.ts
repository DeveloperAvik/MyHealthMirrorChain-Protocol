export interface Transaction {
  id: string;
  patientId: string;
  payloadHash: string;
  createdAt: number;
  signature: string;
}
