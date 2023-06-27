import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService({
	secret: process.env.JWT_SECRET_KEY as string,
	signOptions: {
		algorithm: 'HS384',
		expiresIn: '12h',
	},
	verifyOptions: {
		algorithms: ['HS384'],
		ignoreExpiration: false,
	},
});

type JWTPayload = {
	sub: string;
	iat?: number;
	exp?: number;
};

export const signJWTToken = (email: string): string => {
	const payload: JWTPayload = {
		sub: email,
	};

	return jwt.sign(payload);
};
