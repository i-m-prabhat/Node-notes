class ApiResponse
{
    static success(res, data, message = 'Success', status = 200)
    {
        res.status(status).json({ status, success: true, message, data });
    }

    static error(res, error, message = 'Error', status = 500)
    {
        res.status(status).json({ status, success: false, error: { message: error?.message, status }, message });
    }
}

export { ApiResponse };