const workaroundRegex = new RegExp("^\\p{L}{2,30}$","u");

export const usersValidationKeys = {
  firstName: workaroundRegex,
    lastName: workaroundRegex,
    login: /\w{4,10}/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  PESEL: /\d{11}/,
  eMail:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
  phoneNumber: /\d{11}/g,
  photo: /.+/g,
  userRole: /.+/g,
  imagePreviewUrl: /.+/g
};
