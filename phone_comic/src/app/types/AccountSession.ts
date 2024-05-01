export interface AccountSession {
  username: string;
  member: boolean;
  registerDate: string;
  firstName: string;
  lastName?: string;
  lastChapterRead?: number;
  lastPageRead?: number;
  email: string;
}
