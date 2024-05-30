import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const complaintModel = require('./complaintModel');
const complaintError = require('./complaintError');
import { findCategByName } from '../category/categoryService';
import { findUserByEmail } from '../user/userService';

// const complaintFinderBytitle = async (cTitle) => {
//     return await complaintModel.findOne({ title: cTitle });
// }

const categoryChecker = async (categories: Array<string>) => {
    for (let element of categories) {
        if (!await findCategByName(element)) {
            return false;
        }
    }
    return true;
}

const createComplaint = async (userId: string, title: string, body: string, categories: Array<string>) => {

    if (!title || !body || !categories || categories.length === 0) {
        const error: any = new Error(complaintError.invalidComplaint.message);
        error.statusCode = complaintError.invalidComplaint.statusCode;
        throw error;
    }

    const categChecker = await categoryChecker(categories);

    if (categChecker) {
        await new complaintModel({
            userId: userId,
            title: title,
            body: body,
            categories: categories,
            creationDate: new Date()
        }).save();

    } else {
        const error: any = new Error(complaintError.categNotFound.message);
        error.statusCode = complaintError.categNotFound.statusCode;
        throw error;
    }
}

const getComplaintByUserId = async (userId: string, pageNum: number, itemsPerPage: number) => {
    return await complaintModel.find({ userId: userId }).skip((pageNum - 1) * itemsPerPage).limit(itemsPerPage);
}

const getComplaintByUserIdAndCompId = async (userId: string, complaintid: string) => {
    return await complaintModel.findOne({ _id: complaintid, userId: userId })
}

const deleteComplaint = async (userId: string, complaintId: string) => {
    const result = await complaintModel.deleteOne({
        _id: complaintId,
        userId: userId
    });
    return result.deletedCount > 0;
}

const updateComp = async (complaintId: string, complaintStatus: string) => {
    const result = await complaintModel.findByIdAndUpdate(complaintId, {
        status: complaintStatus,
    });
    return result;
}


export { createComplaint, getComplaintByUserId, getComplaintByUserIdAndCompId, deleteComplaint, updateComp };