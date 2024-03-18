const { prisma } = require('../prisma/prisma-client');

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if(followingId === userId)
      return res.status(500).json({ error: 'You can\'t subscribe yourself' });

    try {
      const existFollow = await prisma.follows.findFirst({ 
        where: {
          AND: [
            {followerId: userId}, 
            {followingId} 
          ]
        } 
      });

      if(existFollow)
        return res.status(400).json({ error: 'Subscription already is' });

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId}},
          following: { connect: { id: followingId}},
        }
      });

      res.status(200).json({ message: 'Subscription successfully create' });
    } catch (error) {
      console.error('Error in followUser', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  unfollowUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    try {
      const existFollow = await prisma.follows.findFirst({ where: {
        AND: [
          {followerId: userId},
          {followingId}
        ]
      }});

      if(!existFollow)
        return res.status(404).json({ error: 'You can\'t unsubscribe again' });

      await prisma.follows.delete({
        where: { id: existFollow.id }
      });

      res.status(200).json({ message: 'You have been unsubscribe' });
    } catch (error) {
      console.error('Error in unfollowUser', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = FollowController;
