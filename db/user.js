import prisma from "../lib/prisma.js";
import { makeSerializable } from "../lib/util.js";

async function getUser(name, password) {
    try {
        const data = await prisma.user.findMany({
            where: {
                name: name,
                password: password
            }
        });
        return makeSerializable(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { getUser };