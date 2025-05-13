export type EventProps = {
  _id: string;
  name: string;
  venue: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  eventDate: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type UserProps = {
  _id: string;
  name: string;
  role: string;
};

export type MyBookingProps = {
  _id: string;
  event: EventProps;
  user: UserProps;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};
