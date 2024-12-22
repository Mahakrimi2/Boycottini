export interface Submission {
  submissionType: string;
  _id?: string;  // Optional because MongoDB generates this on insert
  brandName: string;
  proofURL: string;
  reason: string;  // Optional for boycott
  alternativeOf: string;  // Optional for alternative
}
