import mongoose from "mongoose";
import FollowingModel from "../models/Following.model.js";
import InviteModel from "../models/Invite.model.js";

export const addFollowing = async (req, res) => {
  try {
    const userId = req.userId;
    const followingUserId = req.body.followingUserId;

    const doc = new FollowingModel({
      user: userId,
      followingUser: followingUserId,
    });

    const following = await doc.save();

    res.json(following);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось добавить подписку",
    });
  }
};

export const removeFollowing = async (req, res) => {
  try {
    const userId = req.userId;
    const followingUserId = req.body.followingUserId;

    await FollowingModel.deleteOne({
      user: userId,
      followingUser: followingUserId,
    });

    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось добавить подписку",
    });
  }
};

export const getFollowings = async (req, res) => {
  try {
    const userId = req.userId;
    const followings = await FollowingModel.find({ user: userId })
      .lean()
      .populate("followingUser")
      .exec();

    const followingUsers = followings.map((f) => f.followingUser).reverse();

    res.json(followingUsers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить подписки",
    });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const userId = req.userId;
    const followers = await FollowingModel.find({ followingUser: userId }).lean();
    const followingUsers = followers.map((f) => f.user).reverse();

    res.json(followingUsers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить подписчиков",
    });
  }
};

export const getAnotherUserFollowings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followings = await FollowingModel.find({ user: userId }).populate("followingUser").exec();
    const followingUsers = followings.map((f) => f.followingUser).reverse();

    res.json(followingUsers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить подписки",
    });
  }
};

export const getAnotherUserFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await FollowingModel.find({ followingUser: userId }).populate("user").exec();
    const followingUsers = followers.map((f) => f.user).reverse();

    res.json(followingUsers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить подписчиков",
    });
  }
};

export const getFollowingsInvites = async (req, res) => {
  try {
    const userId = req.userId;

    const followings = await FollowingModel.find(
      { user: userId },
      { followingUser: 1, _id: 0 }
    ).exec();

    const followingUserIds = followings.map((f) => f.followingUser);

    const followingsInvites = await InviteModel.find({ creator: { $in: followingUserIds } })
      .sort({ createdAt: -1 })
      .populate(["creator", "event"])
      .exec();

    res.json(followingsInvites);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить инвайты подписок",
    });
  }
};
