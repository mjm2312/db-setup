const CowModel = require('./index.js');
module.exports = {
  retrieve: () => {
    return CowModel.find({})
  },
  
  save: (options) => {
    return CowModel.create(options);
  },
  
  update: (filter, doc) => {
    return CowModel.updateOne(filter, doc);
  },
  
  remove: (param) => {
    return CowModel.deleteOne(param)
  }
}