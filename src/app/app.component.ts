import { Component, HostListener } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'krass';

    public backgroundLayer = {
        layer: 0,
        background: '#fff',
        width: 210,
        height: 210
    };

    public drawSubject = new Subject<any>();

    private ipc: IpcRenderer;

    public constructor() {
        if ((window as any).require) {
            try {
                this.ipc = (window as any).require('electron').ipcRenderer;
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
