import { LOGLEVEL } from '@models';
import settings from '../../../../package.json';

export interface EnvironmentInterface {
  production: boolean;
  version: string;
  logging: {
    level: number;
  };
}

export const production: EnvironmentInterface = {
  production: true,
  version: settings.version,
  logging: {
    level: LOGLEVEL.ERROR,
  },
};

export const development: EnvironmentInterface = {
  production: false,
  version: settings.version,
  logging: {
    level: LOGLEVEL.DEBUG,
  },
};
