import functions from '../../../utils/firebase/baseFunction';
import { triggerOnce } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { firestorePath } from '../path';
import { snapshotToUser } from './model';

export const onCreate = () =>
  functions()
    .firestore.document(firestorePath.v1.users.path.docOnTrigger)
    .onCreate(
      triggerOnce('v1-firestore-user-onCreate', async (snapshot, context) => {
        logger.debug({ snapshot, context });
        const user = await snapshotToUser(snapshot);
        logger.debug({ user });
      })
    );
