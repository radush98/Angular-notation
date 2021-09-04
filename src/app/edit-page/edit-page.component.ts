import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Notation } from '../shared/interfaces';
import { NotationService } from '../shared/notation.service';

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
    private route: ActivatedRoute
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
    this.form.reset();
  }

}
