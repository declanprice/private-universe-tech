import { prisma } from '@/prisma'
import { User } from 'next-auth'
import * as bcrypt from 'bcrypt'

export class AuthService {
    async signUp(email: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (user) {
            throw new Error('user already exists')
        }

        const hash = this.hashPassword(password)

        await prisma.user.create({
            data: {
                email,
                hash,
                emailVerified: new Date(),
            },
        })
    }

    async signIn(credentials: { email: string; password: string }): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email: credentials.email,
            },
        })

        if (!user) return null

        const isValidPassword = this.comparePassword(credentials.password, user.hash)

        if (!isValidPassword) return null

        return user
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 12)
    }

    comparePassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword)
    }
}

export default new AuthService()
