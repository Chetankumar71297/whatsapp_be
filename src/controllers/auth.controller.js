export const register = async (req, res, next) => {
  try {
    res.send(req.body);
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};

export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};

export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};
