export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export type Bot = {
  id?: number;
  name: string;
  whatsapp_number?: string;
  config?: any;
};
