const generate_token = (user, message, status, res) => {
  const token = user.getJwtToken();
  const cookie_Name = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(status)
    .cookie(cookie_Name, token, {
      // set expire data is from now + the env COOKIE_EXPIRE
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })

    .json({
      success: true,
      message,
      data: {
        token,
        user,
      },
    });
};

export { generate_token };
