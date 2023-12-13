type Props = RequireAtLeastOne<{
	width: number;
	height: number;
}>;

import Image from 'next/image';
import { RequireAtLeastOne } from 'type-fest';
import blinkyPng from '../assets/blinky.png';
import blinky3dPng from '../assets/blinky3d.png';

export function Blinky({ width, height }: Props) {
	const silly = Math.random() > 0.95;

	return (
		<Image
			src={silly ? blinky3dPng : blinkyPng}
			alt={silly ? 'blinky :)' : 'Blinky'}
			width={width}
			height={height}
			style={silly ? undefined : { imageRendering: 'pixelated' }}
		/>
	);
}
