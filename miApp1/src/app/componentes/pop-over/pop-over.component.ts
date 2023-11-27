import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  public lista = new Array(6);

  ngOnInit() {}

  onClick(i: number) {
    this.popoverController.dismiss({
      dato: i + 1
    });
  }

}
