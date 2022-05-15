import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private alertElement: HTMLIonAlertElement | undefined;
    private toastElement: HTMLIonToastElement | undefined;
    private loadingElement: HTMLIonLoadingElement | undefined;

    public constructor(
        private alertController: AlertController,
        private toastController: ToastController,
        private loadingController: LoadingController
    ) {
    }

    public async createAlert(options: AlertOptions): Promise<void> {
        try {
            const element = await this.alertController.create(options);
            if (this.alertElement !== undefined) {
                await this.dismissAlert();
            }
            this.alertElement = element;
            await this.alertElement.present();
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    public async createToast(options: ToastOptions): Promise<void> {
        try {
            const element = await this.toastController.create(options);
            if (this.toastElement !== undefined) {
                await this.dismissToast();
            }
            this.toastElement = element;
            await this.toastElement.present();
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    public async createLoading(options: LoadingOptions): Promise<void> {
        try {
            const element = await this.loadingController.create(options);
            if (this.loadingElement !== undefined) {
                await this.dismissLoading();
            }
            this.loadingElement = element;
            await this.loadingElement.present();
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    public async dismissAlert(): Promise<boolean> {
        if (this.alertElement !== undefined) {
            try {
                const dismissResult = await this.alertElement.dismiss();
                this.alertElement = undefined;
                return Promise.resolve(dismissResult);
            } catch (e: unknown) {
                return Promise.reject(e);
            }
        }
        return Promise.resolve(false);
    }

    public async dismissToast(): Promise<boolean> {
        if (this.toastElement !== undefined) {
            try {
                const dismissResult = await this.toastElement.dismiss();
                this.toastElement = undefined;
                return Promise.resolve(dismissResult);
            } catch (e: unknown) {
                return Promise.reject(e);
            }
        }
        return Promise.resolve(false);
    }

    public async dismissLoading(): Promise<boolean> {
        if (this.loadingElement !== undefined) {
            try {
                const dismissResult = await this.loadingElement.dismiss();
                this.loadingElement = undefined;
                return Promise.resolve(dismissResult);
            } catch (e: unknown) {
                return Promise.reject(e);
            }
        }
        return Promise.resolve(false);
    }

}
