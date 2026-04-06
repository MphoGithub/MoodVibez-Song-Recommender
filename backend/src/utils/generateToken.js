import jwt from 'jsonwebtoken'

const generateToken = (userId,email) =>
{
    const payload = 
    {
        userId: userId,
        email:email
    }


    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(payload,secretKey,{expiresIn:'30d'});
    return token;
}

export default generateToken