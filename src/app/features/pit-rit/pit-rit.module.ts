import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { PitFormComponent } from './components/pit-form.component';
import { RitFormComponent } from './components/rit-form.component';

@Component({
  selector: 'app-pit-rit',
  template: `
    <main class="page-container">
      <section class="split-section hero-section">
        <div class="content-col">
          <span class="subtitle">{{ 'pitRit.subtitle' | translate }}</span>
          <h1 class="title">{{ 'pitRit.title' | translate }}</h1>
          <p
            class="description"
            [innerHTML]="'pitRit.description' | translate"
          ></p>
          <div class="action-buttons tabs">
            <button
              class="tab-btn"
              [class.active]="activeTab === 'pit'"
              (click)="activeTab = 'pit'; scrollToForm()"
            >
              <span class="btn-icon">📝</span> Plano (PIT)
            </button>
            <button
              class="tab-btn"
              [class.active]="activeTab === 'rit'"
              (click)="activeTab = 'rit'; scrollToForm()"
            >
              <span class="btn-icon">📊</span> Relatório (RIT)
            </button>
          </div>
        </div>
        <div class="image-col">
          <img src="assets/cargahoraria/pit-rit.jpg" alt="PIT / RIT" />
        </div>
      </section>

      <section id="pit-rit-form-section" class="form-section-wrapper">
        <div class="container-narrow">
          <ng-container [ngSwitch]="activeTab">
            <app-pit-form *ngSwitchCase="'pit'"></app-pit-form>
            <app-rit-form *ngSwitchCase="'rit'"></app-rit-form>
          </ng-container>
        </div>
      </section>

      <section class="split-section reverse-mobile">
        <div class="image-col">
          <img src="assets/cargahoraria/pit.jpg" alt="PIT" />
        </div>
        <div class="content-col">
          <span class="subtitle">{{ 'pitRit.pit.subtitle' | translate }}</span>
          <h1 class="title">{{ 'pitRit.pit.title' | translate }}</h1>
          <p class="description">
            {{ 'pitRit.pit.description' | translate }}
            <span class="highlight">{{
              'pitRit.pit.highlight' | translate
            }}</span>
          </p>
        </div>
      </section>

      <section class="split-section">
        <div class="content-col">
          <span class="subtitle">{{ 'pitRit.rit.subtitle' | translate }}</span>
          <h1 class="title">{{ 'pitRit.rit.title' | translate }}</h1>
          <p class="description">
            {{ 'pitRit.rit.description' | translate }}
            <span class="highlight">{{
              'pitRit.rit.highlight' | translate
            }}</span>
          </p>
        </div>
        <div class="image-col">
          <img src="assets/cargahoraria/rit.jpg" alt="RIT" />
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-content">
          <h2>{{ 'pitRit.access.title' | translate }}</h2>
          <p>{{ 'pitRit.access.description' | translate }}</p>
          <div class="cta-btns">
            <a
              href="https://suap.ifce.edu.br"
              target="_blank"
              class="btn btn-outline"
            >
              {{ 'pitRit.access.button' | translate }}
            </a>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .page-container {
        min-height: 100vh;
        padding-top: 120px;
        padding-bottom: 60px;
        background-color: #fafafa;
        font-family: var(--font-display, 'Inter', sans-serif);
        color: #333;
      }
      .split-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        max-width: 1100px;
        margin: 0 auto;
        padding: 4rem 2rem;
        align-items: center;
      }
      .subtitle {
        color: #00d97e;
        font-weight: 700;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
      .subtitle::before {
        content: '';
        display: inline-block;
        width: 30px;
        height: 2px;
        background-color: #00d97e;
        margin-right: 15px;
      }
      .title {
        font-size: 3.5rem;
        font-weight: 800;
        color: #1a1a1a;
        margin: 0 0 1.5rem;
        line-height: 1.1;
      }
      .description {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #4a4a4a;
        margin-bottom: 2.5rem;
      }
      .highlight {
        background-color: #00e676;
        color: #000;
        font-weight: 600;
        padding: 0 0.2rem;
      }
      .image-col img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      .action-buttons.tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .tab-btn {
        padding: 1rem 2rem;
        border-radius: 12px;
        border: 1px solid #ddd;
        background: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        color: #666;
      }
      .tab-btn.active {
        background: #0066b3;
        border-color: #0066b3;
        color: white;
        box-shadow: 0 10px 20px rgba(0, 102, 179, 0.2);
        transform: translateY(-2px);
      }
      .btn-icon {
        font-size: 1.2rem;
      }

      .form-section-wrapper {
        background: #fff;
        padding: 5rem 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
      .container-narrow {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .cta-section {
        background: linear-gradient(135deg, #0066b3 0%, #004d87 100%);
        color: white;
        padding: 6rem 2rem;
        text-align: center;
        margin-top: 4rem;
      }
      .cta-content {
        max-width: 800px;
        margin: 0 auto;
      }
      .cta-content h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      .cta-content p {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-bottom: 2.5rem;
      }

      .btn {
        display: inline-block;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.33s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        border: none;
      }
      .btn-primary {
        background: #0066b3;
        color: white;
        box-shadow: 0 4px 14px rgba(0, 102, 179, 0.39);
      }
      .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 102, 179, 0.23);
      }
      .btn-outline {
        background: white;
        color: #0066b3;
      }
      .btn-outline:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      @media (max-width: 768px) {
        .split-section {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .reverse-mobile .image-col {
          order: 2;
        }
        .reverse-mobile .content-col {
          order: 1;
        }
        .title {
          font-size: 2.5rem;
        }
        .cta-content h2 {
          font-size: 2rem;
        }
        .action-buttons.tabs {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class PitRitComponent {
  activeTab: 'pit' | 'rit' = 'pit';

  scrollToForm() {
    setTimeout(() => {
      const el = document.getElementById('pit-rit-form-section');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  }
}

const routes: Routes = [{ path: '', component: PitRitComponent }];

@NgModule({
  declarations: [PitRitComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    FormsModule,
    PitFormComponent,
    RitFormComponent,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [],
})
export class PitRitModule {}
