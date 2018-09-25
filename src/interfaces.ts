export interface InitialData {
  host: string;
  serialNumber: string;
}

export interface TemplateData {
  idx: string;
  alg_ver: number;
  template: string;
}

export interface UserData {
  pin: string;
  nama: string;
  pwd: number;
  rfid: number;
  priv: number;
  tmp: TemplateData[];
}
