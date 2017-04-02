export * from './scrollable-content.directive';
export * from './in-view.directive';

import { ScrollableContentDirective } from './scrollable-content.directive';
import { InViewDirective } from './in-view.directive';
import { OutViewDirective } from './out-view.directive';

export const DIRECTIVES = [
	ScrollableContentDirective,
	InViewDirective,
	OutViewDirective
];
