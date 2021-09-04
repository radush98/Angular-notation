import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Notation } from '../shared/interfaces';
import { NotationService } from '../shared/notation.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

  nSub!: Subscription
  notations: Notation[] = []
  constructor(
    private nservice: NotationService
  ) { }

  ngOnInit(): void {
    this.nSub = this.nservice.getAllNotations().subscribe((notations) => {
      this.notations = notations;
    })
  }

  delete(id: string | undefined) {
    console.log(id);

    if (id)
      this.nservice.deleteNotation(id).subscribe(() => {
        this.notations = this.notations.filter(notation => notation.id !== id)
      })
  }

}
