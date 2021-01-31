import { MenuItemData } from './menu-item-data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItemService } from '../../services/menu-item.service';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
    @Input()
    public hasMenu = false;

    @Input()
    public menuData: MenuItemData;

    @Output()
    public buttonClick = new EventEmitter<void>();

    constructor(private itemService: MenuItemService) {}

    ngOnInit(): void {
        this.itemService.registerMenuItem(this);
    }
}
