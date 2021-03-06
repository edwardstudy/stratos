import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IServiceInstance, IServicePlan } from '../../../core/cf-api-svc.types';
import { RouterNav } from '../../../store/actions/router.actions';
import { AppState } from '../../../store/app-state';
import { APIResource } from '../../../store/types/api.types';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-service-summary',
  templateUrl: './service-summary.component.html',
  styleUrls: ['./service-summary.component.scss']
})
export class ServiceSummaryComponent {

  servicePlans$: Observable<APIResource<IServicePlan>[]>;
  instances$: Observable<APIResource<IServiceInstance>[]>;
  constructor(
    private servicesService: ServicesService,
    private store: Store<AppState>,
  ) {

    this.instances$ = servicesService.serviceInstances$;
    this.servicePlans$ = servicesService.servicePlans$;
  }

  serviceInstancesLink = () => {
    this.store.dispatch(new RouterNav({
      path: ['marketplace', this.servicesService.cfGuid, this.servicesService.serviceGuid, 'instances']
    }));
  }

}
