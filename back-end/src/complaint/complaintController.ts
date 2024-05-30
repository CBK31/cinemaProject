import { Request, Response } from 'express';
import "express-session";
// const jwt = require('jsonwebtoken');
// const complaintError = require('./complaintError');
import { createComplaint, getComplaintByUserId, getComplaintByUserIdAndCompId, deleteComplaint, updateComp } from './complaintService';
import { findUserFromToken } from '../user/userService';


const submit = async (req: Request, res: Response): Promise<void> => {

    try {
        const { title, body, categories } = req.body;
        const userFinder = await findUserFromToken(req);


        await createComplaint(userFinder._id, title, body, categories);

        res.status(200).json({ message: 'complaint added successfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getComplaints = async (req: Request, res: Response): Promise<void> => {

    try {

        const requestedPage = parseInt(req.query.page as any, 10);
        let itempPerPage = 3;

        const userFinder = await findUserFromToken(req);
        const complaintFinder = await getComplaintByUserId(userFinder._id, requestedPage, itempPerPage);

        res.status(200).json({ complaintFinder });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const getAComplaint = async (req: Request, res: Response): Promise<void> => {

    try {
        const userFinder = await findUserFromToken(req);
        const { complaintId } = req.body;
        const complaintFinder = await getComplaintByUserIdAndCompId(userFinder._id, complaintId);

        if (complaintFinder) {
            res.status(200).json({ complaintFinder });
        } else {
            res.status(400).json({ message: 'complaint not found ' });
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const deleteMyComplaint = async (req: Request, res: Response): Promise<void> => {

    try {
        const userFinder = await findUserFromToken(req);
        const { complaintId } = req.body;

        const complaintDeleter = await deleteComplaint(userFinder._id, complaintId);

        if (complaintDeleter) {
            res.status(200).json({ message: 'complaint deleted successfully' });
        } else {
            res.status(400).json({ message: 'complaint not found ' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateComplaint = async (req: Request, res: Response): Promise<void> => {
    try {
        const { complaintId, complaintStatus } = req.body;
        const finder = await updateComp(complaintId, complaintStatus);

        if (finder) {
            res.status(200).json({ message: 'complaint updated successfully' });
        } else {
            res.status(400).json({ message: 'complaint not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export { submit, getComplaints, getAComplaint, deleteMyComplaint, updateComplaint };