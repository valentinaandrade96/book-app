import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {

    const token = sessionStorage.getItem('token');
    if(token){
      this.navCtrl.navigateForward(['/infinite-scroll'])
    }

  }

  

}
