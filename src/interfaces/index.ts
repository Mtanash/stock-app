export interface Item {
  _id?: string;
  stock: {
    _id: string;
    name: string;
  };
  name: string;
  dates: {
    _id?: string;
    date: {
      month: number;
      year: number;
    };
    quantity: number;
  }[];
}

export interface Stock {
  _id: string;
  name: string;
}

export interface Date {
  _id?: string;
  date: {
    month: number;
    year: number;
  };
  quantity: number;
}

export interface User {
  _id?: string;
  name: string;
}

export interface RTKQError {
  data: {
    message?: string;
  };
  status: number;
}
