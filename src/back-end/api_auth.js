const auth = require('../../auth.json');
export default {
  client_id: auth.client_id,
  client_secret: auth.client_secret,
  redirect_url: auth.redirect_url,
  scope: '',
};
