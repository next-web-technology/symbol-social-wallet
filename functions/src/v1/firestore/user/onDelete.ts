import functions from '../../../utils/firebase/baseFunction';
import { triggerOnce } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { firestorePath } from '../path';
import { snapshotToUser } from './model';

export const onDelete = () =>
  functions()
    .firestore.document(firestorePath.v1.users.path.docOnTrigger)
    .onDelete(
      triggerOnce('v1-firestore-user-onDelete', async (snapshot, context) => {
        logger.debug({ snapshot, context });
        const deletedUser = await snapshotToUser(snapshot);
        logger.debug({ deletedUser });
      })
    );
