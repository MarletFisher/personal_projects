export interface Account {
  username: string;
  password: string;
  salt: string;
  member: boolean;
  registerDate: string;
  firstName: string;
  lastName?: string;
  lastChapterRead?: number;
  lastPageRead?: number;
  email: string;
}
