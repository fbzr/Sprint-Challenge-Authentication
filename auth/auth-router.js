const router = require('express').Router();
const Users = require('../database/models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('./utils/generateToken');

router.use((req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      errorMessage: 'Username and Password required'
    });
  }

  next();
}); 

router.post('/register', (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });

    if (user.length) {
      return res.status(401).json({
        errorMessage: 'Username already registered'
      });
    }
    
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 12;
    
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if(err) {
          next(err);
        }

        const newUser = await Users.add({
          username,
          password: hash
        });

        res.status(201).json(newUser);
      })
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await Users.findBy({ username });
    
    if (!user.length) {
      return res.status(401).json({
        errorMessage: 'Invalid username'
      });
    }
    
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        errorMessage: 'Invalid password'
      });
    }
  
    const token = generateToken(user[0]);

    res.status(200).json({ token }); 
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
