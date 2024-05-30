
//import catModel from './categoryModel';

const errorMessages = require('./categoryError');

const catModel = require('./categoryModel');

const findCategByName = async (categName: string) => {
    const categFinder = await catModel.findOne({ name: categName });
    return categFinder;
};

const addCategory = async (name: string, desc: string) => {
    // console.log('the name is : ' + name);
    const categFinder = await findCategByName(name);

    if (categFinder) {

        const error: any = new Error(errorMessages.categoryExist.message);
        error.statusCode = errorMessages.categoryExist.statusCode;
        throw error;

    } else {
        await new catModel({
            name: name,
            description: desc
        }).save();
    }
};

const getcategoriesPaginated = async (requestedPage: number, itemsPerPage: number) => {

    return await catModel.find({}).skip((requestedPage - 1) * itemsPerPage).limit(itemsPerPage);

};

const getOneCategoryById = async (categoryId: string) => {
    const categFinder = await catModel.findOne({ _id: categoryId });
    return categFinder;
};

const updateCategory = async (categoryId: string, categName: string, categDesc: string) => {

    return await catModel.findByIdAndUpdate(categoryId, {
        name: categName,
        description: categDesc,
    });

}

const deleteCategoryById = async (categoryId) => {
    const result = await catModel.deleteOne({ _id: categoryId });

    return result.deletedCount > 0;
}

export { addCategory, findCategByName, getcategoriesPaginated, getOneCategoryById, updateCategory, deleteCategoryById };
