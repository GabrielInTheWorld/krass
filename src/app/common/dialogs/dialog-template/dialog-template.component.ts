import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-dialog-template',
    templateUrl: './dialog-template.component.html',
    styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {
    @Input()
    public backgroundColor = '#ffffff';

    @Output()
    public keycommandEvent = new EventEmitter<KeyboardEvent>();

    public constructor() {}

    public ngOnInit(): void {}

    @HostListener('document:keydown', ['$event'])
    public onKeydownListener(event: KeyboardEvent): void {
        this.keycommandEvent.emit(event);
    }
}
