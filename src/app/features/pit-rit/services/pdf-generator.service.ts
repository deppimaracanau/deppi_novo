import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PitData, RitData } from './pit-rit.service';
import { PIT_SHEET_DATA } from '../constants/pit.constants';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}

  async generatePitPdf(data: PitData) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    try {
      doc.addImage(
        'assets/cargahoraria/brasao.png',
        'PNG',
        pageWidth / 2 - 15,
        10,
        30,
        30
      );
    } catch (e) {
      console.warn(
        'Brasão image not found in assets. Make sure it was copied.'
      );
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('MINISTÉRIO DA EDUCAÇÃO', pageWidth / 2, 45, { align: 'center' });
    doc.text(
      'SECRETARIA DE EDUCAÇÃO PROFISSIONAL E TECNOLÓGICA',
      pageWidth / 2,
      50,
      { align: 'center' }
    );
    doc.text(
      'INSTITUTO FEDERAL DE EDUCAÇÃO CIÊNCIA E TECNOLOGIA DO CEARÁ',
      pageWidth / 2,
      55,
      { align: 'center' }
    );

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PLANO DE TRABALHO DOCENTE (PIT)', pageWidth / 2, 65, {
      align: 'center',
    });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Referente ao Semestre Letivo: ${data.semestre || '____._'}`,
      15,
      75
    );

    // Identification table
    autoTable(doc, {
      startY: 80,
      head: [['IDENTIFICAÇÃO DO SERVIDOR', '']],
      body: [
        ['Nome:', data.identificacao?.nome || ''],
        ['Siape:', data.identificacao?.siape || ''],
        ['Curso:', data.identificacao?.curso || ''],
        ['Campus:', data.identificacao?.campus || ''],
        ['Telefone:', data.identificacao?.telefone || ''],
        ['Email:', data.identificacao?.email || ''],
        ['Vínculo:', data.identificacao?.vinculo || ''],
        ['Regime:', data.identificacao?.regime || ''],
      ],
      theme: 'plain',
      styles: { cellPadding: 1, fontSize: 9 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40 },
        1: { cellWidth: 'auto' },
      },
      margin: { left: 15, right: 15 },
    });

    let currentY = (doc as any).lastAutoTable.finalY + 4;

    // Header ATIVIDADES DOCENTES
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('ATIVIDADES DOCENTES', 15, currentY);
    currentY += 3;

    PIT_SHEET_DATA.forEach((section) => {
      const body: any[] = [];
      let subtotal = 0;
      section.rows.forEach(row => {
        if (!row.isSubtotal && row.t) {
          const val = this.getTValue(data, row.t);
          body.push([row.desc || '', val]);
          subtotal += val;
        }
      });
      // Linha de subtotal
      body.push([
        { content: 'Subtotal', styles: { fontStyle: 'bold' } },
        { content: subtotal, styles: { fontStyle: 'bold' } }
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [[{ content: section.title, colSpan: 1 }, 'H']],
        body: body,
        theme: 'grid',
        headStyles: {
          fillColor: [210, 210, 210],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
          fontSize: 7,
          cellPadding: 1.5,
        },
        styles: { fontSize: 7, cellPadding: 1 },
        columnStyles: {
          0: { cellWidth: pageWidth - 45 },
          1: { halign: 'center', cellWidth: 20 },
        },
        margin: { left: 15, right: 15 },
      });
      currentY = (doc as any).lastAutoTable.finalY + 1;
    });

    // Linha de Total Geral
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 2,
      body: [[`TOTAL GERAL (Máximo ${data.identificacao?.regime || '40h'})`, `${data.total || 0}h`]],
      theme: 'grid',
      styles: { fontSize: 9, fontStyle: 'bold', cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: pageWidth - 45 },
        1: { halign: 'center', cellWidth: 20 },
      },
      margin: { left: 15, right: 15 },
    });

    // Sem tabela de horários no PDF conforme solicitado

    // Assinaturas
    currentY = (doc as any).lastAutoTable.finalY + 20;
    if (currentY > 268) {
      doc.addPage();
      currentY = 40;
    }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    const assinaturaLinha = '_________________________________';
    const linhaLargura = doc.getTextWidth(assinaturaLinha);

    // Assinatura do Servidor
    const xServidor = 15;
    doc.text(assinaturaLinha, xServidor, currentY);
    const nomeServidor = data.identificacao?.nome || 'Professor(a)';
    const nomeServidorLargura = doc.getTextWidth(nomeServidor);
    doc.text(nomeServidor, xServidor + (linhaLargura / 2) - (nomeServidorLargura / 2), currentY + 5);
    doc.text('Servidor(a)', xServidor + (linhaLargura / 2) - (doc.getTextWidth('Servidor(a)') / 2), currentY + 9);

    // Assinatura do Departamento
    const xDepto = pageWidth - 15 - linhaLargura;
    doc.text(assinaturaLinha, xDepto, currentY);
    const nomeDepto = 'Departamento de Ensino';
    const nomeDeptoLargura = doc.getTextWidth(nomeDepto);
    doc.text(nomeDepto, xDepto + (linhaLargura / 2) - (nomeDeptoLargura / 2), currentY + 5);
    doc.text('Chefe de Departamento', xDepto + (linhaLargura / 2) - (doc.getTextWidth('Chefe de Departamento') / 2), currentY + 9);

    doc.save(`PIT_${(data.identificacao?.nome || 'Servidor').replace(/\s/g, '_')}.pdf`);
  }

  async generateRitPdf(data: RitData) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header (Same as PIT)
    try {
      doc.addImage(
        'assets/cargahoraria/brasao.png',
        'PNG',
        pageWidth / 2 - 15,
        10,
        30,
        30
      );
    } catch (e) {}

    doc.setFontSize(10);
    doc.text(
      'INSTITUTO FEDERAL DO CEARÁ - CAMPUS MARACANAÚ',
      pageWidth / 2,
      45,
      { align: 'center' }
    );
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RELATÓRIO INDIVIDUAL DE TRABALHO (RIT)', pageWidth / 2, 55, {
      align: 'center',
    });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    // Identification
    autoTable(doc, {
      startY: 65,
      head: [['IDENTIFICAÇÃO', '']],
      body: [
        ['Servidor:', data.identificacao?.nome || ''],
        ['Siape:', data.identificacao?.siape || ''],
        ['Campus:', data.identificacao?.campus || ''],
        ['Curso:', data.identificacao?.curso || ''],
        ['Vínculo:', data.identificacao?.vinculo || ''],
        ['Regime:', data.identificacao?.regime || ''],
        ['Semestre:', data.semestre || ''],
      ],
      theme: 'plain',
      styles: { fontSize: 9 },
    });

    // Reports
    const categories = [
      { label: 'ATIVIDADES DE ENSINO', data: data.relatorios.ensino },
      { label: 'PESQUISA APLICADA', data: data.relatorios.pesquisa },
      { label: 'ATIVIDADES DE EXTENSÃO', data: data.relatorios.extensao },
      { label: 'GESTÃO / COMISSÕES', data: data.relatorios.gestao },
      { label: 'CAPACITAÇÃO', data: data.relatorios.capacitacao },
    ];

    let currentY = (doc as any).lastAutoTable.finalY + 10;
    categories.forEach((cat) => {
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(cat.label, 15, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(
        cat.data || 'Nada a relatar.',
        pageWidth - 30
      );
      doc.text(lines, 15, currentY);
      currentY += lines.length * 5 + 8;
    });

    currentY += 15; // Give some space before signatures

    // Signatures
    if (currentY > 260) {
      doc.addPage();
      currentY = 40;
    }
    
    doc.setFontSize(9);
    
    // Server Signature
    doc.text('_________________________________', 30, currentY);
    let serverName = data.identificacao?.nome || 'Professor(a)';
    let nameWidth = doc.getTextWidth(serverName);
    let lineCenter = 30 + (doc.getTextWidth('_________________________________') / 2);
    doc.text(serverName, lineCenter - (nameWidth / 2), currentY + 5);

    // Department Signature
    doc.text('_________________________________', pageWidth - 100, currentY);
    let deptName = 'Departamento de Ensino';
    let deptWidth = doc.getTextWidth(deptName);
    let deptLineCenter = (pageWidth - 100) + (doc.getTextWidth('_________________________________') / 2);
    doc.text(deptName, deptLineCenter - (deptWidth / 2), currentY + 5);

    doc.save(`RIT_${(data.identificacao?.nome || 'Servidor').replace(/\s/g, '_')}.pdf`);
  }

  private getCategoryTotal(category: any): number {
    let total = 0;
    for (const key in category) {
      if (typeof category[key] === 'object')
        total += this.getCategoryTotal(category[key]);
      else if (key.startsWith('t')) total += category[key];
    }
    return total;
  }

  private getTValue(data: any, tKey: string | undefined): number {
    if (!tKey) return 0;
    const qNum = parseInt(tKey.substring(1));
    const d = data.atividades || {};
    if (qNum <= 3) return d.ensino?.aulas?.[tKey] || 0;
    if (qNum === 4 || qNum === 5) return d.ensino?.manutencao?.[tKey] || 0;
    if (qNum === 6) return d.ensino?.apoio?.[tKey] || 0;
    if (qNum <= 11) return d.ensino?.orientacao?.[tKey] || 0;
    if (qNum <= 13) return d.ensino?.extracurricular?.[tKey] || 0;
    if (qNum <= 20) return d.pesquisa?.[tKey] || 0;
    if (qNum <= 29) return d.extensao?.[tKey] || 0;
    if (qNum <= 37) return d.gestao?.[tKey] || 0;
    if (qNum <= 46) return d.comissoes?.[tKey] || 0;
    return 0;
  }
}
