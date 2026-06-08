import { Request, Response, NextFunction } from 'express';
import db from '../database/db';

export class TalentosController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const talentos = await db('talentos')
        .where({ aprovado: true })
        .orderBy('created_at', 'desc')
        .select('*');

      const formatted = talentos.map((t: any) => ({
        ...t,
        skills: typeof t.skills === 'string' ? JSON.parse(t.skills) || [] : t.skills || [],
      }));

      res.json(formatted);
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const talento = await db('talentos').where({ id }).first();

      if (!talento) {
        return res.status(404).json({ message: 'Talento não encontrado' });
      }

      const formatted = {
        ...talento,
        skills: typeof talento.skills === 'string' ? JSON.parse(talento.skills) || [] : talento.skills || [],
      };

      res.json(formatted);
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, curso, semestre, superpoder, bio, skills, github, linkedin } = req.body;

      if (!nome || !curso || !semestre || !superpoder || !bio) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, curso, semestre, superpoder, bio' });
      }

      if (bio.length > 150) {
        return res.status(400).json({ message: 'Bio deve ter no máximo 150 caracteres' });
      }

      const [newTalento] = await db('talentos').insert({
        nome,
        curso,
        semestre,
        superpoder,
        bio,
        skills: JSON.stringify(skills || []),
        github: github || null,
        linkedin: linkedin || null,
        aprovado: false,
        avatar_seed: nome.toLowerCase().replace(/\s+/g, '-'),
      }).returning('*');

      const formatted = {
        ...newTalento,
        skills: typeof newTalento.skills === 'string' ? JSON.parse(newTalento.skills) || [] : newTalento.skills || [],
      };

      res.status(201).json(formatted);
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { nome, curso, semestre, superpoder, bio, skills, github, linkedin, aprovado } = req.body;

      const payload: any = {};
      if (nome !== undefined) payload.nome = nome;
      if (curso !== undefined) payload.curso = curso;
      if (semestre !== undefined) payload.semestre = semestre;
      if (superpoder !== undefined) payload.superpoder = superpoder;
      if (bio !== undefined) payload.bio = bio;
      if (skills !== undefined) payload.skills = JSON.stringify(skills);
      if (github !== undefined) payload.github = github;
      if (linkedin !== undefined) payload.linkedin = linkedin;
      if (aprovado !== undefined) payload.aprovado = aprovado;
      payload.updated_at = db.fn.now();

      const [updated] = await db('talentos').where({ id }).update(payload).returning('*');

      if (!updated) {
        return res.status(404).json({ message: 'Talento não encontrado' });
      }

      const formatted = {
        ...updated,
        skills: typeof updated.skills === 'string' ? JSON.parse(updated.skills) || [] : updated.skills || [],
      };

      res.json(formatted);
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const count = await db('talentos').where({ id }).del();

      if (!count) {
        return res.status(404).json({ message: 'Talento não encontrado' });
      }
      res.status(204).send();
    } catch (error) { next(error); }
  }
}

export const talentosController = new TalentosController();
