import { Validations } from 'constants/validatorStrings';

export type GeolocationCoordinates = {
  lon: number;
  lat: number;
};

export type AuthenticationResponse = {
  // eslint-disable-next-line camelcase
  access_token: string;
  // eslint-disable-next-line camelcase
  expires_in: number;
  // eslint-disable-next-line camelcase
  token_type: string;
};

export type LocationData = {
  adminArea: string;
  adminArea2: string;
  adminArea3: null;
  country: string;
  id: number;
  language: string;
  lat: number;
  lon: number;
  name: string;
  timezone: string;
};

export type LocationByQuery = {
  locations: LocationData[];
};

export type CommonWeatherData = {
  cloudiness: number;
  precipProb: number;
  pressure: number;
  symbol: string;
  symbolPhrase: string;
  uvIndex: number;
  windDir: number;
};

export type CurrentHourlyCommonData = {
  dewPoint: number;
  feelsLikeTemp: number;
  relHumidity: number;
  temperature: number;
  thunderProb: number;
  time: string;
  visibility: number;
  windDirString: string;
  windGust: number;
  windSpeed: number;
};

export type CurrentWeatherData = CommonWeatherData &
  CurrentHourlyCommonData & {
    precipRate: number;
  };

export type HourlyWeather = CommonWeatherData &
  CurrentHourlyCommonData & {
    solarRadiation: number;
    precipType: string;
    precipAccum: number;
    snowAccum: number;
  };

export type DailyWeather = CommonWeatherData & {
  date: string;
  maxTemp: number;
  minTemp: number;
  maxFeelsLikeTemp: number;
  minFeelsLikeTemp: number;
  maxRelHumidity: number;
  minRelHumidity: number;
  maxDewPoint: number;
  minDewPoint: number;
  maxWindSpeed: number;
  maxWindGust: number;
  minVisibility: number;
  sunrise: string;
  sunset: string;
  sunriseEpoch: number;
  sunsetEpoch: number;
  moonrise: string;
  moonset: string;
  moonPhase: number;
  confidence: string;
  solarRadiationSum: number;
  snowAccum: number;
  precipAccum: number;
};

export interface Feedback {
  id?: string;
  nickname: string;
  nicknameError?: string;
  email: string;
  emailError?: string;
  reviewTitle: string;
  reviewTitleError?: string;
  review: string;
  reviewError?: string;
  rating: number;
  ratingError?: string;
}

export type Validator = Record<Validations, (value: string, param: number) => boolean>;
export type Errors = Record<Validations, (value: string, param: number) => string>;

export type FeedbackState = {
  feedback: Feedback[];
  loading?: boolean;
  error?: string;
};
export interface SearchState {
  prevSearches: Feedback[];
}

export type CombinedState = {
  feedback: FeedbackState;
  search: SearchState;
};
export enum FeedbackActions {
  FEEDBACK_REQUEST_START,
  FEEDBACK_REQUEST_SUCCESS,
  FEEDBACK_REQUEST_FAILED
}
export interface FeedbackActionConfig {
  type: FeedbackActions;
  payload: Feedback[] | Feedback | string;
}
export enum SearchActions {
  SEARCH_SAVE_CURRENT_LOCATION,
  SEARCH_SAVE_LOCATION
}
export interface SearchActionConfig {
  type: SearchActions;
  payload: string;
}
