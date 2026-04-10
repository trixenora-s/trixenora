export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
};

export type Chat = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  model: string;
  createdAt: Date;
};

export type ApiKey = {
  id: string;
  userId: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
};

export type Session = {
  user: User;
  token?: string;
};
