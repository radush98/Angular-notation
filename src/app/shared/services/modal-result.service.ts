import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalResultService {

  param!: string

  constructor(
    public dialog: MatDialog
  ) { }

  dialogResult(): Observable<string> {
    let dialogRef = this.dialog.open(ModalComponent)
    return dialogRef.afterClosed();
  }
}
