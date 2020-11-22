import { Component, HostListener } from '@angular/core';
import { IpcRenderer, ipcRenderer } from 'electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'krass';

    private ipc: IpcRenderer;

    public constructor() {
        if ((<any>window).require) {
            try {
                this.ipc = (<any>window).require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            console.warn('App is not running inside electron.');
        }
    }

    public openModal(): void {
        console.log('opens a modal');
        this.ipc.send('openModal');
    }

    @HostListener('wheel', ['$event'])
    public preventActions(event: WheelEvent): void {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }
}
