import { ObjectId } from "mongodb"; 

export type Timesheet = {
  startDate: Date;
  endDate: Date;
  startTime: Date; 
  endTime: Date;  
  OTJInHours: number;
}

export type JournalEntry = {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  category: string;
  description: string;
  timeSheets: Timesheet[];
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type User = {
  _id: ObjectId;
  name: string;
  expectedOTJHours: number;
  actualOTJHours: number;   
  totalOTJHours: number;    
  lastOTJActivity: Date;
  createdAt: Date;
}

export type Tag = {
  _id: ObjectId;
  userId: ObjectId;
  tagDescription: string;
  tagColour: string;
}