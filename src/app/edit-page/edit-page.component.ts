import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Notation } from '../shared/interfaces';
import { ModalResultService } from '../shared/services/modal-result.service';
import { NotationService } from '../shared/services/notation.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.less']
})
export class EditPageComponent implements OnInit {

  form!: FormGroup
  title = "Edit post"
  notation!: Notation

  constructor(
    private nservice: NotationService,
    private route: ActivatedRoute,
    private mservice: ModalResultService,
    private router:Router
  ) { }

  ngOnInit(): void {    
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.nservice.getById(params['id'])
      })
    ).subscribe((notation: Notation) => {
      this.notation = notation  
         
      this.form = new FormGroup({
        title: new FormControl(notation.title, Validators.required),
        text: new FormControl(notation.text, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }        

    this.nservice.update({
      ...this.notation,
      text: this.form.value.text,
      title: this.form.value.title,
      
    }).subscribe()
  }

  delete() {
    if (this.notation.id)    
      this.nservice.deleteNotation(this.notation.id!).subscribe()
  }

  back() {
    this.mservice.dialogResult()
    .subscribe(result => {
        if (result === "true") 
          this.router.navigate(['main'])
    }
    )
    // this.form.reset();
  }

}
