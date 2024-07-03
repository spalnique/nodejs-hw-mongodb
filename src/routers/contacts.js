import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';
import { validateMongoId } from '../middlewares/validateId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter
  .route('/')
  .get(ctrlWrapper(getAllContactsController))
  .post(
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactController),
  );

contactsRouter
  .route('/:id')
  .all(validateMongoId('id'))
  .get(ctrlWrapper(getContactByIdController))
  .delete(ctrlWrapper(deleteContactController))
  .patch(
    upload.single('photo'),
    validateBody(patchContactSchema),
    ctrlWrapper(patchContactController),
  );

export default contactsRouter;
