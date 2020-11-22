import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
    template: ''
})
export abstract class BaseComponent implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }
}
