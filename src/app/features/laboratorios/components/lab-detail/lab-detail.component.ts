import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LaboratoriosService } from '../../services/laboratorios.service';
import { Laboratorio } from '../../models/laboratorio.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-lab-detail',
  standalone: false,
  templateUrl: './lab-detail.component.html'
})
export class LabDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private labsService = inject(LaboratoriosService);
  private authService = inject(AuthService);

  lab: Laboratorio | null = null;
  loading = true;
  isAdmin$: Observable<boolean> = this.authService.isAuthenticated$;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadLab(id);
      }
    });
  }

  loadLab(id: string) {
    this.labsService.getById(id).subscribe({
      next: (data) => {
        this.lab = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/laboratorios']);
      }
    });
  }
}
