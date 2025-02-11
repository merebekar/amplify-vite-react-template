import {
    createAmplifyAuthAdapter,
    createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

import "@aws-amplify/ui-react-storage/styles.css";
import config from '../amplify_outputs.json';
import { Amplify } from "aws-amplify";


Amplify.configure(config);

export const { StorageBrowser } = createStorageBrowser({
    config: createAmplifyAuthAdapter(),
});


function SB() {
    return (
        <div><h3> SB Comes Here!!</h3>
            <StorageBrowser/>
        </div>
    );
}

export default SB;
