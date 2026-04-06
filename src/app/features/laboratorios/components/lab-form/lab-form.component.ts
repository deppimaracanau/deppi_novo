import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoriosService } from '../../services/laboratorios.service';

@Component({
  selector: 'app-lab-form',
  standalone: false,
  templateUrl: './lab-form.component.html'
})
export class LabFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private labsService = inject(LaboratoriosService);

  labForm: FormGroup;
  labId: string = '';
  loading = true;
  saving = false;

  constructor() {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      productions: this.fb.array([]),
      services: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.labId = id;
        this.loadLab();
      }
    });
  }

  get productions() {
    return this.labForm.get('productions') as FormArray;
  }

  get services() {
    return this.labForm.get('services') as FormArray;
  }

  addProduction() {
    this.productions.push(this.fb.group({
      title: ['', Validators.required],
      type: [''],
      year: [''],
      link: ['']
    }));
  }

  removeProduction(index: number) {
    this.productions.removeAt(index);
  }

  addService() {
    this.services.push(this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: ['']
    }));
  }

  removeService(index: number) {
    this.services.removeAt(index);
  }

  loadLab() {
    this.labsService.getById(this.labId).subscribe({
      next: (data) => {
        this.labForm.patchValue({
          name: data.name,
          description: data.description
        });
        
        // Populate arrays
        data.productions?.forEach(p => {
          this.productions.push(this.fb.group(p));
        });
        
        data.services?.forEach(s => {
          this.services.push(this.fb.group(s));
        });
        
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['/laboratorios']);
      }
    });
  }

  onSubmit() {
    if (this.labForm.invalid) return;
    
    this.saving = true;
    this.labsService.update(this.labId, this.labForm.value).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/laboratorios', this.labId]);
      },
      error: () => {
        this.saving = false;
        alert('Erro ao salvar laboratório');
      }
    });
  }
}
