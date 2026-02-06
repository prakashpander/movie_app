const genratetoken = (user, message, res, statusCode) => {
    let token = user.genrateAuthToken();

    let cookieName = user.role === "admin" ? "adminToken" : "userToken";

    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        httpOnly: true,
    }).json({
        success : true,
        message :message,
        token:token,
        user
    })
}

export default genratetoken;