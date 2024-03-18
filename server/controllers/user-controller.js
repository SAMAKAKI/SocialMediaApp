const { prisma } = require("../prisma/prisma-client");
const bcrypt = require('bcryptjs');
const jdentIcon = require('jdenticon');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const UserController = {
  register: async (req, res) => {
    const { email, password, name } = req.body;

    if(!email || !password || !name)
      return res.status(400).json({ error: 'All fields are required' });

    try {
      const existUser = await prisma.user.findUnique({ where: { email } });

      if(existUser)
        return res.status(400).json({ error: 'User exist try again with another data' });

      const hashedPass = await bcrypt.hash(password, 10);
      const avatarImage = jdentIcon.toPng(`${name}${Date.now()}`, 200);
      const avatarName = `${name}_${Date.now()}.png`;
      const avatarPath = path.join(__dirname, '../uploads', avatarName);
      fs.writeFileSync(avatarPath, avatarImage);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPass,
          name,
          avatarUrl: `/uploads/${avatarName}`
        }
      });
      const {password: hashedPassword, ...rest} = user;

      res.status(200).json(rest);
    } catch (error) {
      console.error('Error in register', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    try {
      const user = await prisma.user.findUnique({where: { email }});

      if(!user)
        return res.status(400).json({ error: 'Invalid email or password. Please try again!' });

      const validPass = await bcrypt.compare(password, user.password);

      if(!validPass)
        return res.status(400).json({ error: 'Invalid email or password. Please try again!' });

      const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET_TOKEN);
      
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error in login', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const user = await prisma.user.findUnique({where: {id}, include: {followers: true, following: true}});

      if(!user)
        return res.status(404).json({ error: 'User not found' });

      const isFollowing = await prisma.follows.findFirst({where: {AND: [{followerId: userId}, {followingId: id}]}});

      const { password, ...rest } = user;

      res.status(200).json({...rest, isFollowing: Boolean(isFollowing)});
    } catch (error) {
      console.error('Error in getUserById', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { email, name, dateOfBirth, bio, location } = req.body;

    let filePath;

    if(req.file && req.file.path)
      filePath = req.file.path
    
    if(id !== req.user.userId)
      return res.status(403).json({ error: 'No access' });

    try {
      if(email){
        const existUser = await prisma.user.findFirst({where: {email}});

        if(existUser && existUser.id !== id)
          return res.status(400).json({error: 'Email already exist'});
      }

      const user = await prisma.user.update({ where: { id }, data: {
        email: email || undefined,
        name: name || undefined,
        avatarUrl: filePath ? `/${filePath}` : undefined,
        dateOfBirth: dateOfBirth || undefined,
        bio: bio || undefined,
        location: location || undefined
      }});

      const { password: pass, ...rest} = user;

      res.status(200).json(rest);
    } catch (error) {
      console.error('Error in updateUser', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
  currentUser: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({where: { id: req.user.userId }, include: {followers: { include: {follower: true}}, following: {include: {following: true}}}});

      if(!user)
        return res.status(400).json({ error: 'Failed to find user' });

      const {password, ...rest} = user;

      res.status(200).json(rest);
    } catch (error) {
      console.error('Error in currentUser', error);
      res.status(500).json({ error: 'Interval server error' });
    }
  },
};

module.exports = UserController;
