import express from 'express';
import { LogModel } from '../db/log';

export const logActivity = async (activity: string, productName?: string) => {
  try {
    const log = await LogModel.create({ activity, productName });
    console.log(`Activity logged: ${activity}${productName ? ` with ${productName}` : ''}`);
  } catch (error) {
    console.log('Error logging activity:', error);
  }
};


export const getAllLogs = async (req: express.Request, res: express.Response) => {
  try {
    const logs = await LogModel.find();

    return res.json(logs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

