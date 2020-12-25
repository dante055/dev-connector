export default function (err) {
  let msg = [];

  if (!err.response) {
    msg.push(err.message);
  } else if (err.response.data?.message) {
    msg.push(err.response.data.message);
  } else if (err.response.data?.error.errors) {
    err.response.data.error.errors.forEach(error => msg.push(error.msg));
  }
  return msg;
}
