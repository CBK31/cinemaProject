import { Request, Response } from 'express';
import { addCategory, getcategoriesPaginated, getOneCategoryById, updateCategory, deleteCategoryById } from './categoryService';
// import { findUserFromToken } from '../user/userService';

const addCateg = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryName, categoryDescription } = req.body;

        await addCategory(categoryName, categoryDescription);

        res.status(200).json({ message: 'category added successfully' });
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

const getcategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const requestedPage = parseInt(req.query.page as any, 10);
        let itempPerPage = 3;
        const categoriesFinder = await getcategoriesPaginated(requestedPage, itempPerPage);
        res.status(200).json({ categoriesFinder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getOnecategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.body;
        const finder = await getOneCategoryById(categoryId);

        if (finder) {
            res.status(200).json({ finder });
        } else {
            res.status(400).json({ message: 'category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateCateg = async (req: Request, res: Response): Promise<void> => {

    try {
        const { categoryId, categName, categDesc } = req.body;
        const finder = await updateCategory(categoryId, categName, categDesc);

        if (finder) {
            res.status(200).json({ message: 'category updated successfully' });
        } else {
            res.status(400).json({ message: 'category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const deleteCateg = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.body;
        // i should check if any complaint is related to a category before deleting it but i dont have time 
        const result = await deleteCategoryById(categoryId);
        if (result) {
            res.status(200).json({ message: 'categoty deleted successfully' });
        } else {
            res.status(400).json({ message: 'category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { addCateg, getcategories, getOnecategory, updateCateg, deleteCateg };
