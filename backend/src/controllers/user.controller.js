import User from "../models/User";


export async function getRecommededUsers(req,res){
  try {
    const currentUserId = req.user.id;
    const currentUser  = req.user;

    const recommededUsers = await User.find({
      $and:[
        {_id: {$ne: currentUserId}},
        {$id: {$nin: currentUser.friends}},
        {isOnboarded: true}
      ]
    })
    res.status(200).json(recommededUsers)
  } catch (error) {
    console.log("Error in getRecommendedUsers controller", error.message)
    res.status(500).json({ message: "Internal Server Error"})
  }
}

export async function getMyFriends(req,res){
  try {
    const user = await User.findById(req.user.id)
       .select("friends")
       .populate("friends", "fullName profilePic nativeLanguage learningLanguage")
       res.status(200).json(user.friends)
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server error"})
  }
}