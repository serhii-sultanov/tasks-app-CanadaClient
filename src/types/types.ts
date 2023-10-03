export type TDate = {
  createdAt: string;
  updatedAt: string;
};
export type TFile = TDate & {
  _id: string;
  file_description: string;
  file_path: string;
  file_originalName: string;
  file_size: number;
  file_contentType: string;
};

export type TComment = TDate & {
  _id: string;
  user_id: TUser;
  activity_id: string;
  comment: string;
  isSystem: boolean;
  files_id: TFile[];
};

export type TActivity = TDate & {
  _id: string;
  user_id: TUser;
  task_id: TTask;
  activity_comment: string;
  activity_message: string;
  activity_files: TFile[];
};

export enum TaskStatus {
  Waiting = 'waiting for client',
  Review = 'needs review',
  Completed = 'completed',
}

export type TTask = TDate & {
  _id: string;
  task_title: string;
  task_description: string;
  task_files: TFile[];
  task_comments: TComment[];
  status: TaskStatus;
};

export type TTaskList = TDate & {
  _id: string;
  user_id: TUser;
  task_list_name: string;
  task_list: TTask[];
};

export type TUser = TDate & {
  _id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  taskLists: TTaskList[];
  clientBackground: string;
  email: string;
  role: string;
  invitation_accepted: boolean;
};

export type TMessage = {
  message: string;
};

export type TToken = {
  token: string;
};

export type TError = {
  error: string;
  message: string;
  statusCode: number;
};

export type TTaskReminder = TDate & {
  _id: string;
  dayBetween: string;
};

export type ActivityResponse = {
  data: {
    activityPerPage: TActivity[];
    totalActivity: number;
  };
};

export type TClientsResponse = {
  data: {
    clientsPerPage: TUser[];
    totalClients: number;
  };
};

export type TOpenTaskResponse = {
  data: {
    clientsPerPage: TUser[];
    totalClients: number;
  };
};

export type TUserProfile = TDate & {
  _id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  role: string;
  email: string;
  clientBackground: string;
};
