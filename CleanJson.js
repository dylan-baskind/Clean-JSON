module.exports = function(obj) {
  var cleanJson;
  cleanJson = function(obj) {
    var blackListFields, blackListed, cleaned, i, isBlackListed, key, privateVariable;
    if (obj instanceof Array) {
      cleaned = [];
      i = 0;
      while (i < obj.length) {
        cleaned.push(cleanJson(obj[i]));
        i++;
      }
      return cleaned;
    } else if (obj && (typeof obj === "object")) {
      cleaned = {};
      for (key in obj) {
        privateVariable = key.charAt(0) === "$";
        isBlackListed = false;
        blackListFields = (function() {
          var _i, _len, _ref, _results;
          _ref = ['_id', '__v', '__t'];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            blackListed = _ref[_i];
            if (key === blackListed) {
              isBlackListed = true;
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        })();
        if (privateVariable || isBlackListed) {
          continue;
        }
        cleaned[key] = cleanJson(obj[key]);
      }
      return cleaned;
    } else {
      return obj;
    }
  };
  return cleanJson(obj);
};