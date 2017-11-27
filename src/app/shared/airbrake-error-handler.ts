import { ErrorHandler, NgModule} from '@angular/core';
import { SessionService } from '../core';

declare var airbrakeJs: any;

@NgModule({
  providers: [ SessionService ]
})

export class AirbrakeErrorHandler extends ErrorHandler {
  airbrake;

  constructor(private session: SessionService) {
    super(true);
  }

  initClient(): void {
    if (this.airbrake) { return; }
    this.airbrake = new airbrakeJs.Client({
      projectId: this.serverData.airbrake_id,
      projectKey: this.serverData.airbrake_key
    });
  }

  get serverData(): any {
    if (!this.session.instance) {
      return {};
    }
    return this.session.instance.serverData;
  }

  get shouldReport(): boolean {
    // const env = this.serverData.env;
    // return env && env.toLowerCase().indexOf('dev') === -1;
    return false;
  }

  get curatedSessionInfo() {
    return {
      attributes: this.session.instance.attributes,
      includes: this.session.instance.included,
    };
  }

  handleError(error) {
    if (this.shouldReport) {
      this.initClient();
      const report = {
        error: error,
        session: this.curatedSessionInfo
      };
      this.airbrake.notify(report);
      console.log('Reported to Airbrake');
    }
    super.handleError(error);  // must be after notify, circular JSON error
  }
}
