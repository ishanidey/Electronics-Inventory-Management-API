import express from 'express';
import { NotificationModel } from '../db/notification';
export const getNotifications = async (req: express.Request, res: express.Response) => {
    try {
      const notifications = await NotificationModel.find();
      return res.status(200).json(notifications);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };