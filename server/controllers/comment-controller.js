const { prisma } = require('../prisma/prisma-client');

const CommentController = {
  createComment: async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.userId;

    if(!postId || !content)
      return res.status(400).json({ error: 'All fields are required' });

    try {
      const comment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content
        }
      });

      res.status(200).json(comment);
    } catch (error) {
      console.error('Error in create comment', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
  deleteComment: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const comment = await prisma.comment.findUnique({
        where: { id }
      });

      if(!comment)
        return res.status(404).json({ error: 'Comment not found' });

      if(comment.userId !== userId)
        return res.status(403).json({ error: 'No access' });

      const deleteComment = await prisma.comment.delete({ where: { id } });

      res.status(200).json(deleteComment);
    } catch (error) {
      console.error('Error in delete comment', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
};

module.exports = CommentController;
