import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PitRitService } from '../services/pit-rit.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../core/services/notification.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-pit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, TranslateModule, NgxMaskDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pit-form-container glass-card animate-fade-in">
      <header class="form-header">
        <h2 class="section-title">Formulário PIT</h2>
        <p class="section-desc">Preencha as informações para gerar seu Plano Individual de Trabalho.</p>
      </header>

      <form #pitForm="ngForm" class="modern-form">
        <!-- IDENTIFICAÇÃO -->
        <div class="form-section">
          <h3 class="subsection-title">Identificação do Servidor</h3>
          <div class="grid-form">
            <div class="form-group" [class.has-error]="pitForm.submitted && !data.identificacao.nome">
              <label>Nome Completo *</label>
              <input type="text" [(ngModel)]="data.identificacao.nome" name="nome" #nome="ngModel" required (change)="update()" placeholder="Seu nome" class="form-input">
              <span class="error-msg" *ngIf="pitForm.submitted && nome.invalid">Nome é obrigatório</span>
            </div>
            <div class="form-group">
              <label>Siape</label>
              <input type="text" [(ngModel)]="data.identificacao.siape" name="siape" mask="0000000 || 00000000" (change)="update()" placeholder="Matrícula Siape" class="form-input">
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input type="text" [(ngModel)]="data.identificacao.telefone" name="tel" mask="(00) 0 0000-0000 || (00) 0000-0000" (change)="update()" placeholder="(00) 00000-0000" class="form-input">
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input type="email" [(ngModel)]="data.identificacao.email" name="email" (change)="update()" placeholder="exemplo@ifce.edu.br" class="form-input">
            </div>
            <div class="form-group">
              <label>Regime de Trabalho</label>
              <select [(ngModel)]="data.identificacao.regime" name="regime" (change)="update()" class="form-select">
                <option value="40h D.E.">40h D.E.</option>
                <option value="40h">40h</option>
                <option value="20h">20h</option>
              </select>
            </div>
            <div class="form-group">
              <label>Semestre *</label>
              <input type="text" [(ngModel)]="data.semestre" name="semestre" mask="0000.0" #sem="ngModel" required (change)="update()" placeholder="2024.1" class="form-input">
              <span class="error-msg" *ngIf="pitForm.submitted && sem.invalid">Semestre inválido</span>
            </div>
          </div>
        </div>

        <!-- ATIVIDADES DE ENSINO -->
        <div class="form-section">
          <h3 class="subsection-title">Atividades de Ensino</h3>
          
          <div class="table-responsive">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th width="100">Quant.</th>
                  <th width="100">Total H</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cursos Técnico e/ou Licenciaturas</td>
                  <td><input type="number" [(ngModel)]="data.atividades.ensino.aulas.q1" name="q1" (change)="update()" class="table-input"></td>
                  <td><span class="total-h">{{ data.atividades.ensino.aulas.t1 }}h</span></td>
                </tr>
                <tr>
                  <td>Especialização, Graduação e Pós-graduação</td>
                  <td><input type="number" [(ngModel)]="data.atividades.ensino.aulas.q2" name="q2" (change)="update()" class="table-input"></td>
                  <td><span class="total-h">{{ data.atividades.ensino.aulas.t2 }}h</span></td>
                </tr>
                <tr>
                  <td>Cursos FIC</td>
                  <td><input type="number" [(ngModel)]="data.atividades.ensino.aulas.q3" name="q3" (change)="update()" class="table-input"></td>
                  <td><span class="total-h">{{ data.atividades.ensino.aulas.t3 }}h</span></td>
                </tr>
                <tr class="calculated-row">
                  <td>Preparação + Planejamento</td>
                  <td>-</td>
                  <td><span class="total-h blue">{{ data.atividades.ensino.manutencao.t4 }}h</span></td>
                </tr>
                <tr class="calculated-row">
                  <td>Atendimento a Estudantes</td>
                  <td>-</td>
                  <td><span class="total-h blue">{{ data.atividades.ensino.manutencao.t5 }}h</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="reset()">Limpar</button>
          <button type="button" class="btn-primary" (click)="generate()">Visualizar Relatório</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .pit-form-container {
      padding: 2.5rem;
      max-width: 900px;
      margin: 2rem auto;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
    .form-header { margin-bottom: 2.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.5rem; }
    .section-title { font-size: 1.8rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.5rem; }
    .section-desc { color: #666; font-size: 0.95rem; }
    
    .form-section { margin-bottom: 3rem; }
    .subsection-title { font-size: 1.2rem; font-weight: 600; color: #0066b3; margin-bottom: 1.5rem; }
    
    .grid-form { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.85rem; font-weight: 600; color: #444; }
    
    .form-input, .form-select, .table-input {
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      background: white;
    }
    .form-input:focus, .form-select:focus {
      border-color: #0066b3;
      box-shadow: 0 0 0 3px rgba(0,102,179,0.1);
      outline: none;
    }
    
    .modern-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .modern-table th { text-align: left; padding: 1rem; background: #f8f9fa; color: #444; font-size: 0.9rem; }
    .modern-table td { padding: 1rem; border-bottom: 1px solid #eee; font-size: 0.95rem; }
    .calculated-row { background: rgba(0,102,179,0.02); }
    
    .total-h { font-weight: 700; color: #333; }
    .total-h.blue { color: #0066b3; }
    
    .form-group.has-error .form-input { border-color: #ff5252; background-color: #fff8f8; }
    .error-msg { font-size: 0.75rem; color: #ff5252; font-weight: 500; }
    
    .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee; }
    .btn-primary { background: #0066b3; color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
    .btn-secondary { background: white; color: #666; border: 1px solid #ddd; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 600; cursor: pointer; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,102,179,0.3); }

    @media (max-width: 600px) {
      .grid-form { grid-template-columns: 1fr; }
    }
  `]
})
export class PitFormComponent {
  private pitRitService = inject(PitRitService);
  private pdfService = inject(PdfGeneratorService);
  private notificationService = inject(NotificationService);

  data: any = {};

  constructor() {
    this.pitRitService.currentPitData$.subscribe(d => {
      this.data = JSON.parse(JSON.stringify(d));
    });
  }

  update() {
    // Basic multipliers from pit.php
    this.data.atividades.ensino.aulas.t1 = this.data.atividades.ensino.aulas.q1 * 1;
    this.data.atividades.ensino.aulas.t2 = this.data.atividades.ensino.aulas.q2 * 1;
    this.data.atividades.ensino.aulas.t3 = this.data.atividades.ensino.aulas.q3 * 0.05;

    this.pitRitService.updatePitData(this.data);
  }

  reset() {
    this.pitRitService.resetPit();
    this.notificationService.showInfo('Formulário limpo.');
  }

  generate() {
    if (!this.data.identificacao.nome) {
      this.notificationService.showError('Preencha pelo menos o seu nome para gerar o PDF.');
      return;
    }
    this.pdfService.generatePitPdf(this.data);
    this.notificationService.showSuccess('PDF do PIT gerado com sucesso!');
  }
}
