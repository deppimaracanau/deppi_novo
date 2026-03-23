import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PitRitService, RitData } from '../services/pit-rit.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../core/services/notification.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-rit-form',
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
    <div class="rit-form-container glass-card animate-fade-in">
      <header class="form-header">
        <h2 class="section-title">Formulário RIT</h2>
        <p class="section-desc">
          Relatório Individual de Trabalho - Atividades desenvolvidas no
          semestre.
        </p>
      </header>

      <form #ritForm="ngForm" class="modern-form">
        <!-- IDENTIFICAÇÃO -->
        <div class="form-section">
          <h3 class="subsection-title">Identificação do Servidor</h3>
          <div class="grid-form">
            <div
              class="form-group"
              [class.has-error]="ritForm.submitted && !data.identificacao.nome"
            >
              <label>Nome Completo *</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.nome"
                name="nome"
                #nome="ngModel"
                required
                (change)="update()"
                class="form-input"
              />
              <span class="error-msg" *ngIf="ritForm.submitted && nome.invalid"
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
              <label>Regime</label>
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
              <label>Semestre Letivo *</label>
              <input
                type="text"
                [(ngModel)]="data.semestre"
                name="semestre"
                #sem="ngModel"
                required
                mask="0000.0"
                (change)="update()"
                placeholder="2024.1"
                class="form-input"
              />
              <span class="error-msg" *ngIf="ritForm.submitted && sem.invalid"
                >Semestre inválido</span
              >
            </div>
          </div>
        </div>

        <!-- RELATÓRIOS NARRATIVOS -->
        <div class="form-section">
          <h3 class="subsection-title">Atividades Desenvolvidas</h3>

          <div class="report-grid">
            <div class="report-item">
              <label>Atividades de Ensino</label>
              <p class="field-help">
                Disciplinas ministradas, orientações concluídas, atendimento ao
                aluno...
              </p>
              <textarea
                [(ngModel)]="data.relatorios.ensino"
                name="rel_ensino"
                (change)="update()"
                rows="4"
                class="form-textarea"
              ></textarea>
            </div>

            <div class="report-item">
              <label>Atividades de Pesquisa Aplicada</label>
              <p class="field-help">
                Andamento dos projetos, cronograma e atividades desenvolvidas.
              </p>
              <textarea
                [(ngModel)]="data.relatorios.pesquisa"
                name="rel_pesquisa"
                (change)="update()"
                rows="4"
                class="form-textarea"
              ></textarea>
            </div>

            <div class="report-item">
              <label>Atividades de Extensão</label>
              <p class="field-help">
                Projetos de extensão, programas e impacto na comunidade.
              </p>
              <textarea
                [(ngModel)]="data.relatorios.extensao"
                name="rel_extensao"
                (change)="update()"
                rows="4"
                class="form-textarea"
              ></textarea>
            </div>

            <div class="report-item">
              <label>Atividades de Gestão / Comissões</label>
              <p class="field-help">
                Atividades institucionais, coordenação, fiscalização e
                comissões.
              </p>
              <textarea
                [(ngModel)]="data.relatorios.gestao"
                name="rel_gestao"
                (change)="update()"
                rows="4"
                class="form-textarea"
              ></textarea>
            </div>

            <div class="report-item">
              <label>Atividades de Capacitação</label>
              <p class="field-help">
                Cursos, treinamentos e especializações realizadas.
              </p>
              <textarea
                [(ngModel)]="data.relatorios.capacitacao"
                name="rel_capacitacao"
                (change)="update()"
                rows="4"
                class="form-textarea"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- QUADRO DE HORÁRIOS -->
        <div class="form-section">
          <h3 class="subsection-title">
            Distribuição de Carga Horária (Semestre Anterior)
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
            Gerar Relatório RIT
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .rit-form-container {
        padding: 2.5rem;
        max-width: 1000px;
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
        margin-bottom: 3.5rem;
      }
      .subsection-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #0066b3;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .subsection-title::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #eee;
      }

      .grid-form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      .report-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .report-item label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #333;
      }
      .field-help {
        font-size: 0.8rem;
        color: #888;
        margin-bottom: 0.75rem;
      }

      .form-input,
      .form-select,
      .form-textarea,
      .slot-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        background: white;
      }
      .form-textarea {
        resize: vertical;
        min-height: 100px;
      }
      .form-input:focus,
      .form-select:focus,
      .form-textarea:focus {
        border-color: #0066b3;
        box-shadow: 0 0 0 3px rgba(0, 102, 179, 0.1);
        outline: none;
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
      }

      .form-group.has-error .form-input {
        border-color: #ff5252;
        background-color: #fff8f8;
      }
      .error-msg {
        font-size: 0.75rem;
        color: #ff5252;
        font-weight: 500;
        margin-top: 2px;
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
        padding: 0.8rem 2.5rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
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
        background: #005696;
      }

      @media (max-width: 600px) {
        .grid-form {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class RitFormComponent {
  private pitRitService = inject(PitRitService);
  private pdfService = inject(PdfGeneratorService);
  private notificationService = inject(NotificationService);

  data!: RitData;
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
    this.pitRitService.currentRitData$.subscribe((d) => {
      this.data = JSON.parse(JSON.stringify(d));
    });
  }

  update() {
    this.pitRitService.updateRitData(this.data);
  }

  reset() {
    this.pitRitService.resetRit();
    this.notificationService.showInfo('Formulário RIT limpo.');
  }

  generate() {
    if (!this.data.identificacao.nome) {
      this.notificationService.showError(
        'Preencha pelo menos o seu nome para gerar o PDF.'
      );
      return;
    }
    this.pdfService.generateRitPdf(this.data);
    this.notificationService.showSuccess('PDF do RIT gerado com sucesso!');
  }
}
