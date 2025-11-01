import {atom} from 'jotai';
import { ILoginResponseDTO } from '~/services/auth/types/auth.dtos';

export interface TokenDetails {
  token: string;
  expiresAt?: Date | null;
}
export const tokenAtom = atom<TokenDetails | null>(null);

export class UserAtom extends ILoginResponseDTO{
  
}


export const userAtom = atom<UserAtom | null>(null);