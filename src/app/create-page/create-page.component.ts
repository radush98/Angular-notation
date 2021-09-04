import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotationService } from '../shared/notation.service';
import { Notation } from '../shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.less']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup
  title = "New post";
  constructor(
    private nservice: NotationService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid)
      return

    const notation:Notation = {
      title:this.form.value.title,
      text:this.form.value.text,
      date:new Date()
    }
    
    this.nservice.postNotation(notation).subscribe(()=>{
      this.form.reset()
    })
  }

  back() {
    this.form.reset();
  }


}
