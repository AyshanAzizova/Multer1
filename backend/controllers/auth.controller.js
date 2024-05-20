import bcrypt from 'bcrypt'

import User from '../models/user.model.js'

export const signup = async (request, response) => {
    const {email,userName,password,confirmPassword} = request.body
    const file = request.file;

    try {
        // check empty file
        if(!file){
            return response.status(404).send({error:"please upload an image"})
        }
        const {path} = file;

        // Check empty values
        if (!userName || !email || !password || !confirmPassword) {
            return response.status(404).send({error:'Please fill all required fields'})
        }

         // Check existing userName  
            const existingUser = await User.findOne({
                $or:[{userName},{email}],
            });
            if (existingUser) {
                return response.status(400).send({error: 'Username or email already exists'});
            }
    
        // check matching password
        if (confirmPassword !== password) {
            return response
            .status(400)
            .send({error:"PAssword and confirm password do not matched"})
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            email,
            password:hashedPassword,
            userName,
            profilePic:path,
        })
        
        response.status(201).send(newUser)
       
    } catch (error) {
        
    }

}
export const signin = async (request, response) => {}
export const logout = async (request, response) => {}