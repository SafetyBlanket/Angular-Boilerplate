import { Component } from '@angular/core';
import { LoggerService } from '@core/services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private logger: LoggerService) {
    logger.debug('App started');
  }
}
