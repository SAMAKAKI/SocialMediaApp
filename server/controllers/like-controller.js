const { prisma } = require('../prisma/prisma-client');

const LikeController = {
  likePost: async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.userId;

    if(!postId)
      return res.status(400).json({ error: 'All fields are required' });

    try {
      const existLike = await prisma.like.findFirst({
        where: {postId, userId}
      });

      if(existLike)
        return res.status(400).json({ error: 'You already liked this post'});

      const like = await prisma.like.create({
        data: { postId, userId }
      });

      res.status(200).json(like);
    } catch (error) {
      console.error('Error in likePost', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
  unlikePost: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    if(!id)
      return res.status(400).json({ error: 'You already dislike this post' });

    try {
      const existLike = await prisma.like.findFirst({ where: { postId: id, userId } });

      if(!existLike)
        return res.status(400).json({ error: 'You can\'t dislike this post' });

      const like = await prisma.like.deleteMany({ where: { postId: id, userId} });

      res.status(200).json(like);
    } catch (error) {
      console.error('Error in unlikePost', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
};

module.exports = LikeController;
