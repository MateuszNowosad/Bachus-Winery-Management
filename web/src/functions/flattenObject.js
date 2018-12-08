const flattenObject = object => {
  let newObject = {};
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      if (property !== '__typename') {
        if (object[property] instanceof Object) {
          let tmpObject = flattenObject(object[property]);
          for (let nestedProperty in tmpObject) {
            if (tmpObject.hasOwnProperty(nestedProperty)) {
              newObject[property + '_' + nestedProperty] = tmpObject[nestedProperty];
            }
          }
        } else {
          newObject[property] = object[property];
        }
      }
    }
  }
  return newObject;
};

export default flattenObject;
