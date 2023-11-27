import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }
  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      alert('Barcode data ' + barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
