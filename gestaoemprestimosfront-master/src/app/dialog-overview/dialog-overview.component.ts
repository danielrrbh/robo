import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogDTO } from 'src/models/dialog.dto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-dialog-overview',
    templateUrl: './dialog-overview.component.html',
    styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent implements OnInit {
    titulo: string;
    texto;

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDTO,
        private sanitized: DomSanitizer
    ) {}

    ngOnInit() {
        this.titulo = this.data.titulo;
        this.texto = this.sanitized.bypassSecurityTrustHtml(this.data.texto);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
