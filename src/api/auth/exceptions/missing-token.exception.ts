import { Http } from '@jonahsnider/util';
import { BaseHttpException } from '../../exceptions/base.exception';

/** Missing admin API token. */
export class MissingTokenException extends BaseHttpException {
	constructor() {
		super('Missing API token', Http.Status.Unauthorized);
	}
}
