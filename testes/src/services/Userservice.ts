import { User } from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
    const hasUser = await User.findOne({ where: { email } })
    if (!hasUser) {
        let hash = bcrypt.hashSync(password, 10)
        const newUser = await User.create({
            email,
            password: hash
        })
        return newUser
    } else {
        return new Error('Email já existe')
    }
}
export const deleteUser = async (email: string) => {
    try {
        const deleteUser = await User.destroy({ where: {email} })

        if(deleteUser) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error("Erro ao excluir o usuário.")
    }
}
export const findByEmail = async (email: string) => {
    return await User.findOne({ where: {email}})
}
export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted)
}
export const all = async () => {
    return await User.findAll()
}