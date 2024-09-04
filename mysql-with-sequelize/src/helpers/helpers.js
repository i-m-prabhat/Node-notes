export const removeLocalFile = (localPath) =>
{
    fs.unlink(localPath, (err) =>
    {
        if (err) console.log("Error while removing local files: ", err);
        else
        {
            console.log("Removed local: ", localPath);
        }
    });
};