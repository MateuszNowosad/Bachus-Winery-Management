export const usersValidationKeys = {
    firstName: new RegExp("^\\p{L}{2,30}$","u"),
    lastName: new RegExp("^\\p{L}{2,30}$","u"),
    login: /^\w{4,10}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/,
    PESEL: /^\d{11}$/,
    eMail:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    phoneNumber: /^\d{11}$/,
    photo: /^.+$/,
    userRole: /^.+$/,
    imagePreviewUrl: /^.+$/
};

export const addressValidationKeys = {
    street: new RegExp("^\\p{L}{2,45}$","u"),
    buildingNumber: /^\d{1,4}$/,
    apartmentNumber: /^(|\d{1,2})$/,
    postalCode: /^(|\d{1,10})$/,
    city: new RegExp("^\\p{L}{2,20}$","u"),
    country: new RegExp("^\\p{L}{2,60}$","u")
};

export const categoriesDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,20}$","u"),
    unit: new RegExp("^\\p{L}{2,20}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,250})$","u")
};

export const wineCategoriesDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,45}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,255})$","u")
};

export const grapeTypeDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,45}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,255})$","u")
};

export const vineyardOperationsDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,45}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,255})$","u")
};

export const processesDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,45}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,255})$","u"),
    additional: new RegExp("^(|[\\s\\S]{2,80})$","u")
};

export const userRoleDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,45}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,255})$","u"),
    type: new RegExp("^[\\S]{2,45}$","u")
};

export const batchTypeDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,45}$","u"),
    unit: new RegExp("^[\\w]{1,45}$","u")
};

export const wineInformationValidationKeys = {
    nazwa: new RegExp("^\\p{L}{3,45}$","u"),
    motto: new RegExp("^(|[\\s\\S]{2,100})$","u"),
    zawartoscPotAlergenow: new RegExp("^(|[\\s\\S]{2,20})$","u"),
    wartoscEnergetyczna: /^\d{1,3}$/
};

export const contractorsValidationKeys = {
    NIP: /^\d{10}$/,
    companyName: new RegExp("^(|[\\s\\S]{2,40})$","u"),
    phoneNumber: /^\d{11}$/,
    eMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    wwwSite: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    KRS: /^\d{10}$/,
    accountNumber: /^\d{26}$/,
    fax: /^(\+?\d{1,}(\s?|-?)\d*(\s?|-?)\(?\d{2,}\)?(\s?|-?)\d{3,}\s?\d{3,})$/
};

export const waybillValidationKeys = {
    driverName: new RegExp("^\\p{L}{2,45}$","u"),
    driverSurname: new RegExp("^\\p{L}{2,60}$","u"),
    comments: new RegExp("^(|[\\s\\S]{2,255})$","u"),
    reservations: new RegExp("^(|[\\s\\S]{2,255})$","u"),
    file: new RegExp("^(|[\\w\\d]{2,255})$","u"),
};
