import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import {
  createLogTimestamp,
  LogInterface,
  LOGLEVEL,
  printLog,
  shouldLog,
} from '@models';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements OnDestroy {
  private initLog: LogInterface = {
    level: LOGLEVEL.DEBUG,
    message: 'Logger event',
    timestamp: createLogTimestamp(),
    print: () => console.log('Logger has started'),
  };
  private logStream$ = new BehaviorSubject<LogInterface>(this.initLog);
  private printStream = this.logStream$
    .pipe(filter((log) => shouldLog(log.level, environment.logging.level)))
    .pipe(tap((log) => printLog(log.message, log.print)))
    .subscribe();

  constructor() {}

  ngOnDestroy() {
    this.printStream.unsubscribe();
    this.logStream$.complete();
  }

  // TODO
  private addLog(message: string, level: LOGLEVEL, print?: Function) {
    this.logStream$.next({
      level,
      message,
      print,
      timestamp: new Date().toUTCString(),
    });
  }

  public log(label: string, functor?: Function) {
    this.addLog(label, LOGLEVEL.VERBOSE, functor);
  }
  public error(label: string, functor?: Function) {
    this.addLog(label, LOGLEVEL.ERROR, functor);
  }
  public warn(label: string, functor?: Function) {
    this.addLog(label, LOGLEVEL.WARN, functor);
  }
  public info(label: string, functor?: Function) {
    this.addLog(label, LOGLEVEL.INFO, functor);
  }
  public debug(label: string, functor?: Function) {
    this.addLog(label, LOGLEVEL.DEBUG, functor);
  }
}
