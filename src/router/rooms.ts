import express from 'express';
import {
    getAllRooms,
    addRoom,
    addProductToRoom,
    getRoomWithProducts,
    getAvailableRooms,
    deleteProductFromRoom
} from '../controllers/rooms';

export default (router: express.Router) => {
    router.post('/rooms', addRoom); // Define the POST route first
    router.get('/rooms', getAllRooms);
    router.post('/rooms/add/:roomNo', addProductToRoom); // Define the GET route after the POST route
    router.get('/rooms/getRoom/:roomNo', getRoomWithProducts);
    router.get('/rooms/available', getAvailableRooms);
    router.delete('/rooms/:roomNo/:id', deleteProductFromRoom);
};
