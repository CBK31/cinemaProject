import { Request, Response } from 'express';
import { findUserByEmail, createUser, logInService, updatePassword, findUserFromToken, findUserById } from './userService';
import "express-session";
import { sendOTP, OTPsaver } from '../otp/otpServices';
const jwt = require('jsonwebtoken');
const userError = require('./userError');


declare module "express-session" {
    interface Session {
        isLoggedIn: boolean;
        userId: string;
    }
}

const signUp = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, firstName, lastName, password, isVIP, isAdmin } = req.body;

        await createUser(email, firstName, lastName, password, isVIP, isAdmin);

        res.status(200).json({ message: 'user added successfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
        //  res.status(error.statusCode).json({ message: error.message });
    }
}

const login = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, password } = req.body;

        const userFinder = await logInService(email, password);

        if (userFinder) {

            req.session.isLoggedIn = true;
            req.session.userId = userFinder._id;

            const token = jwt.sign({ email: email }, 'a_secret_key');
            res.status(200).json({ token: token });
        }
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
}

const forgetpassword = async (req: Request, res: Response): Promise<void> => {

    try {

        const { email } = req.body;
        const cc = await findUserByEmail(email)
        if (cc) {
            const myOTP: string = Math.floor(100000 + Math.random() * 900000).toString();

            await OTPsaver(myOTP, email);
            await sendOTP(email, myOTP);

            res.status(200).json({ message: 'OTP sent successfully' });

        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }


}

const resetpassword = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, newPassword } = req.body;
        const userFinder = await findUserByEmail(email)
        if (userFinder) {
            await updatePassword(userFinder._id, newPassword);
            res.status(200).json({ message: 'password updated successfully' });
        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }



}

const changePassword = async (req: Request, res: Response): Promise<void> => {

    try {
        const { newPassword } = req.body;
        const userFinder = await findUserFromToken(req);
        const userF = await findUserById(userFinder._id);
        if (userF) {
            await updatePassword(userF._id, newPassword);
            res.status(200).json({ message: 'password updated successfully' });
        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }


}


export { signUp, login, forgetpassword, resetpassword, changePassword };