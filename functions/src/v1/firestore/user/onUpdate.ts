import functions from '../../../utils/firebase/baseFunction';
import { triggerOnce } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { firestorePath } from '../path';
import { snapshotToUser } from './model';

export const onUpdate = () =>
  functions()
    .firestore.document(firestorePath.v1.users.path.docOnTrigger)
    .onUpdate(
      triggerOnce('v1-firestore-user-onUpdate', async (snapshot, context) => {
        logger.debug({ snapshot, context });
        const beforeUser = await snapshotToUser(snapshot.before);
        logger.debug({ beforeUser });
        const afterUser = await snapshotToUser(snapshot.after);
        logger.debug({ afterUser });
      })
    );
