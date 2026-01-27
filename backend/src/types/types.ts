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
  description: Description;
  timeSheets?: Timesheet[];
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type Description = {
    intend: string;
    implementation: string;
    impact: string;
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