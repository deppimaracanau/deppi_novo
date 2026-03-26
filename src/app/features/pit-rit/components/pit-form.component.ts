import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PitRitService } from '../services/pit-rit.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../core/services/notification.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

export interface PitTableRow {
  code?: string;
  desc?: string;
  peso?: number | string;
  max?: number | string;
  unidade?: string;
  q?: string;
  t?: string;
  readonly?: boolean;
  isSubtotal?: boolean;
}

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
                placeholder="Número Siape"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Campus</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.campus"
                name="campus"
                placeholder="Ex: Maracanaú"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Curso / Coordenadoria</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.curso"
                name="curso"
                placeholder="Ex: Telemática"
                (change)="update()"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Vínculo</label>
              <select
                [(ngModel)]="data.identificacao.vinculo"
                name="vinculo"
                (change)="update()"
                class="form-select"
              >
                <option value="Efetivo">Efetivo</option>
                <option value="Substituto">Substituto</option>
                <option value="Temporário">Temporário</option>
                <option value="Colaborador">Colaborador</option>
              </select>
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input
                type="text"
                [(ngModel)]="data.identificacao.telefone"
                name="tel"
                mask="(00) 0 0000-0000 || (00) 0000-0000"
                (change)="update()"
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
                <option value="30h">30h</option>
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
                class="form-input"
              />
              <span class="error-msg" *ngIf="pitForm.submitted && sem.invalid"
                >Semestre inválido</span
              >
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="subsection-title">Tabela de Carga Horária Docente</h3>
          <div class="table-responsive">
            <table class="spreadsheet-table">
              <thead>
                <tr>
                  <th width="50%">Atividades</th>
                  <th width="8%">Peso</th>
                  <th width="8%">Max</th>
                  <th width="14%">Unidade</th>
                  <th width="10%">Quantidade</th>
                  <th width="10%">CH Obtidas</th>
                </tr>
              </thead>
              <tbody>
                <ng-container *ngFor="let sec of sheetData">
                  <tr class="section-row">
                    <td colspan="6">{{ sec.title }}</td>
                  </tr>
                  <tr
                    *ngFor="let row of sec.rows"
                    [class.subtotal-row]="row.isSubtotal"
                  >
                    <ng-container *ngIf="!row.isSubtotal">
                      <td class="desc-cell">{{ row.code }} {{ row.desc }}</td>
                      <td class="text-center">{{ row.peso }}</td>
                      <td class="text-center">{{ row.max }}</td>
                      <td class="text-center">{{ row.unidade }}</td>
                      <td
                        class="input-cell"
                        [class.readonly-cell]="row.readonly"
                      >
                        <input
                          *ngIf="!row.readonly"
                          type="number"
                          min="0"
                          [ngModel]="getQValue(row.q)"
                          (ngModelChange)="setQValue(row.q, $event)"
                          [name]="row.q || ''"
                          class="table-input"
                        />
                        <span *ngIf="row.readonly">{{ getQValue(row.q) }}</span>
                      </td>
                      <td
                        class="text-center result-cell"
                        [class.calculated-val]="true"
                      >
                        {{ getTValue(row.t) | number: '1.1-1' }}
                      </td>
                    </ng-container>
                    <ng-container *ngIf="row.isSubtotal">
                      <td colspan="5" class="text-right fw-bold">Subtotal</td>
                      <td class="text-center subtotal-cell fw-bold">
                        {{ getSubtotal(sec) | number: '1.1-1' }}
                      </td>
                    </ng-container>
                  </tr>
                </ng-container>
              </tbody>
            </table>
          </div>
        </div>

        <div class="form-section">
          <div class="total-alert">
            Carga Horária Total:
            <strong>{{ data.total | number: '1.1-1' }}h</strong> (Máximo
            {{ data.identificacao.regime }})
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
        max-width: 1200px;
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
      .form-group label {
        font-size: 0.9rem;
        font-weight: 700;
        color: #1a1a1a !important;
        margin-bottom: 0.5rem;
        display: block;
      }
      .form-input,
      .form-select {
        padding: 0.75rem 1rem;
        border: 2px solid #ccc;
        border-radius: 8px;
        font-size: 0.95rem;
        background: white;
        color: #1a1a1a;
      }

      .spreadsheet-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        border: 1px solid #ccc;
      }
      .spreadsheet-table th,
      .spreadsheet-table td {
        border: 1px solid #ccc;
        padding: 0.5rem;
        font-size: 0.85rem;
      }
      .spreadsheet-table th {
        background: #f0f0f0;
        text-align: center;
        color: #333;
        font-weight: bold;
      }
      .section-row td {
        background: #e0e0e0;
        font-weight: bold;
        font-size: 0.9rem;
        text-align: left;
      }
      .desc-cell {
        font-size: 0.8rem;
        color: #444;
      }
      .text-center {
        text-align: center;
      }
      .text-right {
        text-align: right;
      }
      .fw-bold {
        font-weight: bold;
      }
      .input-cell {
        padding: 0 !important;
        background: #c8e6c9;
      }
      .readonly-cell {
        background: #f9f9f9;
        text-align: center;
        color: #888;
      }
      .input-cell input {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        text-align: center;
        font-size: 0.85rem;
        font-weight: bold;
        min-height: 28px;
      }
      .input-cell input:focus {
        outline: 2px solid #2e7d32;
      }
      .result-cell {
        background: #fff3e0;
        font-weight: bold;
      }
      .subtotal-cell {
        background: #ffea00;
        font-weight: bold;
        font-size: 0.95rem;
        color: #333;
      }

      .table-responsive {
        overflow-x: auto;
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

      .total-alert {
        background: #e3f2fd;
        padding: 1.5rem;
        text-align: center;
        border-radius: 8px;
        font-size: 1.2rem;
        color: #1565c0;
        margin-top: 1rem;
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
        border-top: 1px solid #eee;
        padding-top: 2rem;
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

  readonly sheetData: { title: string; rows: PitTableRow[] }[] = [
    {
      title: '1 AULAS EM FIC, TÉCNICO, ESPECIALIZAÇÃO...',
      rows: [
        {
          code: '1.1',
          desc: 'Cursos Técnico e/ou Licenciaturas',
          peso: 1,
          max: 20,
          unidade: 'Créditos',
          q: 'q1',
          t: 't1',
        },
        {
          code: '1.2',
          desc: 'Cursos de Especialização, Graduação e Pós-Graduação',
          peso: 1,
          max: 20,
          unidade: 'Créditos',
          q: 'q2',
          t: 't2',
        },
        {
          code: '1.3',
          desc: 'Cursos FIC (Observar a regulamentação)',
          peso: 0.05,
          max: 400,
          unidade: 'Horas',
          q: 'q3',
          t: 't3',
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '2 ATIVIDADES DE MANUTENÇÃO AO ENSINO (até 18 horas)',
      rows: [
        {
          code: '2.1',
          desc: 'Preparação + Planejamento',
          peso: 0.8,
          max: 14,
          unidade: 'Horas',
          q: '-',
          t: 't4',
          readonly: true,
        },
        {
          code: '2.2',
          desc: 'Atendimento a Estudantes',
          peso: 0.2,
          max: 4,
          unidade: 'Horas',
          q: '-',
          t: 't5',
          readonly: true,
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '3 ATIVIDADES DE APOIO AO ENSINO (2 horas)',
      rows: [
        {
          code: '3.1',
          desc: 'Participação nos encontros técnico-pedagógicos',
          peso: 1,
          max: 1,
          unidade: '-',
          q: '-',
          t: 't6',
          readonly: true,
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '4 ATIVIDADES DE ORIENTAÇÃO (até 10 horas)',
      rows: [
        {
          code: '4.1',
          desc: 'Orientação de TCC graduação',
          peso: 1,
          max: 6,
          unidade: 'Estudantes',
          q: 'q7',
          t: 't7',
        },
        {
          code: '4.2',
          desc: 'Orientação de Estágio (Supervisor-Orientador)',
          peso: 1,
          max: 4,
          unidade: 'Estudantes',
          q: 'q8',
          t: 't8',
        },
        {
          code: '4.3',
          desc: 'Orientação de Estágio (Regulamentação diferenciada)',
          peso: 2,
          max: 4,
          unidade: 'Estudantes',
          q: 'q9',
          t: 't9',
        },
        {
          code: '4.4',
          desc: 'Monitoria',
          peso: 2,
          max: 1,
          unidade: 'Estudantes',
          q: 'q10',
          t: 't10',
        },
        {
          code: '4.5',
          desc: 'Programa Institucional (PIBID) / Programas de Êxito',
          peso: 10,
          max: 1,
          unidade: 'Programa',
          q: 'q11',
          t: 't11',
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '5 ATIVIDADES DE ENSINO EXTRACURRICULAR (até 10 horas)',
      rows: [
        {
          code: '5.1',
          desc: 'Responsável por Laboratório',
          peso: 8,
          max: 1,
          unidade: 'Laboratórios',
          q: 'q12',
          t: 't12',
        },
        {
          code: '5.2',
          desc: 'Projetos ou atividades complementares extras',
          peso: 1,
          max: 2,
          unidade: 'Projetos',
          q: 'q13',
          t: 't13',
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '6 ATIVIDADES DE PESQUISA APLICADA (até 18 horas)',
      rows: [
        {
          code: '6.1',
          desc: 'Coord. projeto pesquisa fomento IFCE ou sem recurs.',
          peso: 4.0,
          max: 3.0,
          unidade: 'Projetos',
          q: 'q14',
          t: 't14',
        },
        {
          code: '6.2',
          desc: 'Coord. projeto pesquisa com captação externa',
          peso: 6.0,
          max: 2.0,
          unidade: 'Projetos',
          q: 'q15',
          t: 't15',
        },
        {
          code: '6.3',
          desc: 'Participação em equipe de projeto pesquisa',
          peso: 3.0,
          max: 2.0,
          unidade: 'Projetos',
          q: 'q16',
          t: 't16',
        },
        {
          code: '6.4',
          desc: 'Orient. especialização, Co-orientação Mestrado/Doutorado',
          peso: 2.0,
          max: 4.0,
          unidade: 'Estudantes',
          q: 'q17',
          t: 't17',
        },
        {
          code: '6.5',
          desc: 'Bolsista produtividade PQ, DT do CNPq',
          peso: 16.0,
          max: 1.0,
          unidade: 'Bolsas',
          q: 'q18',
          t: 't18',
        },
        {
          code: '6.6',
          desc: 'Part. stricto sensu COLABORADOR',
          peso: 8.0,
          max: 1.0,
          unidade: 'Programas',
          q: 'q19',
          t: 't19',
        },
        {
          code: '6.7',
          desc: 'Part. stricto sensu PERMANENTE',
          peso: 16.0,
          max: 1.0,
          unidade: 'Programas',
          q: 'q20',
          t: 't20',
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '7 ATIVIDADES DE EXTENSÃO (até 18 horas)',
      rows: [
        {
          code: '7.1',
          desc: 'Coord. projeto extensão fomento IFCE ou sem res.',
          peso: 4.0,
          max: 3.0,
          unidade: 'Projetos',
          q: 'q21',
          t: 't21',
        },
        {
          code: '7.2',
          desc: 'Coord. projeto extensão captação de recursos',
          peso: 6.0,
          max: 2.0,
          unidade: 'Projetos',
          q: 'q22',
          t: 't22',
        },
        {
          code: '7.3',
          desc: 'Participação em equipe de extensão, exceto FIC',
          peso: 3.0,
          max: 2.0,
          unidade: 'Projetos',
          q: 'q23',
          t: 't23',
        },
        {
          code: '7.4',
          desc: 'Coordenação incubadoras de empresas',
          peso: 16.0,
          max: 1.0,
          unidade: 'Coordenações',
          q: 'q24',
          t: 't24',
        },
        {
          code: '7.5',
          desc: 'Coordenação dos NAPNEs e NEABIs',
          peso: 5.0,
          max: 1.0,
          unidade: 'Coordenações',
          q: 'q25',
          t: 't25',
        },
        {
          code: '7.6',
          desc: 'Participação em NAPNEs e NEABIs',
          peso: 3.0,
          max: 1.0,
          unidade: 'Participações',
          q: 'q26',
          t: 't26',
        },
        {
          code: '7.7',
          desc: 'Cursos FIC (Horas por curso)',
          peso: 0.05,
          max: 240.0,
          unidade: 'Duração',
          q: 'q27',
          t: 't27',
        },
        {
          code: '7.8',
          desc: 'Preparação + Planejamento cursos FIC',
          peso: 0.05,
          max: 120.0,
          unidade: 'Duração',
          q: 'q28',
          t: 't28',
        },
        {
          code: '7.9',
          desc: 'Planejamento e organ. de eventos de extensão',
          peso: 1.0,
          max: 2.0,
          unidade: 'Eventos',
          q: 'q29',
          t: 't29',
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '8 ATIVIDADES DE GESTÃO INSTITUCIONAL E ACADÊMICA (até 18 horas)',
      rows: [
        {
          code: '8.1',
          desc: 'Coordenador de Curso',
          peso: 18.0,
          max: 1,
          unidade: 'Curso',
          q: 'q30',
          t: 't30',
        },
        {
          code: '8.2',
          desc: 'Coordenador de Setor',
          peso: 18.0,
          max: 1,
          unidade: 'Setor',
          q: 'q31',
          t: 't31',
        },
        {
          code: '8.3',
          desc: 'Chefe de Departamento',
          peso: 18.0,
          max: 1,
          unidade: 'Departament.',
          q: 'q32',
          t: 't32',
        },
        {
          code: '8.4',
          desc: 'Diretores de Área/Setor',
          peso: 18.0,
          max: 1,
          unidade: 'Área',
          q: 'q33',
          t: 't33',
        },
        {
          code: '8.5',
          desc: 'Assessor da Reitoria',
          peso: 18.0,
          max: 1,
          unidade: 'Assessoria',
          q: 'q34',
          t: 't34',
        },
        {
          code: '8.6',
          desc: 'Coordenador Implantação de Campus',
          peso: 18.0,
          max: 1,
          unidade: 'Coordenação',
          q: 'q35',
          t: 't35',
        },
        {
          code: '8.7',
          desc: 'Assistente Pró-Reitoria / Gabinete',
          peso: 18.0,
          max: 1,
          unidade: 'Assessoria',
          q: 'q36',
          t: 't36',
        },
        {
          code: '8.8',
          desc: 'Coord. prog. institucional (Ensino/Pesq./Ext)',
          peso: 18.0,
          max: 1,
          unidade: 'Programa',
          q: 'q37',
          t: 't37',
        },
        { isSubtotal: true },
      ],
    },
    {
      title: '9 ATIVIDADES EM COMISSÕES OU DE FISCALIZAÇÃO (até 18 horas)',
      rows: [
        {
          code: '9.1',
          desc: 'Conselhos, comissões permanecentes.',
          peso: 3.0,
          max: 1,
          unidade: '-',
          q: 'q38',
          t: 't38',
        },
        {
          code: '9.2',
          desc: 'CPA Pessoal Docente (Central)',
          peso: 8.0,
          max: 1,
          unidade: '-',
          q: 'q39',
          t: 't39',
        },
        {
          code: '9.3',
          desc: 'CPA Pessoal Docente (Local)',
          peso: 4.0,
          max: 1,
          unidade: '-',
          q: 'q40',
          t: 't40',
        },
        {
          code: '9.4',
          desc: 'Conselhos ou comitês permanentes externos',
          peso: 1.0,
          max: 1,
          unidade: '-',
          q: 'q41',
          t: 't41',
        },
        {
          code: '9.5',
          desc: 'Colegiado de Cursos',
          peso: 1.0,
          max: 2,
          unidade: 'Curso',
          q: 'q42',
          t: 't42',
        },
        {
          code: '9.6',
          desc: 'Núcleo Docente Estruturante (NDE)',
          peso: 1.0,
          max: 2,
          unidade: 'Curso',
          q: 'q43',
          t: 't43',
        },
        {
          code: '9.7',
          desc: 'Comissão de Processo Administrativo Disciplinar',
          peso: 4.0,
          max: 1,
          unidade: 'Processo',
          q: 'q44',
          t: 't44',
        },
        {
          code: '9.8',
          desc: 'Participação em Direção Sindical (Titular)',
          peso: 4.0,
          max: 1,
          unidade: '-',
          q: 'q45',
          t: 't45',
        },
        {
          code: '9.9',
          desc: 'Fiscalização de contrato',
          peso: 1.0,
          max: 2,
          unidade: 'Contrato',
          q: 'q46',
          t: 't46',
        },
        { isSubtotal: true },
      ],
    },
  ];

  constructor() {
    this.pitRitService.currentPitData$.subscribe((d) => {
      this.data = JSON.parse(JSON.stringify(d));
    });
  }

  getQValue(qKey: string | undefined): number {
    if (!qKey || qKey === '-') return 0;
    const qNum = parseInt(qKey.substring(1));
    const d = this.data.atividades;
    if (qNum <= 3) return d.ensino.aulas[qKey] || 0;
    if (qNum <= 6) return 0;
    if (qNum <= 11) return d.ensino.orientacao[qKey] || 0;
    if (qNum <= 13) return d.ensino.extracurricular[qKey] || 0;
    if (qNum <= 20) return d.pesquisa[qKey] || 0;
    if (qNum <= 29) return d.extensao[qKey] || 0;
    if (qNum <= 37) return d.gestao[qKey] || 0;
    if (qNum <= 46) return d.comissoes[qKey] || 0;
    return 0;
  }

  setQValue(qKey: string | undefined, val: number): void {
    if (!qKey || qKey === '-') return;
    if (val < 0) val = 0;
    const qNum = parseInt(qKey.substring(1));
    const d = this.data.atividades;
    if (qNum <= 3) d.ensino.aulas[qKey] = val;
    else if (qNum <= 11) d.ensino.orientacao[qKey] = val;
    else if (qNum <= 13) d.ensino.extracurricular[qKey] = val;
    else if (qNum <= 20) d.pesquisa[qKey] = val;
    else if (qNum <= 29) d.extensao[qKey] = val;
    else if (qNum <= 37) d.gestao[qKey] = val;
    else if (qNum <= 46) d.comissoes[qKey] = val;
    this.update();
  }

  getTValue(tKey: string | undefined): number {
    if (!tKey) return 0;
    const qNum = parseInt(tKey.substring(1));
    const d = this.data.atividades;
    if (qNum <= 3) return d.ensino.aulas[tKey] || 0;
    if (qNum === 4 || qNum === 5) return d.ensino.manutencao[tKey] || 0;
    if (qNum === 6) return d.ensino.apoio[tKey] || 0;
    if (qNum <= 11) return d.ensino.orientacao[tKey] || 0;
    if (qNum <= 13) return d.ensino.extracurricular[tKey] || 0;
    if (qNum <= 20) return d.pesquisa[tKey] || 0;
    if (qNum <= 29) return d.extensao[tKey] || 0;
    if (qNum <= 37) return d.gestao[tKey] || 0;
    if (qNum <= 46) return d.comissoes[tKey] || 0;
    return 0;
  }

  getSubtotal(section: any): number {
    let total = 0;
    section.rows.forEach((row: any) => {
      if (!row.isSubtotal) total += this.getTValue(row.t);
    });
    return total;
  }

  update() {
    this.pitRitService.updatePitData(this.data);
  }

  reset() {
    this.pitRitService.resetPit();
    this.notificationService.showInfo('Formulário limpo.');
  }

  generate() {
    if (!this.data.identificacao.nome) {
      this.notificationService.showError(
        'Preencha o seu nome para gerar o PDF.'
      );
      return;
    }
    this.pdfService.generatePitPdf(this.data);
    this.notificationService.showSuccess('PDF do PIT gerado com sucesso!');
  }
}
