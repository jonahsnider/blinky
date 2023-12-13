import { Http } from '@jonahsnider/util';
import { TO_RESPONSE } from 'next-api-utils';
import { NextResponse } from 'next/server';
import { ExceptionSchema } from './dtos/exception.dto';

export class BaseHttpException extends Error {
	readonly error: string;

	readonly statusCode: number;

	constructor(message: string, statusCode: Http.Status) {
		super(message);

		this.statusCode = statusCode;
		this.error = Http.StatusName[statusCode] ?? BaseHttpException.name;
	}

	[TO_RESPONSE](): NextResponse<ExceptionSchema> {
		return NextResponse.json(
			{
				statusCode: this.statusCode,
				error: this.error,
				message: this.message,
			},
			{ status: this.statusCode },
		);
	}
}
