import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PitRitService } from '../services/pit-rit.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../core/services/notification.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-pit-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pit-form-container glass-card animate-fade-in">
      <header class="form-header">
        <h2 class="section-title">Formulário PIT</h2>
        <p class="section-desc">
          Preencha as informações para gerar seu Plano Individual de Trabalho.
        </p>
      </header>

      <form #pitForm="ngForm" class="modern-form">
        <!-- IDENTIFICAÇÃO -->
        <div class="form-section">
          <h3 class="subsection-title">Identificação do Servidor</h3>
          <div class="grid-form">
            <div
              class="form-group"
              [class.has-error]="pitForm.submitted && !data.identificacao.nome"
            >
              <label>Nome Completo *</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.nome"
                name="nome"
                #nome="ngModel"
                required
                (change)="update()"
                placeholder="Seu nome"
                class="form-input"
              />
              <span class="error-msg" *ngIf="pitForm.submitted && nome.invalid"
                >Nome é obrigatório</span
              >
            </div>
            <div class="form-group">
              <label>Siape</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.siape"
                name="siape"
                mask="0000000 || 00000000"
                (change)="update()"
                placeholder="Matrícula Siape"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.telefone"
                name="tel"
                mask="(00) 0 0000-0000 || (00) 0000-0000"
                (change)="update()"
                placeholder="(00) 00000-0000"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input
                type="email"
                [(ngModel)]="data.identificacao.email"
                name="email"
                (change)="update()"
                placeholder="exemplo@ifce.edu.br"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Regime de Trabalho</label>
              <select
                [(ngModel)]="data.identificacao.regime"
                name="regime"
                (change)="update()"
                class="form-select"
              >
                <option value="40h D.E.">40h D.E.</option>
                <option value="40h">40h</option>
                <option value="20h">20h</option>
              </select>
            </div>
            <div class="form-group">
              <label>Semestre *</label>
              <input
                type="text"
                [(ngModel)]="data.semestre"
                name="semestre"
                mask="0000.0"
                #sem="ngModel"
                required
                (change)="update()"
                placeholder="2024.1"
                class="form-input"
              />
              <span class="error-msg" *ngIf="pitForm.submitted && sem.invalid"
                >Semestre inválido</span
              >
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
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.atividades.ensino.aulas.q1"
                      name="q1"
                      (change)="update()"
                      class="table-input"
                    />
                  </td>
                  <td>
                    <span class="total-h"
                      >{{ data.atividades.ensino.aulas.t1 }}h</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Especialização, Graduação e Pós-graduação</td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.atividades.ensino.aulas.q2"
                      name="q2"
                      (change)="update()"
                      class="table-input"
                    />
                  </td>
                  <td>
                    <span class="total-h"
                      >{{ data.atividades.ensino.aulas.t2 }}h</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Cursos FIC</td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.atividades.ensino.aulas.q3"
                      name="q3"
                      (change)="update()"
                      class="table-input"
                    />
                  </td>
                  <td>
                    <span class="total-h"
                      >{{ data.atividades.ensino.aulas.t3 }}h</span
                    >
                  </td>
                </tr>
                <tr class="calculated-row">
                  <td>Preparação + Planejamento</td>
                  <td>-</td>
                  <td>
                    <span class="total-h blue"
                      >{{ data.atividades.ensino.manutencao.t4 }}h</span
                    >
                  </td>
                </tr>
                <tr class="calculated-row">
                  <td>Atendimento a Estudantes</td>
                  <td>-</td>
                  <td>
                    <span class="total-h blue"
                      >{{ data.atividades.ensino.manutencao.t5 }}h</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ATIVIDADES COMPLEMENTARES (Resumo) -->
        <div class="form-section">
          <h3 class="subsection-title">Pesquisa e Extensão (Carga em Horas)</h3>
          <div class="grid-form">
            <div class="form-group">
              <label>Coordenação Projetos (Pesquisa)</label>
              <input
                type="number"
                [(ngModel)]="data.atividades.pesquisa.q14"
                name="q14"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Orientação Mestrado/Doutorado</label>
              <input
                type="number"
                [(ngModel)]="data.atividades.pesquisa.q17"
                name="q17"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Artigos/Produção Intelectual</label>
              <input
                type="number"
                [(ngModel)]="data.atividades.pesquisa.q18"
                name="q18"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Projetos de Extensão</label>
              <input
                type="number"
                [(ngModel)]="data.atividades.extensao.q21"
                name="q21"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Produção Técnica/Cultural</label>
              <input
                type="number"
                [(ngModel)]="data.atividades.extensao.q23"
                name="q23"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Atividades de Gestão</label>
              <input
                type="number"
                [(ngModel)]="data.atividades.gestao.q30"
                name="q30"
                (change)="update()"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- QUADRO DE HORÁRIOS -->
        <div class="form-section">
          <h3 class="subsection-title">
            Distribuição de Carga Horária (Semestre Atual)
          </h3>
          <div class="table-responsive">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Segunda</th>
                  <th>Terça</th>
                  <th>Quarta</th>
                  <th>Quinta</th>
                  <th>Sexta</th>
                </tr>
              </thead>
              <tbody>
                <ng-container *ngFor="let period of periods; let pid = index">
                  <tr *ngFor="let slot of slots; let sid = index">
                    <td
                      *ngIf="sid === 0"
                      [attr.rowspan]="slots.length"
                      class="period-cell"
                    >
                      {{ period }}
                    </td>
                    <td *ngFor="let day of days; let did = index">
                      <select
                        [(ngModel)]="
                          data.horarios[pid * slots.length + sid][did]
                        "
                        [name]="'h' + pid + sid + did"
                        (change)="update()"
                        class="slot-select"
                        [attr.data-activity]="
                          data.horarios[pid * slots.length + sid][did]
                        "
                      >
                        <option value="">--</option>
                        <option
                          *ngFor="let opt of activityOptions"
                          [value]="opt"
                        >
                          {{ opt }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </ng-container>
              </tbody>
            </table>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="reset()">
            Limpar
          </button>
          <button type="button" class="btn-primary" (click)="generate()">
            Visualizar Relatório
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      :host {
        --slot-bg-Aula: #e8f5e9;
        --slot-color-Aula: #2e7d32;
        --slot-bg-Planejamento: #fff3e0;
        --slot-color-Planejamento: #e65100;
        --slot-bg-Atendimento: #e3f2fd;
        --slot-color-Atendimento: #1565c0;
        --slot-bg-Apoio: #f3e5f5;
        --slot-color-Apoio: #6a1b9a;
        --slot-bg-Orientação: #fce4ec;
        --slot-color-Orientação: #ad1457;
        --slot-bg-Extracurricular: #eceff1;
        --slot-color-Extracurricular: #37474f;
        --slot-bg-Pesquisa: #e0f2f1;
        --slot-color-Pesquisa: #00695c;
        --slot-bg-Extensão: #fbe9e7;
        --slot-color-Extensão: #d84315;
        --slot-bg-Gestão: #e8eaf6;
        --slot-color-Gestão: #283593;
        --slot-bg-Comissões: #fff8e1;
        --slot-color-Comissões: #ff8f00;
      }
      .pit-form-container {
        padding: 2.5rem;
        max-width: 900px;
        margin: 2rem auto;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      }
      .form-header {
        margin-bottom: 2.5rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        padding-bottom: 1.5rem;
      }
      .section-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
      }
      .section-desc {
        color: #666;
        font-size: 0.95rem;
      }

      .form-section {
        margin-bottom: 3rem;
      }
      .subsection-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #0066b3;
        margin-bottom: 1.5rem;
      }

      .grid-form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .form-group label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #444;
      }

      .form-input,
      .form-select,
      .table-input {
        padding: 0.75rem 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        background: white;
      }
      .form-input:focus,
      .form-select:focus {
        border-color: #0066b3;
        box-shadow: 0 0 0 3px rgba(0, 102, 179, 0.1);
        outline: none;
      }

      .modern-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      .modern-table th {
        text-align: left;
        padding: 1rem;
        background: #f8f9fa;
        color: #444;
        font-size: 0.9rem;
      }
      .modern-table td {
        padding: 1rem;
        border-bottom: 1px solid #eee;
        font-size: 0.95rem;
      }
      .schedule-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 4px;
      }
      .schedule-table th {
        padding: 0.75rem;
        font-size: 0.85rem;
        color: #666;
        font-weight: 600;
      }
      .period-cell {
        background: #f8f9fa;
        font-weight: 700;
        font-size: 0.8rem;
        text-align: center;
        color: #0066b3;
        text-transform: uppercase;
        border-radius: 4px;
      }
      .slot-select {
        padding: 0.4rem;
        font-size: 0.8rem;
        height: 36px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: background-color 0.3s;
      }
      .slot-select[data-activity='Aula'] {
        background-color: var(--slot-bg-Aula);
        color: var(--slot-color-Aula);
        border-color: var(--slot-color-Aula);
        font-weight: 600;
      }
      .slot-select[data-activity='Planejamento'] {
        background-color: var(--slot-bg-Planejamento);
        color: var(--slot-color-Planejamento);
        border-color: var(--slot-color-Planejamento);
        font-weight: 600;
      }
      .slot-select[data-activity='Atendimento'] {
        background-color: var(--slot-bg-Atendimento);
        color: var(--slot-color-Atendimento);
        border-color: var(--slot-color-Atendimento);
        font-weight: 600;
      }
      .slot-select[data-activity='Apoio'] {
        background-color: var(--slot-bg-Apoio);
        color: var(--slot-color-Apoio);
        border-color: var(--slot-color-Apoio);
        font-weight: 600;
      }
      .slot-select[data-activity='Orientação'] {
        background-color: var(--slot-bg-Orientação);
        color: var(--slot-color-Orientação);
        border-color: var(--slot-color-Orientação);
        font-weight: 600;
      }
      .slot-select[data-activity='Extracurricular'] {
        background-color: var(--slot-bg-Extracurricular);
        color: var(--slot-color-Extracurricular);
        border-color: var(--slot-color-Extracurricular);
        font-weight: 600;
      }
      .slot-select[data-activity='Pesquisa'] {
        background-color: var(--slot-bg-Pesquisa);
        color: var(--slot-color-Pesquisa);
        border-color: var(--slot-color-Pesquisa);
        font-weight: 600;
      }
      .slot-select[data-activity='Extensão'] {
        background-color: var(--slot-bg-Extensão);
        color: var(--slot-color-Extensão);
        border-color: var(--slot-color-Extensão);
        font-weight: 600;
      }
      .slot-select[data-activity='Gestão'] {
        background-color: var(--slot-bg-Gestão);
        color: var(--slot-color-Gestão);
        border-color: var(--slot-color-Gestão);
        font-weight: 600;
      }
      .slot-select[data-activity='Comissões'] {
        background-color: var(--slot-bg-Comissões);
        color: var(--slot-color-Comissões);
        border-color: var(--slot-color-Comissões);
        font-weight: 600;
      }

      .calculated-row {
        background: rgba(0, 102, 179, 0.02);
      }

      .total-h {
        font-weight: 700;
        color: #333;
      }
      .total-h.blue {
        color: #0066b3;
      }

      .form-group.has-error .form-input {
        border-color: #ff5252;
        background-color: #fff8f8;
      }
      .error-msg {
        font-size: 0.75rem;
        color: #ff5252;
        font-weight: 500;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #eee;
      }
      .btn-primary {
        background: #0066b3;
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .btn-secondary {
        background: white;
        color: #666;
        border: 1px solid #ddd;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 102, 179, 0.3);
      }

      @media (max-width: 600px) {
        .grid-form {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class PitFormComponent {
  private pitRitService = inject(PitRitService);
  private pdfService = inject(PdfGeneratorService);
  private notificationService = inject(NotificationService);

  data: any = {};
  readonly periods = ['Manhã', 'Tarde', 'Noite'];
  readonly slots = ['A', 'B', 'C', 'D'];
  readonly days = [0, 1, 2, 3, 4];
  readonly activityOptions = [
    'Aula',
    'Planejamento',
    'Atendimento',
    'Apoio',
    'Orientação',
    'Extracurricular',
    'Pesquisa',
    'Extensão',
    'Gestão',
    'Comissões',
  ];

  constructor() {
    this.pitRitService.currentPitData$.subscribe((d) => {
      this.data = JSON.parse(JSON.stringify(d));
    });
  }

  update() {
    // Basic multipliers from pit.php
    this.data.atividades.ensino.aulas.t1 =
      this.data.atividades.ensino.aulas.q1 * 1;
    this.data.atividades.ensino.aulas.t2 =
      this.data.atividades.ensino.aulas.q2 * 1;
    this.data.atividades.ensino.aulas.t3 =
      this.data.atividades.ensino.aulas.q3 * 0.05;

    this.pitRitService.updatePitData(this.data);
  }

  reset() {
    this.pitRitService.resetPit();
    this.notificationService.showInfo('Formulário limpo.');
  }

  generate() {
    if (!this.data.identificacao.nome) {
      this.notificationService.showError(
        'Preencha pelo menos o seu nome para gerar o PDF.'
      );
      return;
    }
    this.pdfService.generatePitPdf(this.data);
    this.notificationService.showSuccess('PDF do PIT gerado com sucesso!');
  }
}
