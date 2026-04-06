import { Request, Response, NextFunction } from 'express';
import db from '../database';

export class LaboratorioController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const labs = await db('laboratorios').select('*');
      
      // Converte as produções e serviços para array json se não for
      const formatted = labs.map(lab => ({
        ...lab,
        productions: typeof lab.productions === 'string' ? JSON.parse(lab.productions) || [] : lab.productions || [],
        services: typeof lab.services === 'string' ? JSON.parse(lab.services) || [] : lab.services || []
      }));

      res.json(formatted);
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const lab = await db('laboratorios').where({ id }).first();
      
      if (!lab) {
        return res.status(404).json({ message: 'Lab não encontrado' });
      }

      const formatted = {
        ...lab,
        productions: typeof lab.productions === 'string' ? JSON.parse(lab.productions) || [] : lab.productions || [],
        services: typeof lab.services === 'string' ? JSON.parse(lab.services) || [] : lab.services || []
      };

      res.json(formatted);
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, cover_image, productions, services } = req.body;
      const [newLab] = await db('laboratorios').insert({
        name,
        description,
        cover_image,
        productions: JSON.stringify(productions || []),
        services: JSON.stringify(services || [])
      }).returning('*');
      res.status(201).json(newLab);
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, cover_image, productions, services } = req.body;
      
      const payload: any = {};
      if (name !== undefined) payload.name = name;
      if (description !== undefined) payload.description = description;
      if (cover_image !== undefined) payload.cover_image = cover_image;
      if (productions !== undefined) payload.productions = JSON.stringify(productions);
      if (services !== undefined) payload.services = JSON.stringify(services);
      
      payload.updated_at = db.fn.now();

      const [updated] = await db('laboratorios')
        .where({ id })
        .update(payload)
        .returning('*');
        
      if (!updated) {
        return res.status(404).json({ message: 'Não encontrado' });
      }
      res.json(updated);
    } catch (error) { next(error); }
  }
}

export const laboratorioController = new LaboratorioController();
