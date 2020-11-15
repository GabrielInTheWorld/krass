import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class BaseComponent implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }
}
