import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

interface AuthenticatedRequest extends Request {
	user?: { email: string; password: string };
}

const basicAuth = asyncHandler(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Basic ")) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const base64Credentials = authHeader.split(" ")[1];
		const credentials = Buffer.from(base64Credentials, "base64").toString(
			"utf-8"
		);
		const [email, password] = credentials.split(":");

		if (!email || !password) {
			res.status(401).json({ error: "Unauthorized" });
		}

		req.user = { email, password };
		next();
	}
);

export default basicAuth;
