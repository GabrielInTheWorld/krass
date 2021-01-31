import { MenuItemComponent } from './../menu-item/menu-item.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuItemService {
    private menuItemList: MenuItemComponent[] = [];

    public constructor() {}

    public registerMenuItem(menuItem: MenuItemComponent): void {
        this.menuItemList.push(menuItem);
    }

    public clickItem(menuItem: MenuItemComponent): void {}
}
