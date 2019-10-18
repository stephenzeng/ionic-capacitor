import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public name: string;
  public version: string;
  public info: string;

  constructor(private deploy: Deploy, private alertController: AlertController) {}

  async ngOnInit() {
    this.name = environment.name;
    this.version = environment.version;

    try {
      await this.checkUpdate();
    } catch (err) {
      this.info = JSON.stringify(err);
    }    
  }

  async checkUpdate() {
    this.info = 'checking updates...';

    await this.deploy.configure({
      'appId': '88813316',
      'channel': 'Production'
    });

    const update = await this.deploy.checkForUpdate();
    this.info = 'checkForUpdate';

    if (update.available) {
      this.info = 'found updates';
      const alert = await this.alertController.create({
        header: 'found updates!',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.info = 'no update found';
    }
  }

}
