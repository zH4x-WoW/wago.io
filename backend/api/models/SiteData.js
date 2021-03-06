const mongoose = require('mongoose'),
      ObjectId = mongoose.Schema.Types.ObjectId,
      Mixed = mongoose.Schema.Types.Mixed

const Schema = new mongoose.Schema({
    _id: { type: String },
    value: Mixed,
    private: {type: Boolean, default: false}
}, { timestamps: true });

Schema.statics.get = function(key) {
  return new Promise((resolve, reject) => {
    this.findOne({_id: key}).then((data) => {
      if (data) {
        resolve(data.value)
      }
      else {
        resolve(null)
      }
    })
  })
}

Schema.statics.set = async function(key, value) {
  return await this.findOneAndUpdate({_id: key}, {value: value}, {upsert: true, new: true})
}


const SiteData = mongoose.model('SiteData', Schema)
module.exports = SiteData