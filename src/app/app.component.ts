import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private deploy: Deploy
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.checkUpdate().then(() => this.splashScreen.hide());
    });
  }

  async checkUpdate() {
    await this.deploy.configure({channel: 'production'});
    const update = await this.deploy.checkForUpdate();
    if (update.available) {
      const alert = await this.alertController.create({
        header: 'Found an update!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
