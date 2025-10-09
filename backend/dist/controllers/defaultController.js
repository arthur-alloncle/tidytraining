export const testRoute = (req, res, next) => {
    try {
        console.log('Wouh');
        res.status(200).json({ success: true, data: 'Je suis la route /' });
    }
    catch (error) {
        console.log('oh no');
        console.error(error);
        next(error);
    }
};
