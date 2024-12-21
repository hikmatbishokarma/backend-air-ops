export interface Config {
  cors: CorsConfig;
  mongo?: MongoConfig;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface MongoConfig {
  uri: string;
}
