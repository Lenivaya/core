import { Output } from '../../../../src/server/nodes/Output'
import { when } from "../NodeTester";

it('has attached features', async () => {
    await when(Output)
    .hasInput([1, 2, 3])
		.assertAttachedFeatures([1,2,3])
		.finish()
});