import prisma from './prismaClient';

const xprisma = prisma.$extends({
	query: {},
});

export const PublicUser = xprisma.publicUser;
export const StorefrontProgram = xprisma.storefrontProgram;
