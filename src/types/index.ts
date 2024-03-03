export type Task = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  ogp_image_url: string;
  ogp_description: string;
};
export type CsrfToken = {
  csrf_token: string;
};
export type Credential = {
  email: string;
  password: string;
};
export type User = {
  id: number;
  email: string;
};
export type Attendance = {
  id: number;
  user_id: number;
  attendance: boolean;
  clock_in_time: Date;
  clock_out_time: Date;
  created_at: Date;
  updated_at: Date;
};
