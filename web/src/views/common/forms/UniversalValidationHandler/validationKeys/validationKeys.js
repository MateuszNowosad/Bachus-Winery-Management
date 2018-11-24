export const usersValidationKeys = {
  firstName: new RegExp('^\\p{L}{2,30}$', 'u'),
  lastName: new RegExp('^\\p{L}{2,30}$', 'u'),
  login: /^\w{4,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PESEL: /^\d{11}$/,
  eMail: /^(?=.{5,90}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneNumber: /^\d{14}$/,
  photo: /^.{5,100}$/,
  userRole: /^.{5,100}$/
};

export const addressValidationKeys = {
  street: new RegExp('^([\\p{L}\\d\' ]{2,45})$', 'u'),
  buildingNumber: /^\d{1,4}$/,
  apartmentNumber: /^(|\d{1,2})$/,
  postalCode: /^\d{1,12}$/,
  city: new RegExp('^([\\p{L}\\d\' ]{2,40})$', 'u'),
  country: new RegExp('^([\\p{L}\' ()]{2,60})$', 'u')
};

export const categoriesDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,20})$', 'u'),
  unit: new RegExp('^\\p{L}{2,20}$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,250})$', 'u')
};

export const wineCategoriesDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u')
};

export const grapeTypeDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u')
};

export const vineyardOperationsDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u')
};

export const processesDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,40})$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  additional: new RegExp('^(|[\\s\\S]{2,80})$', 'u')
};

export const userRoleDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  type: new RegExp('^[\\S]{2,45}$', 'u')
};

export const batchTypeDictValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  unit: new RegExp('^[\\w]{1,45}$', 'u')
};

export const wineInformationValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  motto: new RegExp('^(|[\\s\\S]{2,100})$', 'u'),
  allergens: new RegExp('^(|[\\s\\S]{2,20})$', 'u'),
  energyValue: /^((?=.{1,3}$)\d*[1-9]+\d*)$/,
  wineCategory: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
};

export const contractorsValidationKeys = {
  NIP: /^($|\d{10})$/,
  companyName: new RegExp('^[\\s\\S]{2,40}$', 'u'),
  phoneNumber: /^\d{14}$/,
  eMail: /^(?=.{5,90}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  wwwSite: /^(?=.{4,255}$)(|(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)$/,
  KRS: /^($|\d{10})$/,
  accountNumber: /^\d{26}$/,
  fax: /^(?=.{4,45}$)(\+?\d{1,}(\s?|-?)\d*(\s?|-?)\(?\d{2,}\)?(\s?|-?)\d{3,}\s?\d{3,})$/
};

export const waybillValidationKeys = {
  driverName: new RegExp('^([\\p{L}\' ]{3,45})$', 'u'),
  driverSurname: new RegExp('^([\\p{L}\' ]{3,45})$', 'u'),
  comments: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  reservations: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  file: new RegExp('^[\\w\\d]{2,255}$', 'u')
};

export const warehouseValidationKeys = {
  type: new RegExp('^([\\p{L}\' ()]{2,40})$', 'u'),
  capacity: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1}|0{1,6}\.[1-9])$/
};

export const vineyardOperationsValidationKeys = {
  dateOfOperation: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
  desc: new RegExp('^(|[\\s\\S]{2,45})$', 'u')
};

export const batchValidationKeys = {
  amount: /^((?=.{1,4}\.)(\d*[1-9]+\d*)\.\d{1}|0{1,4}\.[1-9])$/,
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  creationDate: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
  batchType: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u')
};

export const vineyardValidationKeys = {
  name: new RegExp('^([\\p{L}\' ()]{2,40})$', 'u'),
  area: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/,
  terroir: new RegExp('^([\\s\\S]{2,255})$', 'u'),
  dateOfPlanting: /^(\d{4}-\d{2}-\d{2})$/,
  registrationPlotId: new RegExp('^(|[\\s\\S]{2,40})$', 'u'),
  grapeType: new RegExp('^([\\p{L}\' ()]{2,45})$', 'u'),
  state: new RegExp('^([\\p{L}\' ()]{2,40})$', 'u')
};

export const operationsValidationKeys = {
  beginAmount: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/,
  endAmount: /^($|(?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/,
  beginDate: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
  endDate: /^($|\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
  alcoholContent: /^($|\d{1,2}|\d{1,2}\.\d{0,1})$/,
  additiveAmount: /^($|\d{1,3}|\d{1,3}\.\d{0,1})$/,
  sugarContent: /^($|\d{1,2}|\d{1,2}\.\d{0,1})$/,
  acidity: /^($|\d{1,2}|\d{1,2}\.\d{0,1})$/,
  temperature: /^($|\d{1,2}|\d{1,2}\.\d{0,1})$/,
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  process: new RegExp('^\\p{L}{3,40}$', 'u')
};

export const itemInStockValidationKeys = {
  name: new RegExp('^\\p{L}{3,45}$', 'u'),
  desc: new RegExp('^(|[\\s\\S]{2,255})$', 'u'),
  amount: /^((?=.{1,4}\.)(\d*[1-9]+\d*)\.\d|0{1,6}\.[1-9])$/,
  barcode: /^[0-9]{13}$/,
  actualState: /^[01]$/,
  acceptanceDate: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
  releaseDate: /^($|\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
  sectorName: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  category: new RegExp('^([\\p{L}\' ()]{3,20})$', 'u')
};

export const parcelValidationKeys = {
  packageName: new RegExp('^([\\p{L}\' ()]{3,45})$', 'u'),
  weight: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/,
  date: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/
};

export const harvestValidationKeys = {
  dateOfHarvest: /^(\d{4}-\d{2}-\d{2})$/,
  amount: /^((?=.{1,4}\.)(\d*[1-9]+\d*)\.\d{1}|0{1,4}\.[1-9])$/
};
