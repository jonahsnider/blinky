import { Http } from '@jonahsnider/util';
import { BaseHttpException } from '../../exceptions/base.exception';

/** Incorrect admin API token. */
export class IncorrectTokenException extends BaseHttpException {
	constructor() {
		super('Incorrect API token', Http.Status.Forbidden);
	}
}
