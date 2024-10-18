import { userService } from "../services/user.service";

function userController() {
  const getAllUsers = async (req, rep) => {
    //   const { articleId, content } = req.body;
    //   const userId = req.user!.id;
    //   const userEmail = req.user!.email;

    try {
      try {
        const result = await userService.getAllUsers();
        rep.status(200).send(result);
      } catch (error) {
        // handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    } catch (error) {
      //   handleError(rep, ERROR_MESSAGE.badRequest, error);
    }
  };
  return {
    getAllUsers,
  };
}

export default userController();
