const User = require("../model/user.model");
const userService = require("../services/userService");

const getOthersController = async (req, res, next) => {
  try {
    // 0 if the user is not authenticated then throw error
    // if (!req.user) {
    //   next(new Error("Your are not authenticated yet get Other people"));
    // }

    // 1 get the page,limit from the query params
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const search = req.query.search;
    if (!page) page = 1;
    if (!limit) limit = 10;

    // 2 compute the start/end index form the db cursor
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await User.countDocuments().exec();

    const info = {};

    if (endIndex < count) {
      info.next = {
        page: page + 1,
        limit: limit,
        count: count,
      };
    }

    if (startIndex > 0) {
      info.previous = {
        page: page - 1,
        limit: limit,
        count: count,
      };
    }

    // 4 search for users except the current connectd user with paginated result
    let others;
    if (search) {
      others = await User.find({
        $text: { $search: search },
        // _id: { $ ne: req.user.user_id },
        _id: { $ne: req.body.user_id },
      })
        .limit(limit)
        .skip(startIndex)
        .exec();
    } else {
      // others = await User.find({ _id: { $ne: req.user.user_id } })
      others = await User.find({ _id: { $ne: req.body.user_id } })
        .limit(limit)
        .skip(startIndex)
        .exec();
    }
    res.status(200).json({ info, data: others });
  } catch (error) {
    next(error);
  }
};

// const getOthersController = async (req, res, next) => {
//   try {
//     const others = await userService.getOtherUsers();
//     res.status(200).json({ data: others });
//   } catch (error) {
//     next(error);
//   }
// };

const getAllUsersController = async (req, res, next) => {
  try {
    if (!req.user) {
      next(new Error("Your are not authenticated yet get Other people"));
    }
    const allUsers = await userService.getAllUsers();
    res.status(200).json({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

const addUserController = async (req, res, next) => {
  try {
    const user = req.body;
    if (error) {
      return res.status(406).json(error);
    }
    const newUser = await userService.addUser(user);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  getOthersController,
  addUserController,
};