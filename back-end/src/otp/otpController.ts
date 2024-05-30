import { Request, Response } from 'express';
import { sendOTP, OTPsaver, otpFinderByUserId, updateIsUsedToTrue, decrementLife } from '../otp/otpServices';
const otpError = require('./otpError');
import { findUserByEmail } from '../user/userService'
const userError = require('../user/userError');


const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;
        const userFinder = await findUserByEmail(email)

        if (userFinder) {

            const otpFinder = await otpFinderByUserId(userFinder._id);

            if (otpFinder) {
                const currentTime = new Date();
                if (otpFinder.otpCode === otp && otpFinder.expirationTime > currentTime && otpFinder.life > 0) {
                    if (otpFinder.isUsed == false) {
                        await updateIsUsedToTrue(otpFinder._id);
                        res.status(200).json({ message: 'OTP match' });
                    } else {
                        res.status(otpError.otpAlreadyused.statusCode).json({ message: otpError.otpAlreadyused.message });
                    }
                } else {
                    await decrementLife(otpFinder._id, (otpFinder.life - 1));
                    res.status(otpError.notMatched.statusCode).json({ message: otpError.notMatched.message });
                }
            } else {
                res.status(otpError.otpNotFound.statusCode).json({ message: otpError.otpNotFound.message });
            }
        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const resendOTP = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email } = req.body;
        const userFinder = await findUserByEmail(email)
        if (userFinder) {
            const otpFinder = await otpFinderByUserId(userFinder._id);
            if (otpFinder) {
                const currentTime = new Date();
                if (otpFinder.life > 0 && otpFinder.expirationTime > currentTime) {
                    if (otpFinder.isUsed == false) {
                        await sendOTP(email, otpFinder.otpCode);
                        await decrementLife(otpFinder._id, (otpFinder.life - 1));
                        res.status(200).json({ message: 'OTP sent successfully' });
                    } else {
                        res.status(otpError.otpAlreadyused.statusCode).json({ message: otpError.otpAlreadyused.message });
                    }
                } else {
                    res.status(otpError.exriredOrlifeEnded.statusCode).json({ message: otpError.exriredOrlifeEnded.message });
                }
            } else {
                res.status(otpError.otpNotFound.statusCode).json({ message: otpError.otpNotFound.message });
            }
        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}



export { verifyOTP, resendOTP };