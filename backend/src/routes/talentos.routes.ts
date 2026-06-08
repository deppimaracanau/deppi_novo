import { Router } from 'express';
import { talentosController } from '../controllers/talentos.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public: list approved talentos
router.get('/', talentosController.getAll);
router.get('/:id', talentosController.getById);

// Protected: admin operations
router.post('/', authMiddleware, talentosController.create);
router.put('/:id', authMiddleware, talentosController.update);
router.delete('/:id', authMiddleware, talentosController.delete);

export default router;
